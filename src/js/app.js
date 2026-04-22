import { fetchCatalog } from "./services.js";
import {
    createTypeMap,
    formatPrice,
    resolvePages,
    resolveType
} from "./domain.js";
import { renderCatalog } from "./ui.js";

const catalogEl = document.getElementById("catalog");

async function init() {
    const payload = await fetchCatalog();

    const types = Array.isArray(payload?.types) ? payload.types : [];
    const invitations = Array.isArray(payload?.invitations)
        ? payload.invitations
        : [];

    const typeMap = createTypeMap(types);

    const helpers = {
        formatPrice,
        resolvePages,
        resolveType,
        typeMap
    };

    renderCatalog(catalogEl, invitations, helpers);
}

init();