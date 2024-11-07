export default function buildQueryParams(params) {
    const queryString = Object.keys(params)
        .filter((key) => params[key] !== null && params[key] !== undefined)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join("&");
    return queryString ? `?${queryString}` : "";
}