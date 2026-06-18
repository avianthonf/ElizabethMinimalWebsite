"use client";

import { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { submitInquiry, type FormState } from "./actions";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import styles from "./ContactForm.module.css";

const initialState: FormState = { success: false };

export function ContactForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);

  // Redirect to thank-you page on successful submission (in effect, not render)
  useEffect(() => {
    if (state.success) {
      router.push("/contact/thank-you");
    }
  }, [state.success, router]);

  return (
    <div className={styles.formWrapper}>
      <Text variant="eyebrow">Get in Touch</Text>
      <Heading level="h2" variant="section">
        Send Us an Inquiry
      </Heading>
      <Text variant="muted" size="medium">
        Have a question about admissions, programs, or campus life? Fill out the form below and our
        team will respond within two business days.
      </Text>

      {state.success && state.message && (
        <div className={styles.success} role="alert">
          <Text variant="muted">{state.message}</Text>
        </div>
      )}

      {!state.success && (
        <form action={formAction} className={styles.form}>
          {/* Honeypot field — hidden from humans, bots fill it in */}
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Name <span className={styles.required}>*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className={styles.input}
              aria-describedby={state.errors?.name ? "name-error" : undefined}
            />
            {state.errors?.name && (
              <span id="name-error" className={styles.error} role="alert">
                {state.errors.name[0]}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email <span className={styles.required}>*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={styles.input}
              aria-describedby={state.errors?.email ? "email-error" : undefined}
            />
            {state.errors?.email && (
              <span id="email-error" className={styles.error} role="alert">
                {state.errors.email[0]}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="phone" className={styles.label}>
              Phone <span className={styles.optional}>(optional)</span>
            </label>
            <input id="phone" name="phone" type="tel" className={styles.input} />
          </div>

          <div className={styles.field}>
            <label htmlFor="subject" className={styles.label}>
              Subject <span className={styles.required}>*</span>
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              className={styles.input}
              aria-describedby={state.errors?.subject ? "subject-error" : undefined}
            />
            {state.errors?.subject && (
              <span id="subject-error" className={styles.error} role="alert">
                {state.errors.subject[0]}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="message" className={styles.label}>
              Message <span className={styles.required}>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className={styles.textarea}
              aria-describedby={state.errors?.message ? "message-error" : undefined}
            />
            {state.errors?.message && (
              <span id="message-error" className={styles.error} role="alert">
                {state.errors.message[0]}
              </span>
            )}
          </div>

          <button type="submit" className={styles.submit} disabled={isPending}>
            {isPending ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      )}
    </div>
  );
}
