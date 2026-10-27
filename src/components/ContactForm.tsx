"use client";

import { FormEvent, useState } from "react";
import { ArrowIcon } from "@/components/Icons";
import { siteConfig } from "@/data/portfolio";

type Status = "idle" | "invalid" | "sending" | "success" | "error" | "unavailable";

const FIELDS = [
  { id: "f-name", name: "name", label: "Name", type: "text", autoComplete: "name" },
  { id: "f-email", name: "email", label: "Email", type: "email", autoComplete: "email" },
  { id: "f-subject", name: "subject", label: "Subject", type: "text", autoComplete: undefined },
] as const;

/** Floating-label form; sends through Web3Forms with the NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY access key. */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [detail, setDetail] = useState("");
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (k: string) => String(data.get(k) ?? "").trim();
    if (!value("name") || !value("email") || !value("message")) {
      setStatus("invalid");
      return;
    }
    if (!accessKey) {
      setStatus("unavailable");
      return;
    }
    setStatus("sending");
    setDetail("");
    try {
      data.append("access_key", accessKey);
      data.append("from_name", `${value("name")} via Bryan Wei Portfolio`);
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const result = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !result.success) {
        setDetail(result.message ?? "");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setDetail("Network error. Please try again.");
      setStatus("error");
    }
  }

  const message = {
    idle: "",
    invalid: "Name, email and message are required.",
    sending: "Sending…",
    success: "Message sent.",
    error: detail || `Couldn't send. Email ${siteConfig.email} instead.`,
    unavailable: `The form is unavailable right now. Email ${siteConfig.email} instead.`,
  }[status];

  return (
    <form id="form" noValidate onSubmit={onSubmit}>
      {FIELDS.map((f) => (
        <label key={f.id} className="fl" htmlFor={f.id}>
          <input className="bare" id={f.id} name={f.name} type={f.type} placeholder=" " autoComplete={f.autoComplete} />
          <span>{f.label}</span>
        </label>
      ))}
      <label className="fl" htmlFor="f-message">
        <textarea className="bare" id="f-message" name="message" placeholder=" " />
        <span>Message</span>
      </label>
      <div className="form-foot">
        <button className="send" type="submit" disabled={status === "sending"}>
          Send <ArrowIcon />
        </button>
        <div className="form-status" id="form-status" aria-live="polite">
          {message}
        </div>
      </div>
    </form>
  );
}
