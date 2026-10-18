document.addEventListener('DOMContentLoaded',()=>{if(!currentUser()){location.replace('login.html?next=checkout');return}if(!cart.length){location.replace('cart.html');return}document.getElementById('checkout-total').textContent=money(cartTotal());document.getElementById('checkout-email').textContent=currentUser().email;});
function submitOrder(e){e.preventDefault();const f=e.target;const name=f.fullname.value.trim(),email=f.email.value.trim(),address=f.address.value.trim(),city=f.city.value.trim(),zip=f.zip.value.trim(),country=f.country.value.trim();
 if(name.length<2||!emailValid(email)||address.length<5||city.length<2||zip.length<3||country.length<2){showError('form-error','Please complete all fields with valid information.');return}
 if(!currentUser()||!cart.length){showError('form-error','Please log in and add items before checkout.');return}
 const order={id:'SNK-'+Date.now().toString(36).toUpperCase(),items:cart.map(x=>({...x})),total:cartTotal(),date:new Date().toISOString(),customer:currentUser().email};
 localStorage.setItem('sneaker_last_demo_order',JSON.stringify(order));cart=[];saveCart();location.href='success.html';}
