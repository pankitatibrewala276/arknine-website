"use client";

import { useState, useRef, type FormEvent } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        formRef.current?.reset();
      } else {
        setErrorMessage(
          data.message || "Something went wrong. Please try again."
        );
        setStatus("error");
      }
    } catch {
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
      setStatus("error");
    }
  }

  const disabled = status === "submitting";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
      {/* Hidden fields */}
      <input
        type="hidden"
        name="access_key"
        value="b6ff01e4-1e73-4a64-8fd9-f390564bc07a"
      />
      <input
        type="hidden"
        name="subject"
        value="New Arknine Website Contact Form Submission"
      />
      <input
        type="hidden"
        name="from_name"
        value="Arknine Contact Form"
      />
      <div className="contact-form__hp" aria-hidden="true">
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Fields */}
      <div className="contact-form__fields">
        <div className="contact-form__row">
          <div className="form-group">
            <label className="form-label" htmlFor="cf-name">
              Full Name <span className="contact-form__req">*</span>
            </label>
            <input
              id="cf-name"
              name="name"
              className="input"
              type="text"
              placeholder="Your name"
              required
              disabled={disabled}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="cf-company">
              Company
            </label>
            <input
              id="cf-company"
              name="company"
              className="input"
              type="text"
              placeholder="Company name"
              disabled={disabled}
            />
          </div>
        </div>

        <div className="contact-form__row">
          <div className="form-group">
            <label className="form-label" htmlFor="cf-email">
              Email <span className="contact-form__req">*</span>
            </label>
            <input
              id="cf-email"
              name="email"
              className="input"
              type="email"
              placeholder="you@company.com"
              required
              disabled={disabled}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="cf-phone">
              Phone <span className="contact-form__req">*</span>
            </label>
            <input
              id="cf-phone"
              name="phone"
              className="input"
              type="tel"
              placeholder="+91 00000 00000"
              required
              disabled={disabled}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="cf-subject">
            Subject <span className="contact-form__req">*</span>
          </label>
          <select
            id="cf-subject"
            name="inquiry_type"
            className="input"
            required
            disabled={disabled}
            defaultValue=""
          >
            <option value="" disabled>
              Select a topic
            </option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Investor Relations">Investor Relations</option>
            <option value="Partnership">Partnership</option>
            <option value="Dukaan Dost">Dukaan Dost Platform</option>
            <option value="Careers">Careers</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="cf-message">
            Message <span className="contact-form__req">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            className="input"
            placeholder="How can we help?"
            rows={6}
            required
            disabled={disabled}
          />
        </div>
      </div>

      {/* Footer: button + status */}
      <div className="contact-form__footer">
        <button
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={disabled}
        >
          {status === "submitting" ? (
            <>
              <span className="btn-spinner" aria-hidden="true" />
              Sending
            </>
          ) : (
            "Send Message"
          )}
        </button>

        {status === "success" && (
          <p className="contact-form__msg contact-form__msg--ok">
            Thanks for reaching out. We&rsquo;ll get back to you shortly.
          </p>
        )}
        {status === "error" && (
          <p className="contact-form__msg contact-form__msg--err">
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}
