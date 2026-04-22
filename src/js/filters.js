export function initFilters(navFilters, onFilterChange) {
    const filter = document.getElementById("filter-buttons");

    if (!filter) return;

    const filterList = navFilters.map((item, index) => {
        const filterNumber = item.id ?? index + 1;
        const isActive = filterNumber === 1 ? ' active' : '';

        return `
            <button class="filter-btn${isActive}" data-filter="${item.value}">${item.title}</button>
        `;
    });

    filter.innerHTML = filterList.join("");

    const filterButtons = filter.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Adicionar classe active apenas ao botão clicado
            e.target.classList.add('active');

            // Filtrar o catálogo pela categoria selecionada
            const selectedCategory = e.target.getAttribute('data-filter');
            onFilterChange(selectedCategory);
        });
    });
}
