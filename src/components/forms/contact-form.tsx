"use client";

import { useState, useTransition } from "react";

import { contactContent } from "@/data/site";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (submitted) {
    return (
      <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-6">
        <p className="font-display text-3xl uppercase tracking-[0.12em] text-white/90">
          {contactContent.successTitle}
        </p>
        <p className="mt-4 text-sm leading-7 text-white/58">
          {contactContent.successCopy}
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        startTransition(() => setSubmitted(true));
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {["Name", "Email"].map((label) => (
          <label key={label} className="space-y-2 text-sm text-white/58">
            <span>{label}</span>
            <input
              required
              className="field-shell h-12 w-full rounded-[1rem] px-4 text-white outline-none"
            />
          </label>
        ))}
      </div>
      <label className="space-y-2 text-sm text-white/58">
        <span>Message</span>
        <textarea
          required
          rows={6}
          className="field-shell w-full rounded-[1rem] px-4 py-4 text-white outline-none"
        />
      </label>
      <button
        type="submit"
        className="button-primary inline-flex justify-center rounded-full px-6 py-4 text-xs font-semibold uppercase tracking-[0.28em]"
      >
        {isPending ? "Sending" : "Send message"}
      </button>
    </form>
  );
}
