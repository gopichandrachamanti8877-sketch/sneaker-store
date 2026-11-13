// Sprint 3 curated demo catalogue. All product artwork is original illustrative SVG.
const products = [
  {
    "id": 1,
    "name": "Air Max 90",
    "brand": "Nike",
    "price": 129,
    "category": "Lifestyle",
    "description": "Air Max 90 combines considered comfort with unmistakable Nike style. A versatile pick for your everyday rotation.",
    "sizes": [
      38,
      39,
      40,
      41,
      42,
      43,
      44
    ],
    "image": "images/sneaker-01.svg",
    "stock": 20,
    "badge": "BESTSELLER"
  },
  {
    "id": 2,
    "name": "Ultraboost 22",
    "brand": "Adidas",
    "price": 169,
    "category": "Running",
    "description": "Ultraboost 22 combines considered comfort with unmistakable Adidas style. A versatile pick for your everyday rotation.",
    "sizes": [
      38,
      39,
      40,
      41,
      42,
      43,
      44
    ],
    "image": "images/sneaker-02.svg",
    "stock": 20,
    "badge": "BESTSELLER"
  },
  {
    "id": 3,
    "name": "Chuck Taylor High",
    "brand": "Converse",
    "price": 79,
    "category": "Casual",
    "description": "Chuck Taylor High combines considered comfort with unmistakable Converse style. A versatile pick for your everyday rotation.",
    "sizes": [
      38,
      39,
      40,
      41,
      42,
      43,
      44
    ],
    "image": "images/sneaker-03.svg",
    "stock": 20,
    "badge": "CURATED"
  },
  {
    "id": 4,
    "name": "Air Force 1",
    "brand": "Nike",
    "price": 119,
    "category": "Lifestyle",
    "description": "Air Force 1 combines considered comfort with unmistakable Nike style. A versatile pick for your everyday rotation.",
    "sizes": [
      38,
      39,
      40,
      41,
      42,
      43,
      44
    ],
    "image": "images/sneaker-04.svg",
    "stock": 20,
    "badge": "BESTSELLER"
  },
  {
    "id": 5,
    "name": "Samba OG",
    "brand": "Adidas",
    "price": 109,
    "category": "Lifestyle",
    "description": "Samba OG combines considered comfort with unmistakable Adidas style. A versatile pick for your everyday rotation.",
    "sizes": [
      38,
      39,
      40,
      41,
      42,
      43,
      44
    ],
    "image": "images/sneaker-05.svg",
    "stock": 20,
    "badge": "CURATED"
  },
  {
    "id": 6,
    "name": "Old Skool",
    "brand": "Vans",
    "price": 85,
    "category": "Skate",
    "description": "Old Skool combines considered comfort with unmistakable Vans style. A versatile pick for your everyday rotation.",
    "sizes": [
      38,
      39,
      40,
      41,
      42,
      43,
      44
    ],
    "image": "images/sneaker-06.svg",
    "stock": 3,
    "badge": "CURATED"
  },
  {
    "id": 7,
    "name": "Gel-Kayano 30",
    "brand": "ASICS",
    "price": 179,
    "category": "Running",
    "description": "Gel-Kayano 30 combines considered comfort with unmistakable ASICS style. A versatile pick for your everyday rotation.",
    "sizes": [
      38,
      39,
      40,
      41,
      42,
      43,
      44
    ],
    "image": "images/sneaker-07.svg",
    "stock": 20,
    "badge": "CURATED"
  },
  {
    "id": 8,
    "name": "Classic Leather",
    "brand": "Reebok",
    "price": 99,
    "category": "Lifestyle",
    "description": "Classic Leather combines considered comfort with unmistakable Reebok style. A versatile pick for your everyday rotation.",
    "sizes": [
      38,
      39,
      40,
      41,
      42,
      43,
      44
    ],
    "image": "images/sneaker-08.svg",
    "stock": 0,
    "badge": "CURATED"
  },
  {
    "id": 9,
    "name": "574 Core",
    "brand": "New Balance",
    "price": 115,
    "category": "Lifestyle",
    "description": "574 Core combines considered comfort with unmistakable New Balance style. A versatile pick for your everyday rotation.",
    "sizes": [
      38,
      39,
      40,
      41,
      42,
      43,
      44
    ],
    "image": "images/sneaker-09.svg",
    "stock": 20,
    "badge": "CURATED"
  },
  {
    "id": 10,
    "name": "Suede Classic",
    "brand": "Puma",
    "price": 89,
    "category": "Casual",
    "description": "Suede Classic combines considered comfort with unmistakable Puma style. A versatile pick for your everyday rotation.",
    "sizes": [
      38,
      39,
      40,
      41,
      42,
      43,
      44
    ],
    "image": "images/sneaker-10.svg",
    "stock": 20,
    "badge": "CURATED"
  },
  {
    "id": 11,
    "name": "Pegasus 41",
    "brand": "Nike",
    "price": 145,
    "category": "Running",
    "description": "Pegasus 41 combines considered comfort with unmistakable Nike style. A versatile pick for your everyday rotation.",
    "sizes": [
      38,
      39,
      40,
      41,
      42,
      43,
      44
    ],
    "image": "images/sneaker-11.svg",
    "stock": 20,
    "badge": "CURATED"
  },
  {
    "id": 12,
    "name": "Campus 00s",
    "brand": "Adidas",
    "price": 105,
    "category": "Skate",
    "description": "Campus 00s combines considered comfort with unmistakable Adidas style. A versatile pick for your everyday rotation.",
    "sizes": [
      38,
      39,
      40,
      41,
      42,
      43,
      44
    ],
    "image": "images/sneaker-12.svg",
    "stock": 3,
    "badge": "CURATED"
  },
  {
    "id": 13,
    "name": "Chuck Taylor Low",
    "brand": "Converse",
    "price": 69,
    "category": "Casual",
    "description": "Chuck Taylor Low combines considered comfort with unmistakable Converse style. A versatile pick for your everyday rotation.",
    "sizes": [
      38,
      39,
      40,
      41,
      42,
      43,
      44
    ],
    "image": "images/sneaker-13.svg",
    "stock": 20,
    "badge": "CURATED"
  },
  {
    "id": 14,
    "name": "Slip-On Checker",
    "brand": "Vans",
    "price": 75,
    "category": "Skate",
    "description": "Slip-On Checker combines considered comfort with unmistakable Vans style. A versatile pick for your everyday rotation.",
    "sizes": [
      38,
      39,
      40,
      41,
      42,
      43,
      44
    ],
    "image": "images/sneaker-14.svg",
    "stock": 0,
    "badge": "NEW DROP"
  },
  {
    "id": 15,
    "name": "Gel-Nimbus 26",
    "brand": "ASICS",
    "price": 189,
    "category": "Running",
    "description": "Gel-Nimbus 26 combines considered comfort with unmistakable ASICS style. A versatile pick for your everyday rotation.",
    "sizes": [
      38,
      39,
      40,
      41,
      42,
      43,
      44
    ],
    "image": "images/sneaker-15.svg",
    "stock": 20,
    "badge": "NEW DROP"
  },
  {
    "id": 16,
    "name": "327 Retro",
    "brand": "New Balance",
    "price": 125,
    "category": "Lifestyle",
    "description": "327 Retro combines considered comfort with unmistakable New Balance style. A versatile pick for your everyday rotation.",
    "sizes": [
      38,
      39,
      40,
      41,
      42,
      43,
      44
    ],
    "image": "images/sneaker-16.svg",
    "stock": 20,
    "badge": "NEW DROP"
  },
  {
    "id": 17,
    "name": "Club C 85",
    "brand": "Reebok",
    "price": 95,
    "category": "Casual",
    "description": "Club C 85 combines considered comfort with unmistakable Reebok style. A versatile pick for your everyday rotation.",
    "sizes": [
      38,
      39,
      40,
      41,
      42,
      43,
      44
    ],
    "image": "images/sneaker-17.svg",
    "stock": 20,
    "badge": "NEW DROP"
  },
  {
    "id": 18,
    "name": "RS-X Reinvention",
    "brand": "Puma",
    "price": 135,
    "category": "Lifestyle",
    "description": "RS-X Reinvention combines considered comfort with unmistakable Puma style. A versatile pick for your everyday rotation.",
    "sizes": [
      38,
      39,
      40,
      41,
      42,
      43,
      44
    ],
    "image": "images/sneaker-18.svg",
    "stock": 20,
    "badge": "NEW DROP"
  }
];
const money = value => '$' + Number(value).toFixed(2);
const findProduct = id => products.find(p => p.id === Number(id));
function productCard(p) {
 const unavailable = p.stock === 0;
 return `<article class="product-card"><a class="product-image" href="product.html?id=${p.id}"><img loading="lazy" src="${p.image}" alt="Illustration of ${p.name}"><span class="card-tag">${p.badge}</span></a><div class="card-body"><div class="card-meta">${p.brand} <span>·</span> ${p.category}</div><h3><a href="product.html?id=${p.id}">${p.name}</a></h3><div class="card-bottom"><strong>${money(p.price)}</strong><span class="stock ${unavailable?'sold-out':''}">${unavailable?'Sold out':p.stock<=3?'Only '+p.stock+' left':'In stock'}</span></div><a class="button button-small ${unavailable?'button-muted':''}" href="product.html?id=${p.id}">${unavailable?'View product':'Shop now'} <span>↗</span></a></div></article>`;
}
