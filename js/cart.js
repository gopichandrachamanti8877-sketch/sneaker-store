/*
 * Sneaker Store — Shopping Cart
 *
 * Features:
 * 1. Store cart data in localStorage
 * 2. Add products to the cart
 * 3. Remove products from the cart
 * 4. Update product quantities
 * 5. Check stock availability
 * 6. Calculate cart totals
 * 7. Display cart items and order summary
 * 8. Show notification messages
 */

// ========================================
// 1. CART STORAGE KEY
// ========================================

const CART_KEY = 'sneaker_cart_v3';


// ========================================
// 2. READ CART FROM LOCAL STORAGE
// ========================================

function readCart() {
    try {
        const a = JSON.parse(localStorage.getItem(CART_KEY));

        return Array.isArray(a)
            ? a.filter(
                (x) =>
                    findProduct(x.id) &&
                    findProduct(x.id).sizes.includes(Number(x.size)) &&
                    Number.isInteger(x.qty) &&
                    x.qty > 0 &&
                    x.qty <= 99
            )
            : [];
    } catch {
        return [];
    }
}


// ========================================
// 3. INITIALIZE CART
// ========================================

let cart = readCart();


// ========================================
// 4. SAVE CART
// ========================================

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    updateCartBadge();
}


// ========================================
// 5. UPDATE CART BADGE
// ========================================

function updateCartBadge() {
    const el = document.getElementById('cart-count');

    if (el) {
        el.textContent = cart.reduce(
            (sum, item) => sum + item.qty,
            0
        );
    }
}


// ========================================
// 6. SHOW NOTIFICATION MESSAGE
// ========================================

function notify(message, type = 'success') {
    let el = document.getElementById('toast');

    if (!el) {
        el = document.createElement('div');

        el.id = 'toast';

        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');

        document.body.appendChild(el);
    }

    el.textContent = message;
    el.className = 'toast visible ' + type;

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(
        () => el.classList.remove('visible'),
        3400
    );
}


// ========================================
// 7. ADD PRODUCT TO CART
// ========================================

function addToCart(id) {
    const p = findProduct(id);

    if (!p) {
        return;
    }

    // Get selected shoe size
    const size = Number(
        document.getElementById('size')?.value || p.sizes[0]
    );

    // Validate selected size
    if (!p.sizes.includes(size)) {
        return notify(
            'Choose a valid size.',
            'error'
        );
    }

    // Check stock availability
    if (p.stock <= 0) {
        return notify(
            'This sneaker is currently sold out.',
            'error'
        );
    }

    // Find an existing cart item
    const item = cart.find(
        (x) => x.id === p.id && x.size === size
    );

    // Calculate quantity already in cart
    const current = cart
        .filter((x) => x.id === p.id)
        .reduce((n, x) => n + x.qty, 0);

    // Prevent adding more than available stock
    if (current >= p.stock) {
        return notify(
            'Only ' + p.stock + ' pairs available in this demo.',
            'error'
        );
    }

    // Increase quantity or add a new item
    if (item) {
        item.qty = Math.min(99, item.qty + 1);
    } else {
        cart.push({
            id: p.id,
            size,
            qty: 1
        });
    }

    // Save updated cart
    saveCart();

    // Display success notification
    notify(
        p.name + ' (EU ' + size + ') added to bag'
    );

    // Update cart message
    const note = document.getElementById('cart-message');

    if (note) {
        note.textContent = 'Added to your bag ✓';
        note.hidden = false;
    }
}


// ========================================
// 8. REMOVE PRODUCT FROM CART
// ========================================

function removeFromCart(id, size) {
    cart = cart.filter(
        (x) => !(x.id === id && x.size === size)
    );

    saveCart();

    renderCart();

    notify('Item removed from your bag');
}


// ========================================
// 9. UPDATE PRODUCT QUANTITY
// ========================================

function updateQty(id, size, value) {
    const qty = Number(value);

    const p = findProduct(id);

    const item = cart.find(
        (x) => x.id === id && x.size === size
    );

    // Validate quantity
    if (
        !item ||
        !Number.isInteger(qty) ||
        qty < 1 ||
        qty > 99
    ) {
        renderCart();
        return;
    }

    // Calculate quantity of other sizes
    const others = cart
        .filter((x) => x.id === id && x !== item)
        .reduce((n, x) => n + x.qty, 0);

    // Check available stock
    if (qty + others > p.stock) {
        notify(
            'Only ' + p.stock + ' pairs available.',
            'error'
        );

        renderCart();
        return;
    }

    // Update quantity
    item.qty = qty;

    saveCart();

    renderCart();
}




const cartTotal = () => {
    return cart.reduce(
        (sum, x) =>
            sum + (findProduct(x.id)?.price || 0) * x.qty,
        0
    );
};




function renderCart() {
    const list = document.getElementById('cart-items');

    const summary = document.getElementById('cart-total');

    if (!list || !summary) {
        return;
    }

    
    if (!cart.length) {
        list.innerHTML = `
            <div class="empty-state">
                <span class="eyebrow">
                    YOUR BAG
                </span>

                <h2>Your bag is waiting.</h2>

                <p>
                    Find something you love and bring it along.
                </p>

                <a class="button" href="products.html">
                    Explore the collection ↗
                </a>
            </div>
        `;

        summary.innerHTML = '';

        return;
    }

    
    list.innerHTML = cart.map((x) => {
        const p = findProduct(x.id);

        const key = `${x.id}-${x.size}`;

        return `
            <article class="cart-item">

                <img
                    src="${p.image}"
                    alt="${p.name}"
                >

                <div class="cart-info">

                    <span class="eyebrow">
                        ${p.brand}
                    </span>

                    <h3>${p.name}</h3>

                    <p>
                        EU size ${x.size} ·
                        ${money(p.price)} each
                    </p>

                    <button
                        class="text-button"
                        onclick="removeFromCart(${x.id}, ${x.size})"
                    >
                        Remove item
                    </button>

                </div>

                <div class="cart-qty">

                    <label for="qty-${key}">
                        Quantity
                    </label>

                    <input
                        id="qty-${key}"
                        type="number"
                        min="1"
                        max="99"
                        value="${x.qty}"
                        onchange="updateQty(${x.id}, ${x.size}, this.value)"
                    >

                    <strong>
                        ${money(p.price * x.qty)}
                    </strong>

                </div>

            </article>
        `;
    }).join('');

      
    summary.innerHTML = `
        <div class="summary">

            <h2>Order summary</h2>

            <div class="summary-row">

                <span>
                    ${cart.reduce((n, x) => n + x.qty, 0)} item(s)
                </span>

                <strong>
                    ${money(cartTotal())}
                </strong>

            </div>

            <div class="summary-row">

                <span>Shipping</span>

                <span>Complimentary</span>

            </div>

            <div class="summary-row grand">

                <span>Estimated total</span>

                <strong>
                    ${money(cartTotal())}
                </strong>

            </div>

            <a
                class="button wide"
                href="checkout.html"
            >
                Secure demo checkout ↗
            </a>

            <p class="small-note">
                Academic simulation · No real payment or shipping.
            </p>

        </div>
    `;
}


document.addEventListener(
    'DOMContentLoaded',
    updateCartBadge
);