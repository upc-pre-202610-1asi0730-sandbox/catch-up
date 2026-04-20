const logoApiUrl = import.meta.env.VITE_LOGO_API_URL;
const apiKey = import.meta.env.VITE_LOGO_PUBLISHABLE_API_KEY;

/**
 * Infrastructure helper for building Logo.dev image URLs.
 */
export class LogoDevApi {
    /**
     * Creates a logo URL based on the source host.
     *
     * @param {{url: string}} source
     * @returns {string}
     */
    getUrlToLogo(source) {
        return `${logoApiUrl}/${new URL(source.url).host}?token=${apiKey}`;
    }
}