const products = [
 {id:1,name:"Air Max 90",brand:"Nike",price:120,category:"Running",description:"Classic Air Max-inspired comfort and everyday styling.",sizes:[38,39,40,41,42,43],image:"images/airmax90.svg"},
 {id:2,name:"Ultraboost 22",brand:"Adidas",price:150,category:"Running",description:"Responsive cushioning for an active day.",sizes:[39,40,41,42,44],image:"images/ultraboost22.svg"},
 {id:3,name:"Chuck Taylor",brand:"Converse",price:70,category:"Casual",description:"Timeless casual high-top styling.",sizes:[38,39,40,41,42],image:"images/chucktaylor.svg"}
];
const money=n=>'$'+Number(n).toFixed(2);
const card=p=>`<article class="product-card"><a href="product.html?id=${p.id}"><img src="${p.image}" alt="Illustration of ${p.name}"></a><div class="card-body"><span class="eyebrow">${p.brand} · ${p.category}</span><h3>${p.name}</h3><div class="card-bottom"><strong>${money(p.price)}</strong><a class="button small" href="product.html?id=${p.id}">View details →</a></div></div></article>`;
