const NAV_FILTERS = [
    {
        id: 1,
        title: "Todos",
        value: "todos"
    },
    {
        id: 2,
        title: "Digitais",
        value: "digitais"
    },
    {
        id: 3,
        title: "Interativos",
        value: "interativos"
    },
    {
        id: 4,
        title: "Animados",
        value: "animados"
    }
];

const filter = document.getElementById("filter-buttons");

const filterList = NAV_FILTERS.map((item, index) => {
    const filterNumber = item.id ?? index + 1;
    const isActive = filterNumber === 1 ? ' active' : '';

    return `
        <button class="filter-btn${isActive}" data-filter="${item.value}">${item.title}</button>
    `;
});

if (filter) {
    filter.innerHTML = filterList.join("");

    const filterButtons = filter.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Adicionar classe active apenas ao botão clicado
            e.target.classList.add('active');
        });
    });
}
