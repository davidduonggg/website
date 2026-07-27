import { FALLBACK_RESUME_URL, getLatestResume } from "@/lib/resume";

export const dynamic = "force-dynamic";

export async function GET() {
  const latestResume = await getLatestResume();

  return Response.json({
    resume: latestResume,
    fallbackUrl: FALLBACK_RESUME_URL,
  });
}
