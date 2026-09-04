// Simple SPA with Hash Routing + LocalStorage Cart
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
const PRODUCTS = [
  {
    id: 'aro-lavender', name: 'Lavender', category: 'Aromatic Plants',
    price: 7.99, img: 'assets/lavender.jpg',
    desc: 'Soothing fragrance; great for bedrooms and balconies.'
  },
  {
    id: 'aro-jasmine', name: 'Jasmine', category: 'Aromatic Plants',
    price: 8.49, img: 'assets/jasmine.jpg',
    desc: 'Sweet floral scent that freshens your home.'
  },
  {
    id: 'med-aloevera', name: 'Aloe Vera', category: 'Medicinal Plants',
    price: 6.49, img: 'assets/aloe.jpg',
    desc: 'Succulent with skin-soothing gel and low maintenance.'
  },
  {
    id: 'med-tulsi', name: 'Tulsi (Holy Basil)', category: 'Medicinal Plants',
    price: 5.99, img: 'assets/tulsi.jpg',
    desc: 'Traditional herb known for wellness benefits.'
  },
  {
    id: 'med-mint', name: 'Mint', category: 'Medicinal Plants',
    price: 4.99, img: 'assets/mint.jpg',
    desc: 'Refreshing herb for teas and garnishes.'
  },
  {
    id: 'aro-rosemary', name: 'Rosemary', category: 'Aromatic Plants',
    price: 7.49, img: 'assets/rosemary.jpg',
    desc: 'Piney aroma; perfect for kitchens and windowsills.'
  }
];
const CART_KEY = 'paradise_cart_v1';
const loadCart = () => JSON.parse(localStorage.getItem(CART_KEY) || '{}');
const saveCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));
const cartCount = (cart) => Object.values(cart).reduce((a,b)=>a+b,0);
const cartItems = (cart) =>
  Object.entries(cart).map(([id, qty]) => ({ ...PRODUCTS.find(p=>p.id===id), qty }));
function setCartCount() {
  const count = cartCount(loadCart());
  $('#cart-count').textContent = count;
}
function currency(n){ return '₹ ' + n.toFixed(2) }
function addToCart(id){
  const cart = loadCart();
  cart[id] = (cart[id] || 0) + 1;
  saveCart(cart);
  setCartCount();
}
function removeOne(id){
  const cart = loadCart();
  if(!cart[id]) return;
  cart[id] = Math.max(0, cart[id]-1);
  if(cart[id] === 0) delete cart[id];
  saveCart(cart);
  setCartCount();
}
function removeAll(id){
  const cart = loadCart();
  delete cart[id];
  saveCart(cart);
  setCartCount();
}
function clearCart(){
  saveCart({});
  setCartCount();
}

function route(){
  const hash = location.hash || '#/';
  if(hash.startsWith('#/products')) renderProducts();
  else if(hash.startsWith('#/cart')) renderCart();
  else renderLanding();
}

function renderLanding(){
  $('#app').innerHTML = `
    <section class="container">
      <div class="hero">
        <div>
          <h1>Welcome to Paradise Nursery 🌿</h1>
          <p>Discover aromatic and medicinal house plants that brighten your home,
             boost wellness, and smell amazing. Carefully curated, easy to care for, and delivered fresh.</p>
          <button class="btn" onclick="location.hash='#/products'">Shop Now</button>
        </div>
        <img src="assets/hero.jpg" alt="Plants" style="width:100%;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.06)"/>
      </div>

      <div class="section">
        <h2>Why House Plants?</h2>
        <p>Plants can improve air quality, reduce stress, and make any room feel more alive.
           Start with low-maintenance herbs like Aloe, Mint, and Tulsi, or elevate the ambiance with Lavender and Jasmine.</p>
      </div>
    </section>
  `;
}

function productCard(p){
  return `
    <article class="card">
      <img src="${p.img}" alt="${p.name}"/>
      <div class="content">
        <div class="title">${p.name}</div>
        <div class="desc">${p.desc}</div>
        <div class="price">${currency(p.price)}</div>
        <div class="actions">
          <button class="btn" onclick="addToCart('${p.id}')">Add to Cart</button>
          <button class="btn ghost" onclick="location.hash='#/cart'">Go to Cart</button>
        </div>
      </div>
    </article>
  `;
}

function renderProducts(){
  const aromatic = PRODUCTS.filter(p=>p.category==='Aromatic Plants');
  const medicinal = PRODUCTS.filter(p=>p.category==='Medicinal Plants');

  $('#app').innerHTML = `
    <section class="container">
      <div class="section">
        <h2>Aromatic Plants</h2>
        <p class="muted">Fragrant companions like Lavender, Jasmine, and Rosemary elevate your mood and space.</p>
        <div class="grid">
          ${aromatic.map(productCard).join('')}
        </div>
      </div>

      <div class="section">
        <h2>Medicinal Plants</h2>
        <p class="muted">Practical wellness heroes—Aloe, Tulsi, and Mint—easy to grow and useful every day.</p>
        <div class="grid">
          ${medicinal.map(productCard).join('')}
        </div>
      </div>
    </section>
  `;
}

function cartItemRow(item){
  const subtotal = item.price * item.qty;
  return `
    <div class="cart-card">
      <img src="${item.img}" alt="${item.name}"/>
      <div>
        <div style="font-weight:800">${item.name}</div>
        <div class="muted">Unit: ${currency(item.price)}</div>
        <div class="muted">Subtotal: <b>${currency(subtotal)}</b></div>
        <div class="qty" style="margin-top:8px">
          <button onclick="removeOne('${item.id}')">−</button>
          <span>${item.qty}</span>
          <button onclick="addToCart('${item.id}')">+</button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end">
        <button class="btn" onclick="addToCart('${item.id}')">Add one</button>
        <button class="btn ghost" onclick="removeAll('${item.id}')">Delete</button>
      </div>
    </div>
  `;
}

function renderCart(){
  const items = cartItems(loadCart());
  const total = items.reduce((sum,i)=>sum + i.price*i.qty, 0);

  $('#app').innerHTML = `
    <section class="container">
      <h2>Your Cart</h2>
      ${items.length===0 ? `
        <div class="empty">Your cart is empty. Explore our plants and add your favorites!</div>
        <div style="margin-top:12px">
          <button class="btn" onclick="location.hash='#/products'">Continue Shopping</button>
        </div>
      ` : `
        <div class="cart-list">
          ${items.map(cartItemRow).join('')}
        </div>
        <div class="cart-summary">
          <div class="muted">Total</div>
          <div style="font-weight:900">${currency(total)}</div>
        </div>
        <div style="display:flex; gap:10px; margin-top:10px">
          <button class="btn" onclick="location.hash='#/products'">Continue Shopping</button>
          <button class="btn secondary" onclick="checkout()">Checkout</button>
        </div>
      `}
    </section>
  `;
}

function checkout(){
  const items = cartItems(loadCart());
  if(items.length===0){
    alert('Your cart is empty.');
    return;
  }
  const summary = items.map(i => `${i.name} × ${i.qty} = ${currency(i.qty*i.price)}`).join('\n');
  alert('Thank you for shopping at Paradise Nursery!\n\n' + summary);
  clearCart();
  route(); // re-render
}

window.addEventListener('hashchange', () => { route(); });
window.addEventListener('DOMContentLoaded', () => {
  setCartCount();
  $('#year').textContent = new Date().getFullYear();
  route();
});
