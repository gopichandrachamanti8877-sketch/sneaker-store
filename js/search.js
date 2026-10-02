function searchProducts() {
  const query = document.getElementById("search").value.toLowerCase();
  const results = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.brand.toLowerCase().includes(query)
  );

  renderProducts(results);

  const msg = document.getElementById("no-results");
  msg.style.display = results.length === 0 ? "block" : "none";
}

function clearSearch() {
  document.getElementById("search").value = "";
  renderProducts(products);
  document.getElementById("no-results").style.display = "none";
}
