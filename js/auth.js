/* Demo-only local authentication. Not secure for production use. */
const USERS_KEY='sneaker_demo_users_v2', SESSION_KEY='sneaker_demo_session_v2';
const getUsers=()=>{try{return JSON.parse(localStorage.getItem(USERS_KEY))||[]}catch{return []}};
const currentUser=()=>{try{return JSON.parse(sessionStorage.getItem(SESSION_KEY))}catch{return null}};
const showError=(id,msg)=>{const e=document.getElementById(id);if(e){e.textContent=msg;e.hidden=!msg}};
const emailValid=s=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
async function hashPassword(password,salt){const data=new TextEncoder().encode(salt+':'+password);const digest=await crypto.subtle.digest('SHA-256',data);return Array.from(new Uint8Array(digest)).map(x=>x.toString(16).padStart(2,'0')).join('')}
async function register(event){event.preventDefault();const f=event.target,name=f.name.value.trim(),email=f.email.value.trim().toLowerCase(),password=f.password.value,confirm=f.confirm.value;
 if(name.length<2)return showError('form-error','Enter your full name (at least 2 characters).');
 if(!emailValid(email))return showError('form-error','Enter a valid email address.');
 if(password.length<8)return showError('form-error','Password must be at least 8 characters.');
 if(password!==confirm)return showError('form-error','Passwords do not match.');
 const users=getUsers();if(users.some(u=>u.email===email))return showError('form-error','An account with this email already exists.');
 const salt=crypto.randomUUID(),hash=await hashPassword(password,salt);users.push({name,email,salt,hash});localStorage.setItem(USERS_KEY,JSON.stringify(users));sessionStorage.setItem(SESSION_KEY,JSON.stringify({name,email}));location.href='index.html';}
async function login(event){event.preventDefault();const f=event.target,email=f.email.value.trim().toLowerCase(),password=f.password.value;
 const u=getUsers().find(x=>x.email===email);if(!u||await hashPassword(password,u.salt)!==u.hash)return showError('form-error','Invalid email or password.');
 sessionStorage.setItem(SESSION_KEY,JSON.stringify({name:u.name,email:u.email}));const next=new URLSearchParams(location.search).get('next');location.href=next==='checkout'?'checkout.html':'index.html';}
function logout(){sessionStorage.removeItem(SESSION_KEY);location.href='index.html'}
function renderAuth(){const e=document.getElementById('auth-links');if(!e)return;const u=currentUser();e.innerHTML=u?`<span class="greeting">Hi, ${escapeText(u.name.split(' ')[0])}</span><button class="nav-button" onclick="logout()">Log out</button>`:'<a href="login.html">Log in</a><a class="nav-signup" href="register.html">Sign up</a>'}
function escapeText(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
document.addEventListener('DOMContentLoaded',renderAuth);
