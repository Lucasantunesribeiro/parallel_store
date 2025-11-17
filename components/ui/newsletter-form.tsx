"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
  };

  return (
    <section className="rounded-3xl border border-black/10 bg-black text-white p-8">
      <p className="text-xs uppercase tracking-[0.4em] text-secondary">Newsletter</p>
      <h3 className="mt-2 text-2xl font-bold">Receba drops exclusivos e convites de eventos.</h3>
      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4 md:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="seu@email.com"
          className="flex-1 rounded-full border border-white/10 bg-white/10 px-6 py-3 text-white placeholder:text-white/60 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-secondary/90 disabled:opacity-60"
        >
          {status === 'success' ? 'Inscrito' : 'Assinar' }
        </button>
      </form>
    </section>
  );
}
