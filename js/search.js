function renderProducts(list) {
    const el = document.getElementById('product-list');

    if (!el) {
        return;
    }

    el.innerHTML = list.map(productCard).join('');

    document.getElementById('no-results').hidden = list.length !== 0;

    document.getElementById('result-count').textContent =
        list.length + ' styles found';
}

function searchProducts() {
    const query = document.getElementById('search').value.trim().toLowerCase();

    const brand = document.getElementById('brand').value;

    const category = document.getElementById('category').value;

    const sort = document.getElementById('sort').value;

    let list = products.filter(
        p =>
            (!brand || p.brand === brand) &&
            (!category || p.category === category) &&
            [p.name, p.brand, p.category].some(
                s => s.toLowerCase().includes(query)
            )
    );

    if (sort === 'low') {
        list.sort((a, b) => a.price - b.price);
    }

    if (sort === 'high') {
        list.sort((a, b) => b.price - a.price);
    }

    renderProducts(list);
}

function clearSearch() {
    ['search', 'brand', 'category', 'sort'].forEach(
        id => document.getElementById(id).value = ''
    );

    searchProducts();
}

document.addEventListener('DOMContentLoaded', () => {
    const brand = document.getElementById('brand');

    const category = document.getElementById('category');

    if (!brand) {
        return;
    }

    [...new Set(products.map(p => p.brand))]
        .sort()
        .forEach(x => brand.add(new Option(x, x)));

    [...new Set(products.map(p => p.category))]
        .sort()
        .forEach(x => category.add(new Option(x, x)));

    searchProducts();
});