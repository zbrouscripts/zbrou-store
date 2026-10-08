// Optional public purchase feed. The configured source must contain only data approved for display.
interface PublicPurchase { name: string; product: string; avatar: string | null; time: string }
interface CommunityData { connected: boolean; satisfaction: number | null; purchases: PublicPurchase[] }
const empty: CommunityData = { connected: false, satisfaction: null, purchases: [] };
export default defineEventHandler(async (event): Promise<CommunityData> => {
  setHeader(event, "Cache-Control", "public, max-age=60, stale-while-revalidate=120");
  const config = useRuntimeConfig(event), source = String(config.zbrouCommunityEndpoint || "");
  if (!source) return empty;
  try {
    const url = new URL(source); if (url.protocol !== "https:") return empty;
    const result = await $fetch<Record<string, unknown>>(url.toString(), {
      timeout: 4500, headers: config.zbrouCommunityToken ? { Authorization: "Bearer " + config.zbrouCommunityToken } : {},
    });
    const satisfaction = typeof result.satisfaction === "number" && Number.isFinite(result.satisfaction) && result.satisfaction >= 0 && result.satisfaction <= 100 ? result.satisfaction : null;
    const purchases = Array.isArray(result.purchases) ? result.purchases.slice(0, 12).flatMap((raw: unknown) => {
      if (!raw || typeof raw !== "object") return [];
      const p = raw as Record<string, unknown>;
      if (typeof p.name !== "string" || !p.name.trim() || typeof p.product !== "string" || typeof p.time !== "string" || Number.isNaN(Date.parse(p.time))) return [];
      let avatar: string | null = null;
      if (typeof p.avatar === "string") { try { const a = new URL(p.avatar); if (a.protocol === "https:" && !a.username && !a.password) avatar = a.toString(); } catch {} }
      return [{ name: p.name.trim().slice(0, 40), product: p.product.trim().slice(0, 60), time: new Date(p.time).toISOString(), avatar }];
    }) : [];
    return { connected: satisfaction !== null || purchases.length > 0, satisfaction, purchases };
  } catch { return empty; }
});
