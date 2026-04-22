import { FALLBACK_IMAGE } from "./config.js";

export function resolveImage(image) {
  const file = String(image || "").trim();
  return file
    ? `./assets/images/invitations/${file}`
    : FALLBACK_IMAGE;
}

export function renderCard(invitation, helpers) {
  const { formatPrice, resolvePages, resolveType, typeMap } = helpers;

  const name = invitation?.name || "Convite sem título";
  const price = formatPrice(invitation?.price);
  const { label, format } = resolveType(invitation.typeFile, typeMap);
  const pages = resolvePages(invitation?.pages);
  const image = resolveImage(invitation?.image);

  return `
    <article class="catalog-item">
      <div class="card-header">
        <img
          src="${image}"
          alt="Capa do ${name}"
          onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
          loading="lazy"
        >
      </div>

      <div class="card-body">
        <div class="card-title-price">
          <h3>${name}</h3>
          <span class="price">${price}</span>
        </div>
        <span class="tag">${format ? `${label} (${format})` : label} - Pag. ${pages}</span>
      </div>

      <div class="card-footer">
        <button class="filter-btn" data-id="${invitation.id}">
          Solicitar
        </button>
      </div>
    </article>
  `;
}

export function renderCatalog(container, invitations, helpers) {
  if (!container) {
    console.error("Elemento #catalog não encontrado.");
    return;
  }

  if (!invitations.length) {
    container.innerHTML = `
      <article class="catalog-item">
        <div class="card-body">
          <h3>Nenhum convite disponível no momento.</h3>
        </div>
      </article>
    `;
    return;
  }

  container.innerHTML = invitations
    .map((inv) => renderCard(inv, helpers))
    .join("");
}
