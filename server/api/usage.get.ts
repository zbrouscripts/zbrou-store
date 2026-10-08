// Public-facing aggregate usage metrics. Without a trusted data source, never fabricate counts.
// Configure ZBROU_USAGE_ENDPOINT (https only) and optionally ZBROU_USAGE_TOKEN as Cloudflare secrets.
// Expected upstream JSON:
// { "serversActive": 12, "playersOnline": 220, "installations": 58, "updatedAt": "2026-10-08T..." }
// No usernames, IP addresses, server identifiers or customer details are requested.
type Metric = number | null;
interface UsageData {
  connected: boolean;
  serversActive: Metric;
  playersOnline: Metric;
  installations: Metric;
  updatedAt: string | null;
}
const offline: UsageData = {
  connected: false,
  serversActive: null,
  playersOnline: null,
  installations: null,
  updatedAt: null,
};
const normalize = (value: unknown): Metric =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= 0 && value <= 1_000_000_000
    ? value
    : null;
export default defineEventHandler(async (event): Promise<UsageData> => {
  setHeader(event, "Cache-Control", "public, max-age=60, stale-while-revalidate=120");
  const config = useRuntimeConfig(event);
  const source = String(config.zbrouUsageEndpoint || "");
  if (!source) return offline;
  let url: URL;
  try {
    url = new URL(source);
    if (url.protocol !== "https:") return offline;
  } catch { return offline; }
  try {
    const token = String(config.zbrouUsageToken || "");
    const result = await $fetch<Record<string, unknown>>(url.toString(), {
      timeout: 4500,
      headers: token ? { Authorization: "Bearer " + token } : {},
    });
    if (!result || typeof result !== "object") return offline;
    const serversActive = normalize(result.serversActive);
    const playersOnline = normalize(result.playersOnline);
    const installations = normalize(result.installations);
    if ([serversActive, playersOnline, installations].every((value) => value === null)) return offline;
    const timestamp = typeof result.updatedAt === "string" && !Number.isNaN(Date.parse(result.updatedAt))
      ? new Date(result.updatedAt).toISOString()
      : null;
    return { connected: true, serversActive, playersOnline, installations, updatedAt: timestamp };
  } catch {
    return offline;
  }
});
