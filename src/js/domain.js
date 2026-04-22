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

export function createTypeMapping(types = []) {
    const mapping = {};

    types.forEach((type) => {
        const label = String(type?.label || "").toLowerCase();
        const file = String(type?.file || "").toLowerCase();
        const pluralKey = `${label}s`; // Digital -> digitais, Interativo -> interativos

        mapping[pluralKey] = file;
    });

    return mapping;
}

export function generateNavFilters(types = []) {
    const filters = [
        {
            id: 1,
            title: "Todos",
            value: "todos"
        }
    ];

    types.forEach((type, index) => {
        const label = String(type?.label || "");
        const value = `${label.toLowerCase()}s`; // Digital -> digitais

        filters.push({
            id: index + 2,
            title: label,
            value: value
        });
    });

    return filters;
}

export function filterInvitationsByType(invitations, filterType, typeMapping) {
    const type = String(filterType || "").toLowerCase();

    // Se o filtro é "todos", retorna todas as invitations
    if (type === "todos") {
        return invitations;
    }

    // Caso contrário, filtra pelo tipo de arquivo
    const targetType = typeMapping[type];
    if (!targetType) {
        return invitations;
    }

    return invitations.filter((invitation) =>
        String(invitation?.typeFile || "").toLowerCase() === targetType
    );
}
