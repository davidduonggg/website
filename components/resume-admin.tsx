"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import type { ResumeMetadata } from "@/lib/resume";

type UploadState = {
  status: "idle" | "uploading" | "success" | "error";
  message: string;
};

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function ResumeAdmin({
  fallbackUrl,
  initialResume,
}: {
  fallbackUrl: string;
  initialResume: ResumeMetadata | null;
}) {
  const [resume, setResume] = useState<ResumeMetadata | null>(initialResume);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>({
    status: "idle",
    message: "",
  });
  const currentResumeUrl = resume?.url ?? fallbackUrl;
  const selectedFileLabel = useMemo(() => {
    if (!selectedFile) {
      return "Choose a PDF";
    }

    return `${selectedFile.name} / ${formatFileSize(selectedFile.size)}`;
  }, [selectedFile]);

  async function uploadResume(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedFile) {
      setUploadState({ status: "error", message: "Choose a PDF resume first." });
      return;
    }

    const formData = new FormData();
    formData.set("resume", selectedFile);
    setUploadState({ status: "uploading", message: "Uploading resume..." });

    try {
      const response = await fetch("/api/admin/resume", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { resume?: ResumeMetadata; error?: string };

      if (!response.ok || !result.resume) {
        throw new Error(result.error ?? "Upload failed.");
      }

      setResume(result.resume);
      setSelectedFile(null);
      setUploadState({ status: "success", message: "Resume updated." });
    } catch (error) {
      setUploadState({
        status: "error",
        message: error instanceof Error ? error.message : "Upload failed.",
      });
    }
  }

  return (
    <main className="admin-shell">
      <section className="admin-panel">
        <div className="admin-copy">
          <Link className="admin-back" href="/">
            Back to site
          </Link>
          <p className="eyebrow">Resume admin</p>
          <h1>Upload a new resume</h1>
          <p>
            Upload a PDF here to update the public resume link without changing the repo. Use this page from a
            Vercel-authenticated deployment URL.
          </p>
        </div>

        <form className="resume-upload" onSubmit={uploadResume}>
          <label className="file-drop">
            <input
              accept="application/pdf,.pdf"
              type="file"
              onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
            />
            <span>{selectedFileLabel}</span>
          </label>
          <button type="submit" disabled={uploadState.status === "uploading"}>
            {uploadState.status === "uploading" ? "Uploading..." : "Upload resume"}
          </button>
          {uploadState.message ? <p className={`upload-status ${uploadState.status}`}>{uploadState.message}</p> : null}
        </form>
      </section>

      <section className="admin-preview" aria-labelledby="current-resume-heading">
        <div>
          <p className="eyebrow">Current resume</p>
          <h2 id="current-resume-heading">{resume ? resume.originalName : "Committed fallback PDF"}</h2>
          <p>{resume ? `Uploaded ${formatDate(resume.uploadedAt)} / ${formatFileSize(resume.size)}` : "Blob resume not uploaded yet."}</p>
          <a href={currentResumeUrl} target="_blank" rel="noreferrer">
            Open current PDF
          </a>
        </div>
        <iframe title="Current resume preview" src={currentResumeUrl} />
      </section>
    </main>
  );
}
