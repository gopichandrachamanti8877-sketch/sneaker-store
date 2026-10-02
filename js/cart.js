let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveCart();
  alert("Added to cart!");
}

function removeFromCart(id) {
  cart = cart.filter(p => p.id !== id);
  saveCart();
  renderCart();
}

function updateQty(id, qty) {
  const item = cart.find(p => p.id === id);
  item.qty = qty;
  saveCart();
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const totalBox = document.getElementById("cart-total");

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalBox.innerHTML = "";
    return;
  }

  container.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    total += product.price * item.qty;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${product.image}" />
        <div>
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <input type="number" min="1" value="${item.qty}" 
            onchange="updateQty(${item.id}, this.value)">
          <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    `;
  });

  totalBox.innerHTML = `<h2>Total: $${total}</h2>`;
}
