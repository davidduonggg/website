import { put } from "@vercel/blob";
import { blobCommandOptions, LATEST_RESUME_PATH, type ResumeMetadata } from "@/lib/resume";
import { requireResumeAdminRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_RESUME_BYTES = 8 * 1024 * 1024;

function safeFilename(filename: string) {
  return filename
    .toLowerCase()
    .replace(/\.pdf$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);
}

export async function POST(request: Request) {
  const authError = requireResumeAdminRequest(request);

  if (authError) {
    return authError;
  }

  const formData = await request.formData();
  const file = formData.get("resume");

  if (!(file instanceof File)) {
    return Response.json({ error: "Choose a PDF resume to upload." }, { status: 400 });
  }

  if (file.size > MAX_RESUME_BYTES) {
    return Response.json({ error: "Resume PDF must be 8 MB or smaller." }, { status: 400 });
  }

  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    return Response.json({ error: "Resume must be a PDF." }, { status: 400 });
  }

  const uploadedAt = new Date().toISOString();
  const filename = safeFilename(file.name) || "david-duong-resume";
  const resumeBlob = await put(`resumes/${filename}-${Date.now()}.pdf`, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: "application/pdf",
    cacheControlMaxAge: 31536000,
    ...blobCommandOptions(),
  });
  const metadata: ResumeMetadata = {
    url: resumeBlob.url,
    downloadUrl: resumeBlob.downloadUrl,
    pathname: resumeBlob.pathname,
    uploadedAt,
    size: file.size,
    originalName: file.name,
  };

  await put(LATEST_RESUME_PATH, JSON.stringify(metadata), {
    access: "public",
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
    ...blobCommandOptions(),
  });

  return Response.json({ resume: metadata });
}
