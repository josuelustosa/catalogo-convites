import { fetchCatalog } from "./services.js";
import {
    createTypeMap,
    createTypeMapping,
    filterInvitationsByType,
    formatPrice,
    generateNavFilters,
    resolvePages,
    resolveType
} from "./domain.js";
import { renderCatalog } from "./ui.js";
import { initFilters } from "./filters.js";

const catalogEl = document.getElementById("catalog");

// Estado global do aplicativo
let allInvitations = [];
let typeMap = null;
let typeMapping = null;
let navFilters = [];
let helpers = {};

export function getNavFilters() {
    return navFilters;
}

export function filterByCategory(category) {
    const filtered = filterInvitationsByType(allInvitations, category, typeMapping);
    renderCatalog(catalogEl, filtered, helpers);
}

async function init() {
    const payload = await fetchCatalog();

    const types = Array.isArray(payload?.types) ? payload.types : [];
    allInvitations = Array.isArray(payload?.invitations)
        ? payload.invitations
        : [];

    typeMap = createTypeMap(types);
    typeMapping = createTypeMapping(types);
    navFilters = generateNavFilters(types);

    helpers = {
        formatPrice,
        resolvePages,
        resolveType,
        typeMap
    };

    renderCatalog(catalogEl, allInvitations, helpers);
    initFilters(navFilters, filterByCategory);
}

init();