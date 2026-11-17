export { cn } from "cn";

/**
 * Resolves an image URL:
 * - If the URL starts with http://, https://, data:, blob:, or //, it returns the URL directly.
 * - Otherwise, it prepends the backend server URL (e.g. http://localhost:5075/uploads/...).
 *
 * @param imageUrl The image path or remote URL
 * @param fallback Optional fallback URL if imageUrl is missing
 */
export const getImageUrl = (
    imageUrl?: string | null,
    fallback: string = ""
): string => {
    if (!imageUrl || typeof imageUrl !== "string") {
        return fallback;
    }

    const trimmed = imageUrl.trim();
    if (!trimmed) {
        return fallback;
    }

    // Direct URLs (http, https, base64 data, blob, or protocol-relative)
    if (
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://") ||
        trimmed.startsWith("data:") ||
        trimmed.startsWith("blob:") ||
        trimmed.startsWith("//")
    ) {
        return trimmed;
    }

    // Normalize Windows path separators and remove leading slashes
    const normalizedPath = trimmed.replace(/\\/g, "/").replace(/^\/+/, "");

    // Resolve backend base URL from environment
    const rawBase =
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:5075";

    // Clean base: strip /api/v1 or trailing slashes to target server root origin
    const baseOrigin = rawBase
        .replace(/\/api(\/v\d+)?\/?$/i, "")
        .replace(/\/+$/, "");

    return `${baseOrigin}/${normalizedPath}`;
};

export default getImageUrl;
