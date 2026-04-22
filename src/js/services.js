import { DATA_BASE_PATH } from "./config.js";

export async function fetchCatalog() {
    try {
        const res = await fetch(`${DATA_BASE_PATH}/catalog.json`);

        if (!res.ok) {
            throw new Error(`Erro HTTP: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Erro ao buscar catálogo:", error);
        return { types: [], invitations: [] };
    }
}
