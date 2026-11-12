'use client';

import { useRef, useState } from 'react';

const cardClassName =
  'rounded-xl border border-white/10 bg-black/20 p-4 transition-colors hover:border-[#D83A43]/50';

export default function ContactSection() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState('');
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const focusMessageInput = () => {
    setIsComposing(true);
    setStatus('');
    requestAnimationFrame(() => messageInputRef.current?.focus());
  };

  const sendEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    setStatus('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
      });
      const result: { error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'We could not send your message.');
      }

      setEmail('');
      setMessage('');
      setIsComposing(false);
      setStatus('Your message was sent successfully. Thank you!');
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : 'We could not send your message. Please try again.',
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-6xl px-6 pb-24 pt-16 sm:px-8 lg:px-12"
      aria-labelledby="contact-heading"
    >
      <div className="relative overflow-hidden rounded-3xl border border-[#302126] bg-[#0d0b0e]/90 px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#D83A43]/10 blur-3xl"
        />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#D83A43]">
              Have a project in mind?
            </p>
            <h2
              id="contact-heading"
              className="editorial-heading mt-4 max-w-2xl text-4xl sm:text-5xl"
            >
              Let&apos;s Work Together.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-neutral-400">
              I&apos;m open to discussing thoughtful digital products and
              meaningful collaborations.
            </p>
          </div>

          <form
            onSubmit={sendEmail}
            className={`flex w-full flex-col gap-2 lg:w-auto ${
              isComposing ? 'lg:min-w-[26rem]' : ''
            }`}
          >
            {isComposing ? (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email address"
                  aria-label="Your email address"
                  autoComplete="email"
                  maxLength={254}
                  className="min-h-12 min-w-0 rounded-xl border border-white/15 bg-black/40 px-4 text-sm text-white outline-none transition-colors placeholder:text-neutral-500 focus:border-[#D83A43]"
                  required
                />
                <textarea
                  ref={messageInputRef}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Tell me about your project"
                  aria-label="Your message"
                  maxLength={5000}
                  rows={3}
                  className="min-w-0 rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-neutral-500 focus:border-[#D83A43]"
                  required
                />
                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#D83A43] px-5 text-sm font-semibold text-white shadow-[0_2px_16px_rgba(216,58,67,0.24)] transition-colors hover:bg-[#C92F3A] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSending ? 'Sending...' : 'Send message'}{' '}
                  <span aria-hidden="true">↗</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={focusMessageInput}
                className="inline-flex min-h-12 w-fit items-center gap-3 rounded-xl bg-[#D83A43] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_2px_16px_rgba(216,58,67,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#C92F3A]"
              >
                Get In Touch by Email <span aria-hidden="true">↗</span>
              </button>
            )}
            {status && (
              <p
                role="status"
                aria-live="polite"
                className="text-sm text-neutral-300"
              >
                {status}
              </p>
            )}
          </form>
        </div>

        <div className="relative mt-10 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
          <a
            href="https://github.com/samiryousr"
            target="_blank"
            rel="noopener noreferrer"
            className={cardClassName}
          >
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
              GitHub
            </span>
            <span className="mt-2 block text-sm font-medium text-neutral-200">
              View my GitHub ↗
            </span>
          </a>
          <button
            type="button"
            onClick={focusMessageInput}
            className={`${cardClassName} text-left`}
          >
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
              Email
            </span>
            <span className="mt-2 block break-all text-sm font-medium text-neutral-200">
              Send me an email ↗
            </span>
          </button>
          <a
            href="https://www.linkedin.com/in/samir-yousri-9335692b5/?isSelfProfile=true"
            target="_blank"
            rel="noopener noreferrer"
            className={cardClassName}
          >
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
              LinkedIn
            </span>
            <span className="mt-2 block text-sm font-medium text-neutral-200">
              Samir Yousri ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
