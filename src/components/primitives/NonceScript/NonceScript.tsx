"use client";

import { useRef, useEffect } from "react";

export function NonceScript({ nonce, jsonLd }: { nonce: string; jsonLd: object }) {
  const ref = useRef<HTMLScriptElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.nonce = nonce;
  }, [nonce]);

  return (
    <script
      ref={ref}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
