import { redirect } from "next/navigation";
import { getResumeTarget } from "@/lib/resume";

export const dynamic = "force-dynamic";

export async function GET() {
  redirect(await getResumeTarget());
}
