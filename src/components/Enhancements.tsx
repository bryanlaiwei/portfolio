"use client";

import { useEffect } from "react";
import { siteConfig } from "@/data/portfolio";

/**
 * Wires the static page up: theme, clocks, nav lens and scroll spy, experience dialogs, copy-email, project card
 * clicks and the tag hover highlight. Everything works on the server-rendered markup, so the page reads fine
 * before this runs. All listeners hang off one AbortController so a remount never doubles them.
 */
export default function Enhancements() {
  useEffect(() => {
    const ac = new AbortController();
    const signal = ac.signal;
    const timers = new Set<number>();
    const intervals: number[] = [];
    const root = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touchWebKit = typeof CSS !== "undefined" && CSS.supports("-webkit-touch-callout", "none");
    const canHover = matchMedia("(hover: hover)").matches;
    const $ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => el.querySelector<T>(s);
    const $$ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => [...el.querySelectorAll<T>(s)];
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
      return id;
    };
    const cancel = (id: number | undefined) => {
      if (id === undefined) return;
      clearTimeout(id);
      timers.delete(id);
    };

    // ----- theme: system scheme when the browser reports one, else 06:00-18:00 light; the toggle lasts for this tab only
    // and is dropped as soon as the system scheme changes -----
    const mqDark = matchMedia("(prefers-color-scheme: dark)");
    const mqLight = matchMedia("(prefers-color-scheme: light)");
    const systemReadable = () => mqDark.matches || mqLight.matches;
    const byClock = () => {
      const h = new Date().getHours();
      return h >= 6 && h < 18 ? "light" : "dark";
    };
    const autoTheme = () => (systemReadable() ? (mqDark.matches ? "dark" : "light") : byClock());
    let override: string | null = null;
    try {
      override = sessionStorage.getItem("theme");
    } catch {}
    if (override !== "dark" && override !== "light") override = null;
    const isLight = () => (root.dataset.theme || autoTheme()) === "light";
    const setThemeLabels = () => {
      const next = isLight() ? "dark" : "light";
      $$("[data-theme-toggle]").forEach((b) => b.setAttribute("aria-label", `Switch to ${next} theme`));
    };
    const setTheme = (t: string) => {
      root.dataset.theme = t;
      setThemeLabels();
    };
    const followSystem = () => {
      override = null;
      try {
        sessionStorage.removeItem("theme");
      } catch {}
      setTheme(autoTheme());
    };
    if (!override) setTheme(autoTheme());
    else setThemeLabels();
    mqDark.addEventListener("change", followSystem, { signal });
    intervals.push(
      window.setInterval(() => {
        if (!override && !systemReadable()) setTheme(autoTheme());
      }, 60000),
    );
    $$("[data-theme-toggle]").forEach((btn) =>
      btn.addEventListener(
        "click",
        () => {
          const next = isLight() ? "dark" : "light";
          const apply = () => {
            override = next;
            try {
              sessionStorage.setItem("theme", next);
            } catch {}
            setTheme(next);
          };
          if (reduced) {
            apply();
            return;
          }
          // The hero photos swap at once while a fade does the switch; their own crossfade would otherwise still be
          // running when the fade ends and the old photo would flash back.
          root.dataset.themeSwitching = "";
          const done = () => delete root.dataset.themeSwitching;
          // Desktop: a view transition crossfades the old page into the new one (timing in globals.css).
          // iOS and iPadOS browsers (all WebKit) draw the page under the status bar and the bottom toolbar, but a view
          // transition only animates the area between them, so both bars would turn flat for the whole fade. There, and
          // where view transitions are missing, a veil in the new theme's ground colour rises, the theme flips under it,
          // and it falls away again: one opacity layer, so it stays smooth on phones and covers the bars too.
          if (document.startViewTransition && !touchWebKit) {
            document.startViewTransition(apply).finished.finally(done);
            return;
          }
          const veil = document.createElement("div");
          veil.className = "theme-veil";
          veil.style.background = next === "light" ? "#f5f5f7" : "#000000";
          document.body.appendChild(veil);
          const rise = veil.animate({ opacity: [0, 0.9] }, { duration: 170, easing: "cubic-bezier(.4,0,1,1)", fill: "forwards" });
          rise.finished
            .then(() => {
              apply();
              return veil.animate({ opacity: [0.9, 0] }, { duration: 340, easing: "cubic-bezier(0,0,.2,1)", fill: "forwards" }).finished;
            })
            .catch(() => apply())
            .finally(() => {
              veil.remove();
              done();
            });
        },
        { signal },
      ),
    );

    // ----- clocks (Kitchener, Ontario) -----
    const timeFmt = new Intl.DateTimeFormat("en-CA", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: siteConfig.timeZone, timeZoneName: "short" });
    const tick = () => {
      const d = new Date();
      const parts = timeFmt.formatToParts(d);
      const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
      const text = `${get("hour")}:${get("minute")} ${get("timeZoneName")}`.trim();
      $$("#clock, #contact-clock").forEach((c) => {
        c.textContent = text;
        c.setAttribute("datetime", d.toISOString());
      });
    };
    tick();
    intervals.push(window.setInterval(tick, 30000));

    // ----- in-page jumps -----
    document.addEventListener(
      "click",
      (ev) => {
        const a = (ev.target as Element | null)?.closest<HTMLElement>("[data-jump]");
        if (!a || ev.metaKey || ev.ctrlKey || ev.shiftKey) return;
        const el = document.getElementById(a.dataset.jump ?? "");
        if (!el) return;
        ev.preventDefault();
        if (a.dataset.jump === "top") {
          scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
          return;
        }
        el.scrollIntoView({ block: "start" });
      },
      { signal },
    );

    // ----- nav lens and scroll spy -----
    type NavState = { items: HTMLElement; lens: HTMLElement; links: HTMLAnchorElement[]; preview: HTMLAnchorElement | null };
    const navEl = $("#nav");
    const navs: NavState[] = navEl
      ? [{ items: $(".items", navEl)!, lens: $(".lens", navEl)!, links: $$<HTMLAnchorElement>("a[data-jump]", $(".items", navEl)!), preview: null }]
      : [];
    let active: string | null = null;
    const moveLens = (n: NavState, link: HTMLAnchorElement | null, snap: boolean) => {
      if (!link) {
        n.lens.classList.remove("on");
        return;
      }
      const instant = snap || !n.lens.classList.contains("on");
      if (instant) n.lens.style.transition = "none";
      n.lens.style.width = link.offsetWidth + "px";
      n.lens.style.transform = `translateX(${link.offsetLeft}px)`;
      n.lens.classList.add("on");
      if (instant) {
        void n.lens.offsetWidth;
        n.lens.style.transition = "";
      }
    };
    const paintActive = (snap = false) =>
      navs.forEach((n) => {
        const link = n.links.find((l) => l.dataset.jump === active) ?? null;
        n.links.forEach((l) => l.classList.toggle("active", l === link));
        moveLens(n, n.preview ?? link, snap);
      });
    navs.forEach((n) => {
      const preview = (l: HTMLAnchorElement) => {
        n.preview = l;
        paintActive();
      };
      const clear = () => {
        n.preview = null;
        paintActive();
      };
      if (canHover) {
        n.links.forEach((l) => l.addEventListener("pointerenter", () => preview(l), { signal }));
        n.items.addEventListener("pointerleave", clear, { signal });
      }
      n.links.forEach((l) => l.addEventListener("focus", () => preview(l), { signal }));
      n.items.addEventListener(
        "focusout",
        (e) => {
          if (!n.items.contains(e.relatedTarget as Node | null)) clear();
        },
        { signal },
      );
    });
    const sections = ["experience", "projects", "stack", "contact"].map((id) => document.getElementById(id)).filter((s): s is HTMLElement => !!s);
    const inBand = new Set<string>();
    let locked = false;
    let unlockTimer: number | undefined;
    const syncActive = () => {
      if (locked) return;
      const atEnd = innerHeight + scrollY >= root.scrollHeight - 2;
      const hit = sections.filter((s) => inBand.has(s.id)).pop();
      const next = scrollY < innerHeight * 0.5 ? null : atEnd ? "contact" : hit ? hit.id : active;
      if (next !== active) {
        active = next;
        paintActive();
      }
    };
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) inBand.add(en.target.id);
          else inBand.delete(en.target.id);
        });
        syncActive();
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => spy.observe(s));
    const release = () => {
      locked = false;
      cancel(unlockTimer);
      syncActive();
    };
    navs.forEach((n) =>
      n.links.forEach((l) =>
        l.addEventListener(
          "click",
          () => {
            active = l.dataset.jump ?? null;
            n.preview = null;
            paintActive();
            locked = true;
            cancel(unlockTimer);
            unlockTimer = later(release, 1200);
          },
          { signal },
        ),
      ),
    );
    addEventListener(
      "scrollend",
      () => {
        if (locked) release();
      },
      { signal },
    );
    addEventListener("resize", () => paintActive(true), { signal });
    document.fonts?.ready.then(() => {
      if (!signal.aborted) paintActive(true);
    });
    let scrolledState: boolean | null = null;
    let atHeroState: boolean | null = null;
    const hero = $(".hero");
    const onScroll = () => {
      const s = scrollY > 40;
      if (s !== scrolledState) {
        scrolledState = s;
        if (s) root.dataset.scrolled = "";
        else delete root.dataset.scrolled;
      }
      // while the photo still meets the top of the screen, iOS Safari's status bar takes the photo's colour
      const h = scrollY < (hero ? hero.offsetHeight : innerHeight) * 0.75;
      if (h !== atHeroState) {
        atHeroState = h;
        if (h) root.dataset.atHero = "";
        else delete root.dataset.atHero;
      }
      syncActive();
    };
    addEventListener("scroll", onScroll, { passive: true, signal });
    onScroll();

    // ----- project cards: anywhere on a card except the Demo/Live/GitHub pills opens the repo -----
    $$("#projects .card").forEach((card) =>
      card.addEventListener(
        "click",
        (e) => {
          if ((e.target as Element).closest("a")) return;
          const a = $<HTMLAnchorElement>("h3 a", card);
          if (a) window.open(a.href, "_blank", "noopener");
        },
        { signal },
      ),
    );
    $$("#projects .card .tags").forEach((t) => {
      t.style.cursor = "pointer";
    });

    // ----- experience detail dialogs -----
    // a body taller than the screen scrolls inside the dialog; mark which edges have more content so they fade
    const markScroll = (body: HTMLElement) => {
      const toggle = (name: string, on: boolean) => (on ? body.setAttribute(name, "") : body.removeAttribute(name));
      toggle("data-more-above", body.scrollTop > 2);
      toggle("data-more-below", body.scrollHeight - body.clientHeight - body.scrollTop > 2);
    };
    $$(".detail-body").forEach((body) => body.addEventListener("scroll", () => markScroll(body), { passive: true, signal }));
    addEventListener("resize", () => $$(".detail-body").forEach(markScroll), { signal });
    $$("[data-detail]").forEach((btn) =>
      btn.addEventListener(
        "click",
        () => {
          const d = document.getElementById(btn.dataset.detail ?? "") as HTMLDialogElement | null;
          if (d?.showModal) d.showModal();
          const body = d && $(".detail-body", d);
          if (body) {
            body.scrollTop = 0;
            markScroll(body);
          }
        },
        { signal },
      ),
    );
    $$<HTMLDialogElement>("dialog.detail").forEach((d) => {
      d.addEventListener(
        "click",
        (e) => {
          if (e.target === d) d.close();
        },
        { signal },
      );
      $$("[data-close]", d).forEach((b) => b.addEventListener("click", () => d.close(), { signal }));
    });

    // ----- copy email -----
    const toast = $("#toast");
    const toastText = $("#toast-text");
    let toastTimer: number | undefined;
    const copyTimers = new Map<HTMLElement, number>();
    const showToast = (text: string) => {
      if (!toast || !toastText) return;
      toastText.textContent = text;
      toast.classList.add("on");
      cancel(toastTimer);
      toastTimer = later(() => toast.classList.remove("on"), 1600);
    };
    const copyText = async (value: string) => {
      try {
        await navigator.clipboard.writeText(value);
        return true;
      } catch {}
      try {
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.setAttribute("readonly", "");
        ta.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        ta.remove();
        return ok;
      } catch {
        return false;
      }
    };
    $$("[data-copy]").forEach((btn) =>
      btn.addEventListener(
        "click",
        async () => {
          const value = btn.dataset.copy ?? "";
          if (await copyText(value)) {
            btn.dataset.state = "copied";
            showToast(`${value} copied`);
            cancel(copyTimers.get(btn));
            copyTimers.set(
              btn,
              later(() => {
                delete btn.dataset.state;
              }, 1600),
            );
          } else {
            const t = $(".idle", btn);
            if (t) {
              const range = document.createRange();
              range.selectNodeContents(t);
              const sel = getSelection();
              sel?.removeAllRanges();
              sel?.addRange(range);
            }
            showToast(`Copy blocked here: ${value}`);
          }
        },
        { signal },
      ),
    );

    // ----- tag cross-highlight: hovering a project tag lights the matching Stack pill, and back -----
    const main = $("main");
    if (canHover && main) {
      const hl = (target: EventTarget | null, on: boolean) => {
        const el = (target as Element | null)?.closest?.<HTMLElement>("[data-tag]");
        if (!el) return;
        $$(`[data-tag="${el.dataset.tag}"]`).forEach((t) => t.classList.toggle("is-hl", on));
      };
      main.addEventListener("pointerover", (e) => hl(e.target, true), { signal });
      main.addEventListener("pointerout", (e) => hl(e.target, false), { signal });
    }

    return () => {
      ac.abort();
      spy.disconnect();
      intervals.forEach((id) => clearInterval(id));
      timers.forEach((id) => clearTimeout(id));
    };
  }, []);

  return null;
}
