import { ResumeAdmin } from "@/components/resume-admin";
import { requireResumeAdminPage } from "@/lib/admin-auth";
import { FALLBACK_RESUME_URL, getLatestResume } from "@/lib/resume";

export const dynamic = "force-dynamic";

export default async function ResumeAdminPage() {
  await requireResumeAdminPage();
  const latestResume = await getLatestResume();

  return <ResumeAdmin fallbackUrl={FALLBACK_RESUME_URL} initialResume={latestResume} />;
}
