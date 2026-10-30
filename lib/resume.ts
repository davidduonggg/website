import { get } from "@vercel/blob";

export const FALLBACK_RESUME_URL = "/David_Duong_Resume.pdf?v=2026-10-15";
export const LATEST_RESUME_PATH = "resume/latest.json";
const FALLBACK_RESUME_UPDATED_AT = Date.parse("2026-10-15T16:38:59.000Z");

export type ResumeMetadata = {
  url: string;
  downloadUrl: string;
  pathname: string;
  uploadedAt: string;
  size: number;
  originalName: string;
};

export function blobCommandOptions() {
  return process.env.BLOB_READ_WRITE_TOKEN ? { token: process.env.BLOB_READ_WRITE_TOKEN } : {};
}

async function streamToText(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let result = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    result += decoder.decode(value, { stream: true });
  }

  result += decoder.decode();

  return result;
}

export async function getLatestResume() {
  try {
    const latest = await get(LATEST_RESUME_PATH, {
      access: "public",
      useCache: false,
      ...blobCommandOptions(),
    });

    if (!latest || latest.statusCode !== 200) {
      return null;
    }

    return JSON.parse(await streamToText(latest.stream)) as ResumeMetadata;
  } catch {
    return null;
  }
}

export function shouldUseUploadedResume(latestResume: ResumeMetadata | null) {
  if (!latestResume) {
    return false;
  }

  const uploadedAt = Date.parse(latestResume.uploadedAt);

  return Number.isFinite(uploadedAt) && uploadedAt > FALLBACK_RESUME_UPDATED_AT;
}

export async function getResumeTarget() {
  const latestResume = await getLatestResume();

  if (shouldUseUploadedResume(latestResume) && latestResume) {
    return latestResume.url;
  }

  return FALLBACK_RESUME_URL;
}
