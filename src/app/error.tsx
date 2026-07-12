"use client";

import { ErrorPage } from "@/features/error-isolation/error-page";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorPage error={error} reset={reset} label="Root" />;
}
