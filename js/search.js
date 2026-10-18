function renderProducts(arr){document.getElementById('product-list').innerHTML=arr.map(card).join('');document.getElementById('no-results').hidden=arr.length!==0}
function searchProducts(){const q=document.getElementById('search').value.trim().toLowerCase();renderProducts(products.filter(p=>[p.name,p.brand,p.category].some(s=>s.toLowerCase().includes(q))))}
function clearSearch(){document.getElementById('search').value='';renderProducts(products)}
