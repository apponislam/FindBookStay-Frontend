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

/**
 * Resizes and compresses an image File to a lightweight base64 JPEG
 * to prevent payload-too-large errors when submitting to the server.
 */
export const compressImage = (
    file: File,
    maxWidth = 400,
    maxHeight = 400,
    quality = 0.82
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                let { width, height } = img;
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    resolve(event.target?.result as string);
                    return;
                }
                ctx.drawImage(img, 0, 0, width, height);
                const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
                resolve(compressedBase64);
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};

export const toBengaliDigits = (val: number | string): string => {
    const BENGALI_DIGITS: Record<string, string> = {
        "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
        "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯",
    };
    return String(val).replace(/[0-9]/g, (digit) => BENGALI_DIGITS[digit] || digit);
};

export const formatLocaleNumber = (val: number | string, isBn: boolean): string => {
    if (!isBn) return String(val);
    return toBengaliDigits(val);
};

export default getImageUrl;
