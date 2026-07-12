"use client";

import { useState } from "react";

interface DeleteButtonProps {
  id: string;
  label: string;
  onDelete: (id: string) => Promise<void>;
}

export function DeleteButton({ id, label, onDelete }: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleClick() {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    setDeleting(true);
    await onDelete(id);
  }

  function handleCancel() {
    setConfirming(false);
  }

  return (
    <span style={{ display: "inline-flex", gap: "0.375rem", alignItems: "center" }}>
      <button
        type="button"
        onClick={handleClick}
        disabled={deleting}
        style={{
          padding: "0.25rem 0.5rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          color: confirming ? "#fff" : "#dc2626",
          background: confirming ? "#dc2626" : "transparent",
          border: confirming ? "none" : "1px solid #fecaca",
          borderRadius: "6px",
          cursor: deleting ? "wait" : "pointer",
          transition: "all 0.15s",
        }}
      >
        {deleting ? "Deleting…" : confirming ? `Delete ${label}?` : "Delete"}
      </button>
      {confirming && !deleting && (
        <button
          type="button"
          onClick={handleCancel}
          style={{
            padding: "0.25rem 0.5rem",
            fontSize: "0.75rem",
            color: "#64748b",
            background: "transparent",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      )}
    </span>
  );
}
