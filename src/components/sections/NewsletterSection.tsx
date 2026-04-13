"use client";

import { useState, useRef } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export function NewsletterSection() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = inputRef.current?.value.trim() ?? "";

    if (!email) {
      setState("error");
      setErrorMsg("Please enter your email address.");
      return;
    }

    if (!emailRegex.test(email)) {
      setState("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setState("loading");

    try {
      const res = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setState("success");
        if (inputRef.current) inputRef.current.value = "";
      } else {
        setState("error");
        setErrorMsg(data.message || "Failed to subscribe. Please try again.");
      }
    } catch {
      setState("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <div className="newsletter-section">
      <div className="newsletter-section__content">
        <span className="eyebrow">Stay Updated</span>
        <h2>Subscribe to Our Newsletter</h2>
        <p>
          Quarterly updates, investor announcements, and industry insights
          — delivered to your inbox.
        </p>

        {state === "success" ? (
          <div className="newsletter-section__success" role="status">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="M22 4 12 14.01l-3-3" />
            </svg>
            Thank you! You&rsquo;re subscribed.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="newsletter-section__form"
            noValidate
          >
            <div className="newsletter-section__input-wrap">
              <input
                ref={inputRef}
                type="email"
                placeholder="Enter your email address"
                className={`input ${state === "error" ? "input-error" : ""}`}
                aria-label="Email address"
                aria-invalid={state === "error"}
                aria-describedby={state === "error" ? "newsletter-error" : undefined}
                onChange={(e) => {
                  if (state === "error") setState("idle");
                  setValidEmail(emailRegex.test(e.target.value.trim()));
                }}
              />
              {state === "error" && (
                <span id="newsletter-error" className="newsletter-section__error" role="alert">
                  {errorMsg}
                </span>
              )}
            </div>
            <button
              type="submit"
              className={`btn btn-lg newsletter-section__btn ${validEmail ? "btn-secondary" : "btn-ghost"}`}
              disabled={state === "loading"}
            >
              {state === "loading" ? (
                <>
                  <span className="btn-spinner" aria-hidden="true" />
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
