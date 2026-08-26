import { getAssetUrl } from "./assets";

export const CATEGORY_IMAGES: Record<string, string[]> = {
  "brochure-designs": [],
  logos: Array.from({ length: 14 }, (_, i) => getAssetUrl(`portfolio/logo/${i + 1}.webp`)),
  "booklet-prints": [],
  "stationery-prints": [],
};

export const CATEGORY_MAP: Record<string, string> = {
  "brochure-designs": "Brochure Designs",
  logos: "Logos",
  "booklet-prints": "Booklet Prints",
  "stationery-prints": "Stationery Prints",
};
