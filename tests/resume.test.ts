import { describe, expect, it } from "vitest";
import { shouldUseUploadedResume, type ResumeMetadata } from "@/lib/resume";

function resumeMetadata(uploadedAt: string): ResumeMetadata {
  return {
    url: "https://example.com/resume.pdf",
    downloadUrl: "https://example.com/resume.pdf?download=1",
    pathname: "resumes/resume.pdf",
    uploadedAt,
    size: 1024,
    originalName: "resume.pdf",
  };
}

describe("resume selection", () => {
  it("keeps the bundled resume when the uploaded copy is older", () => {
    expect(shouldUseUploadedResume(resumeMetadata("2026-07-27T10:00:00.000Z"))).toBe(false);
  });

  it("uses an uploaded resume when it is newer than the bundled copy", () => {
    expect(shouldUseUploadedResume(resumeMetadata("2026-10-16T10:00:00.000Z"))).toBe(true);
  });

  it("ignores missing or invalid upload metadata", () => {
    expect(shouldUseUploadedResume(null)).toBe(false);
    expect(shouldUseUploadedResume(resumeMetadata("not-a-date"))).toBe(false);
  });
});
