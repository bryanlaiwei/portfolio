"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/data/portfolio";

type SubmissionState = "idle" | "sending" | "success" | "error" | "fallback";

export default function ContactTerminal() {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  async function sendEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!accessKey) {
      setSubmissionState("fallback");
      return;
    }

    setSubmissionState("sending");
    setErrorMessage("");

    try {
      const formData = new FormData(event.currentTarget);
      formData.append("access_key", accessKey);
      formData.append("from_name", `${senderName} via Bryan Wei Portfolio`);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        setErrorMessage(result.message || "Web3Forms rejected the submission.");
        setSubmissionState("error");
        return;
      }

      setSenderName("");
      setSenderEmail("");
      setSubject("");
      setMessage("");
      setSubmissionState("success");
    } catch {
      setErrorMessage("Network error. Please try again.");
      setSubmissionState("error");
    }
  }

  const statusMessage = {
    idle: "",
    sending: "sending message...",
    success: "message sent successfully ✓",
    error: errorMessage || `delivery failed — email ${siteConfig.email}`,
    fallback: "contact form is temporarily unavailable",
  }[submissionState];

  return (
    <div className="terminal-window contact-terminal">
      <div className="terminal-bar">
        <div className="terminal-dots" aria-hidden="true"><span /><span /><span /></div>
        <span>message-composer — zsh</span>
      </div>
      <form className="contact-form" onSubmit={sendEmail}>
        <p className="contact-command"><span>$</span> compose --new</p>
        <label>
          <span>name &gt;</span>
          <input type="text" name="name" value={senderName} onChange={(event) => setSenderName(event.target.value)} placeholder="Your name" autoComplete="name" required />
        </label>
        <label>
          <span>email &gt;</span>
          <input type="email" name="email" value={senderEmail} onChange={(event) => setSenderEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required />
        </label>
        <label>
          <span>subject &gt;</span>
          <input type="text" name="subject" value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Enter subject" required />
        </label>
        <label className="message-field">
          <span>message &gt;</span>
          <textarea name="message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Write your message here..." required />
        </label>
        <div className="contact-form-actions">
          <button type="submit" disabled={submissionState === "sending"}>
            <span>$</span> {submissionState === "sending" ? "sending..." : "send-message ↗"}
          </button>
          <p className={`contact-status is-${submissionState}`} role="status" aria-live="polite">{statusMessage}</p>
        </div>
      </form>
    </div>
  );
}
