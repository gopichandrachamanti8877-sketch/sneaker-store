const ORDERS_KEY = 'sneaker_demo_orders_v3';

function readOrders() {
    try {
        return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
    } catch {
        return [];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const user = currentUser();

    if (!user) {
        location.replace('login.html?next=checkout');
        return;
    }

    if (!cart.length) {
        location.replace('cart.html');
        return;
    }

    document.getElementById('checkout-email').textContent = user.email;

    document.getElementById('email').value = user.email;

    document.getElementById('fullname').value = user.name;

    document.getElementById('checkout-total').textContent = money(cartTotal());

    document.getElementById('checkout-lines').innerHTML = cart.map(x => {
        const p = findProduct(x.id);

        return `
            <div class="summary-row">
                <span>
                    ${p.name} · EU ${x.size} × ${x.qty}
                </span>
                <strong>
                    ${money(p.price * x.qty)}
                </strong>
            </div>
        `;
    }).join('');
});

function submitOrder(event) {
    event.preventDefault();

    const f = event.currentTarget;

    const fields = [
        'fullname',
        'email',
        'address',
        'city',
        'zip',
        'country'
    ];

    const values = Object.fromEntries(
        fields.map(k => [k, f.elements[k].value.trim()])
    );

    if (
        values.fullname.length < 2 ||
        !emailValid(values.email) ||
        values.address.length < 5 ||
        values.city.length < 2 ||
        values.zip.length < 3 ||
        values.country.length < 2
    ) {
        return showError(
            'form-error',
            'Please enter valid shipping details in every field.'
        );
    }

    if (!currentUser() || !cart.length) {
        return showError(
            'form-error',
            'Please sign in and add items first.'
        );
    }

    if (
        cart.some(
            x =>
                cart
                    .filter(i => i.id === x.id)
                    .reduce((s, i) => s + i.qty, 0) >
                findProduct(x.id).stock
        )
    ) {
        return showError(
            'form-error',
            'An item exceeds demo availability. Please adjust your bag.'
        );
    }

    const payment = f.elements.payment.value;

    if (!['demo-card', 'demo-wallet', 'demo-cod'].includes(payment)) {
        return showError(
            'form-error',
            'Choose a demo payment option.'
        );
    }

    const order = {
        id: 'SOLE-' + Date.now().toString(36).toUpperCase(),

        date: new Date().toISOString(),

        customer: currentUser().email,

        items: cart.map(x => ({
            ...x,
            name: findProduct(x.id).name,
            price: findProduct(x.id).price
        })),

        total: cartTotal(),

        payment,

        shipping: values,

        status: 'Demo confirmed'
    };

    localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify([...readOrders(), order])
    );

    localStorage.setItem(
        'sneaker_last_demo_order',
        JSON.stringify(order)
    );

    cart = [];

    saveCart();

    location.href = 'success.html';
}