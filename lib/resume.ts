import { get } from "@vercel/blob";

export const FALLBACK_RESUME_URL = "/David_Duong_Resume.pdf";
export const LATEST_RESUME_PATH = "resume/latest.json";

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

export async function getResumeTarget() {
  const latestResume = await getLatestResume();

  return latestResume?.url ?? FALLBACK_RESUME_URL;
}
