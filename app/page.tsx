import { HomePage } from "@/components/home-page";
import { getResumeTarget } from "@/lib/resume";

export const dynamic = "force-dynamic";

export default async function Page() {
  const resumeHref = await getResumeTarget();

  return <HomePage resumeHref={resumeHref} />;
}
