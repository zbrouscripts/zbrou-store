/** Tebex may append its own success flag to the return URL. */
export function isLoginCallback(query: Record<string, unknown>): boolean {
    if (query.auth_callback === "1") return true;
    const values = Array.isArray(query.success) ? query.success : [query.success];
    return values.some(value => value === "true" || value === "1");
}

export function getAuthRedirect(value: unknown): string {
    // Keep the callback inside this store, including when a path contains a
    // query string. Backslashes are treated as slashes by browser URL parsers.
    return typeof value === "string" && value.startsWith("/") &&
        !value.startsWith("//") && !/[\\\u0000-\u0020]/.test(value)
        ? value : "/";
}
