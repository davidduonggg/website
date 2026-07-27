import { headers } from "next/headers";
import { notFound } from "next/navigation";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function hostnameFromHostHeader(hostHeader: string | null) {
  if (!hostHeader) {
    return "";
  }

  return hostHeader.split(":")[0]?.toLowerCase() ?? "";
}

function isLocalHost(hostname: string) {
  return LOCAL_HOSTS.has(hostname);
}

function isPublicProductionHost(hostname: string) {
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.toLowerCase();

  return Boolean(productionHost && hostname === productionHost);
}

function isCurrentVercelDeploymentHost(hostname: string) {
  const deploymentHost = process.env.VERCEL_URL?.toLowerCase();

  return Boolean(deploymentHost && hostname === deploymentHost);
}

export function canUseResumeAdmin(hostHeader: string | null) {
  const hostname = hostnameFromHostHeader(hostHeader);

  if (!hostname || isLocalHost(hostname)) {
    return true;
  }

  if (!process.env.VERCEL) {
    return true;
  }

  return isCurrentVercelDeploymentHost(hostname) && !isPublicProductionHost(hostname);
}

export async function requireResumeAdminPage() {
  const headerStore = await headers();

  if (!canUseResumeAdmin(headerStore.get("host"))) {
    notFound();
  }
}

export function requireResumeAdminRequest(request: Request) {
  if (!canUseResumeAdmin(request.headers.get("host"))) {
    return Response.json(
      {
        error:
          "Resume admin is disabled on the public production domain. Open this route from a Vercel-authenticated deployment URL.",
      },
      { status: 404 },
    );
  }

  return null;
}
