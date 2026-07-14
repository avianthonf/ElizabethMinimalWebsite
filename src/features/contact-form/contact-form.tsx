"use client";

import { useEffect, useActionState, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { submitInquiry, type FormState } from "@/app/(site)/contact/actions";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import styles from "./contact-form.module.css";

const initialState: FormState = { success: false };

const fadeSlideUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3 },
};

export function ContactForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);
  const formId = useId();
  /**
   * Timestamp (ms) when the user first interacts with the form.
   * Used server-side to reject bot submissions made in < 3 seconds.
   * Must be state (not ref) because it is read during render in the
   * hidden input's value attribute.
   */
  const [startedAt, setStartedAt] = useState(() => String(Date.now()));

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

      <AnimatePresence mode="wait">
        {state.success && state.message && (
          <motion.div
            key="success"
            className={styles.success}
            role="status"
            aria-live="polite"
            {...fadeSlideUp}
          >
            <Text variant="muted">{state.message}</Text>
          </motion.div>
        )}

        {!state.success && (
          <motion.form
            key="form"
            action={formAction}
            className={styles.form}
            onChange={() => {
              if (!startedAt) {
                setStartedAt(String(Date.now()));
              }
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            aria-label="Contact inquiry form"
          >
            {/* Timing-based bot detection — records when the user first interacts */}
            <input type="hidden" name="submissionStartedAt" value={startedAt ?? ""} />

            {/* Honeypot field — visually hidden from humans, bots fill it in */}
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor={`${formId}-website`}>Website</label>
              <input
                id={`${formId}-website`}
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor={`${formId}-name`} className={styles.label}>
                Name{" "}
                <span className={styles.required} aria-hidden="true">
                  *
                </span>
              </label>
              <input
                id={`${formId}-name`}
                name="name"
                type="text"
                required
                aria-required="true"
                autoComplete="name"
                className={styles.input}
                aria-describedby={state.errors?.name ? `${formId}-name-error` : undefined}
                aria-invalid={state.errors?.name ? "true" : undefined}
              />
              <AnimatePresence>
                {state.errors?.name && (
                  <motion.span
                    id={`${formId}-name-error`}
                    className={styles.error}
                    role="alert"
                    {...fadeSlideUp}
                  >
                    {state.errors.name[0]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className={styles.field}>
              <label htmlFor={`${formId}-email`} className={styles.label}>
                Email{" "}
                <span className={styles.required} aria-hidden="true">
                  *
                </span>
              </label>
              <input
                id={`${formId}-email`}
                name="email"
                type="email"
                required
                aria-required="true"
                autoComplete="email"
                className={styles.input}
                aria-describedby={state.errors?.email ? `${formId}-email-error` : undefined}
                aria-invalid={state.errors?.email ? "true" : undefined}
              />
              <AnimatePresence>
                {state.errors?.email && (
                  <motion.span
                    id={`${formId}-email-error`}
                    className={styles.error}
                    role="alert"
                    {...fadeSlideUp}
                  >
                    {state.errors.email[0]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className={styles.field}>
              <label htmlFor={`${formId}-phone`} className={styles.label}>
                Phone{" "}
                <span className={styles.optional} aria-hidden="true">
                  (optional)
                </span>
              </label>
              <input
                id={`${formId}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                className={styles.input}
                aria-describedby={state.errors?.phone ? `${formId}-phone-error` : undefined}
              />
              <AnimatePresence>
                {state.errors?.phone && (
                  <motion.span
                    id={`${formId}-phone-error`}
                    className={styles.error}
                    role="alert"
                    {...fadeSlideUp}
                  >
                    {state.errors.phone[0]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className={styles.field}>
              <label htmlFor={`${formId}-subject`} className={styles.label}>
                Subject{" "}
                <span className={styles.required} aria-hidden="true">
                  *
                </span>
              </label>
              <input
                id={`${formId}-subject`}
                name="subject"
                type="text"
                required
                aria-required="true"
                className={styles.input}
                aria-describedby={state.errors?.subject ? `${formId}-subject-error` : undefined}
                aria-invalid={state.errors?.subject ? "true" : undefined}
              />
              <AnimatePresence>
                {state.errors?.subject && (
                  <motion.span
                    id={`${formId}-subject-error`}
                    className={styles.error}
                    role="alert"
                    {...fadeSlideUp}
                  >
                    {state.errors.subject[0]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className={styles.field}>
              <label htmlFor={`${formId}-message`} className={styles.label}>
                Message{" "}
                <span className={styles.required} aria-hidden="true">
                  *
                </span>
              </label>
              <textarea
                id={`${formId}-message`}
                name="message"
                required
                aria-required="true"
                rows={5}
                className={styles.textarea}
                aria-describedby={state.errors?.message ? `${formId}-message-error` : undefined}
                aria-invalid={state.errors?.message ? "true" : undefined}
              />
              <AnimatePresence>
                {state.errors?.message && (
                  <motion.span
                    id={`${formId}-message-error`}
                    className={styles.error}
                    role="alert"
                    {...fadeSlideUp}
                  >
                    {state.errors.message[0]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="submit"
              className={styles.submit}
              disabled={isPending}
              whileHover={{ scale: isPending ? 1 : 1.02 }}
              whileTap={{ scale: isPending ? 1 : 0.98 }}
              aria-busy={isPending}
            >
              {isPending ? "Sending…" : "Send Inquiry"}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
