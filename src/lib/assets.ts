/**
 * Helper to resolve static assets from the public directory
 * taking into account Vite's BASE_URL for GitHub Pages subdirectories.
 */
export const getAssetUrl = (path: string): string => {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return `${normalizedBase}${cleanPath}`;
};

export const LOGO_URL = getAssetUrl("logo.png");
