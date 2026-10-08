import type { CategoryWithPackages, Package } from "~/types";
import { phrasekillCoverImage } from "~/utils/brandImages";

export const isPhrasekill = (pkg: Pick<Package, "id" | "name">) =>
    pkg.id === 7706999 || /(?:phrase|frase)[\s_-]*kill/i.test(pkg.name);

// Render API descriptions as text, never as executable HTML.
export const productText = (html: string = "") => html
    .replace(/<\/(p|div|h[1-6]|li)>|<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<").replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"').replace(/&#39;/g, "'")
    .replace(/\n\s*\n+/g, "\n\n").trim();

export interface StoreProduct {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    image: string;
    href: string;
    featured: boolean;
    pkg?: Package;
}

export function getCatalogProducts(categories: CategoryWithPackages[] = []): StoreProduct[] {
    const seen = new Set<number>();
    const products: StoreProduct[] = categories.flatMap(category => (category.packages ?? []).flatMap(pkg => {
        if (seen.has(pkg.id)) return [];
        seen.add(pkg.id);
        const featured = isPhrasekill(pkg);
        return [{
            id: String(pkg.id), name: pkg.name,
            category: category.name === "Packages" ? "Scripts" : category.name || "Scripts",
            description: featured ? "Tus eliminaciones, con tu propia firma." : productText(pkg.description).split("\n").find(Boolean)?.slice(0, 95) || "Un nuevo recurso para tu servidor.",
            price: pkg.base_price, image: pkg.image || phrasekillCoverImage,
            href: featured ? "/script/phrasekill" : "/script/" + pkg.id,
            featured, pkg,
        }];
    }));
    if (!products.some(product => product.featured)) products.unshift({
        id: "phrasekill", name: "PhraseKill", category: "Gameplay",
        description: "Tus eliminaciones, con tu propia firma.",
        price: Infinity, image: phrasekillCoverImage, href: "/script/phrasekill", featured: true,
    });
    return products;
}
