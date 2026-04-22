import { PRICE_FORMATTER } from "./config.js";

export function createTypeMap(types = []) {
    return new Map(
        types.map((type) => {
            const key = String(type?.id || "").toLowerCase();

            return [
                key,
                {
                    label: String(type?.label || "Arquivo").toUpperCase(),
                    format: type?.file
                        ? `.${String(type.file)}`
                        : ""
                }
            ];
        })
    );
}

export function formatPrice(price) {
    const value = Number(price);
    return Number.isFinite(value)
        ? PRICE_FORMATTER.format(value)
        : "Sob consulta";
}

export function resolvePages(pages) {
    const value = Number(pages);
    return Number.isFinite(value) && value > 0 ? Math.trunc(value) : 1;
}

export function resolveType(type, typeMap) {
    const key = String(type || "").toLowerCase();

    return (
        typeMap.get(key) || {
            label: key.toUpperCase(),
            format: ""
        }
    );
}
