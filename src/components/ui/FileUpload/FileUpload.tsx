"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./FileUpload.module.css";

interface FileUploadProps {
  /** Accepted file types */
  accept?: Record<string, string[]>;
  /** Max file size in bytes */
  maxSize?: number;
  /** Max number of files */
  maxFiles?: number;
  /** Multiple files */
  multiple?: boolean;
  /** Label */
  label?: string;
  /** Description */
  description?: string;
  /** Callback when files are selected */
  onFiles?: (files: File[]) => void;
  /** Show preview */
  showPreview?: boolean;
  disabled?: boolean;
  className?: string;
}

interface UploadedFile {
  file: File;
  preview?: string;
  status: "pending" | "uploading" | "done" | "error";
  progress?: number;
}

/**
 * FileUpload — drag & drop file upload zone.
 * Uses react-dropzone for file handling.
 *
 * Usage:
 *   <FileUpload
 *     accept={{ "image/*": [".jpg", ".png"] }}
 *     maxSize={5 * 1024 * 1024}
 *     onFiles={handleFiles}
 *   />
 */
export function FileUpload({
  accept,
  maxSize = 10 * 1024 * 1024,
  maxFiles = 5,
  multiple = true,
  label = "Upload Files",
  description = "Drag & drop files here, or click to browse",
  onFiles,
  showPreview = true,
  disabled = false,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        status: "pending" as const,
      }));

      setFiles((prev) => {
        const updated = [...prev, ...newFiles].slice(0, maxFiles);
        onFiles?.(updated.map((f) => f.file));
        return updated;
      });
    },
    [maxFiles, onFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles: maxFiles - files.length,
    multiple,
    disabled: disabled || files.length >= maxFiles,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const removed = prev[index];
      if (removed?.preview) URL.revokeObjectURL(removed.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      {label && <label className={styles.label}>{label}</label>}

      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ""} ${disabled ? styles.dropzoneDisabled : ""}`}
      >
        <input {...getInputProps()} />
        <div className={styles.icon}>📁</div>
        <p className={styles.text}>{description}</p>
        <p className={styles.hint}>
          Max {formatSize(maxSize)} • Up to {maxFiles} files
        </p>
      </div>

      {files.length > 0 && (
        <div className={styles.fileList}>
          {files.map((f, i) => (
            <div key={`${f.file.name}-${i}`} className={styles.fileItem}>
              {showPreview && f.preview ? (
                <img src={f.preview} alt={f.file.name} className={styles.preview} />
              ) : (
                <div className={styles.fileIcon}>📄</div>
              )}
              <div className={styles.fileInfo}>
                <span className={styles.fileName}>{f.file.name}</span>
                <span className={styles.fileSize}>{formatSize(f.file.size)}</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className={styles.remove}
                aria-label={`Remove ${f.file.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
