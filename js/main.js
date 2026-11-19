const WHATSAPP_NUMBER = "254797857428";

const products = [
  {
    name: "Kienyeji Chicken",
    emoji: "🐓",
    image: "images/kienyeji-chicken.webp",
    category: "Poultry",
    description: "Free-range farm-raised chicken, sold live or dressed.",
    price: "KSh 1,000 each",
  },
  {
    name: "Broiler Chicken",
    emoji: "🍗",
    image: "images/broiler-chicken.webp",
    category: "Poultry",
    description: "Fast-growing broilers, raised on the farm.",
    price: "KSh 500 per hen",
  },
  {
    name: "Day-Old Chicks",
    emoji: "🐥",
    image: "images/day-old-chicks.webp",
    category: "Poultry",
    description: "Healthy kienyeji day-old chicks for your own farm.",
    price: "Ask for price",
  },
  {
    name: "Geese",
    emoji: "🦆",
    image: "images/geese.webp",
    category: "Poultry",
    description: "Farm-raised geese, great for the festive season.",
    price: "Ask for price",
  },
  {
    name: "Kienyeji Eggs",
    emoji: "🥚",
    image: "images/kienyeji-eggs.webp",
    category: "Dairy & Eggs",
    description: "Rich-yolk kienyeji eggs from free-range hens. Sold by the tray.",
    price: "KSh 600 per tray",
  },
  {
    name: "Layer Eggs",
    emoji: "🥚",
    image: "images/eggs.webp",
    category: "Dairy & Eggs",
    description: "Fresh layer eggs collected daily. Sold by the tray.",
    price: "KSh 450 per tray",
  },
  {
    name: "Fresh Milk",
    emoji: "🥛",
    image: "images/milk.webp",
    category: "Dairy & Eggs",
    description: "Fresh cow milk, delivered chilled.",
    price: "KSh 70 per litre",
  },
  {
    name: "Pigs",
    emoji: "🐖",
    image: "images/pigs.webp",
    category: "Livestock",
    description: "Healthy pigs for meat or breeding.",
    price: "Ask for price",
  },
  {
    name: "Goat",
    emoji: "🐐",
    image: "images/goat.webp",
    category: "Livestock",
    description: "Healthy goats for meat or breeding, ready for events.",
    price: "Ask for price",
  },
  {
    name: "Sheep & Mutton",
    emoji: "🐑",
    image: "images/sheep.webp",
    category: "Livestock",
    description: "Live sheep or fresh mutton, perfect for celebrations.",
    price: "Ask for price",
  },
  {
    name: "Rabbits",
    emoji: "🐇",
    image: "images/rabbits.webp",
    category: "Livestock",
    description: "Live rabbits for meat or breeding.",
    price: "KSh 1,500 each",
  },
  {
    name: "Fresh Kales (Sukuma Wiki)",
    emoji: "🥬",
    image: "images/kales.webp",
    category: "Farm Produce",
    description: "Freshly picked kales, straight from the farm.",
    price: "KSh 100 per kg",
  },
  {
    name: "Cabbage",
    emoji: "🥬",
    image: "images/cabbage.webp",
    category: "Farm Produce",
    description: "Fresh, firm cabbages from our farm.",
    price: "KSh 40 per kg",
  },
  {
    name: "Bell Peppers",
    emoji: "🫑",
    image: "images/bell-papers.webp",
    category: "Farm Produce",
    description: "Fresh bell peppers, picked when ordered.",
    price: "KSh 70 per kg",
  },
  {
    name: "Carrots",
    emoji: "🥕",
    image: "images/carrots.webp",
    category: "Farm Produce",
    description: "Fresh, crunchy carrots from the farm.",
    price: "KSh 80 per kg",
  },
  {
    name: "Chick Mash",
    emoji: "🌾",
    image: "images/chickmash.webp",
    category: "Farm Supplies",
    description: "Quality chick mash for your growing chicks. 50 kg bag.",
    price: "KSh 4,700 per 50 kg",
  },
  {
    name: "Chicken Manure",
    emoji: "🌱",
    image: "images/chicken-manure.webp",
    category: "Farm Supplies",
    description: "Well-dried chicken manure, great for boosting your crops and kitchen garden.",
    price: "KSh 15,000 per tonne",
  },
];

/* ---------- Page elements ---------- */
const productList = document.getElementById("product-list");
const filterBar = document.getElementById("filter-bar");
const cartBtn = document.getElementById("cart-btn");
const cartCountEl = document.getElementById("cart-count");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const cartClose = document.getElementById("cart-close");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartNoteEl = document.getElementById("cart-note");
const cartCheckout = document.getElementById("cart-checkout");

const categories = ["All", ...new Set(products.map((p) => p.category))];
let activeCategory = "All";

/* ---------- Cart ---------- */
// The cart: product name -> quantity
const cart = {};

function findProduct(name) {
  return products.find((p) => p.name === name);
}

// Pulls the number out of a price like "KSh 1,000 each". Returns null for "Ask for price".
function getAmount(product) {
  const match = product.price.match(/KSh\s*([\d,]+)/);
  return match ? Number(match[1].replace(/,/g, "")) : null;
}

function formatKsh(amount) {
  return "KSh " + amount.toLocaleString("en-US");
}

function getCartSummary() {
  let total = 0;
  let hasUnpriced = false;

  Object.entries(cart).forEach(([name, qty]) => {
    const amount = getAmount(findProduct(name));
    if (amount === null) {
      hasUnpriced = true;
    } else {
      total += amount * qty;
    }
  });

  return { total, hasUnpriced };
}

function renderCart() {
  const entries = Object.entries(cart);
  const count = entries.reduce((sum, [, qty]) => sum + qty, 0);
  cartCountEl.textContent = count;

  if (entries.length === 0) {
    cartItemsEl.innerHTML = `<p class="cart-empty">Your cart is empty. Tap "Quick Add" on any product.</p>`;
  } else {
    cartItemsEl.innerHTML = entries
      .map(([name, qty]) => {
        const product = findProduct(name);
        const thumb = product.image
          ? `<img class="cart-thumb" src="${product.image}" alt="" />`
          : `<div class="cart-thumb cart-thumb-emoji">${product.emoji}</div>`;

        return `
          <div class="cart-item">
            ${thumb}
            <div>
              <p class="cart-item-name">${name}</p>
              <p class="cart-item-price">${product.price}</p>
              <button class="cart-remove" data-action="remove" data-name="${name}">Remove</button>
            </div>
            <div class="qty">
              <button class="qty-btn" data-action="dec" data-name="${name}" aria-label="One less ${name}">−</button>
              <span class="qty-num">${qty}</span>
              <button class="qty-btn" data-action="inc" data-name="${name}" aria-label="One more ${name}">+</button>
            </div>
          </div>
        `;
      })
      .join("");
  }

  const { total, hasUnpriced } = getCartSummary();
  cartTotalEl.textContent = formatKsh(total);
  cartNoteEl.textContent = hasUnpriced
    ? "Items marked “Ask for price” are not in the total. We’ll confirm their prices on WhatsApp."
    : "";
  cartCheckout.disabled = entries.length === 0;
}

function openCart() {
  cartDrawer.inert = false;
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
  cartDrawer.inert = true;
  document.body.style.overflow = "";
}

cartBtn.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeCart();
});

// + / - / Remove buttons inside the cart
cartItemsEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const name = button.dataset.name;
  const action = button.dataset.action;

  if (action === "inc" && cart[name] < 99) cart[name] += 1;
  if (action === "dec") {
    cart[name] -= 1;
    if (cart[name] <= 0) delete cart[name];
  }
  if (action === "remove") delete cart[name];

  renderCart();
});

// Send the whole cart to WhatsApp as one message
cartCheckout.addEventListener("click", () => {
  const lines = Object.entries(cart).map(
    ([name, qty]) => `- ${qty} x ${name} (${findProduct(name).price})`
  );
  const { total, hasUnpriced } = getCartSummary();

  let message = `Hi Mother & Sons Farm, I'd like to order:\n${lines.join("\n")}`;
  if (total > 0) message += `\nEstimated total: ${formatKsh(total)}`;
  if (hasUnpriced) message += `\n(Some items need a price quote.)`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
});

/* ---------- Products ---------- */
function renderFilters() {
  filterBar.innerHTML = categories
    .map(
      (category) => `
      <button class="filter-btn ${category === activeCategory ? "active" : ""}"
              data-category="${category}">
        ${category}
      </button>
    `
    )
    .join("");
}

function renderProducts() {
  const visibleProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  productList.innerHTML = visibleProducts
    .map(
      (product) => `
      <article class="product-card">
        <div class="product-media">
          ${
            product.image
              ? `<img class="product-image" src="${product.image}" alt="${product.name} at Mother &amp; Sons Farm" loading="lazy" />`
              : `<div class="product-emoji">${product.emoji}</div>`
          }
          <div class="product-overlay">
            <button class="quick-add" data-name="${product.name}">Quick Add</button>
          </div>
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="product-desc">${product.description}</p>
          <p class="price">${product.price}</p>
        </div>
      </article>
    `
    )
    .join("");
}

filterBar.addEventListener("click", (event) => {
  const button = event.target.closest(".filter-btn");
  if (!button) return;

  activeCategory = button.dataset.category;
  renderFilters();
  renderProducts();
});

productList.addEventListener("click", (event) => {
  const button = event.target.closest(".quick-add");
  if (!button) return;

  const name = button.dataset.name;
  cart[name] = (cart[name] || 0) + 1;
  renderCart();

  button.textContent = "Added ✓";
  setTimeout(() => {
    button.textContent = "Quick Add";
  }, 1200);
});

cartDrawer.inert = true;
renderFilters();
renderProducts();
renderCart();

/* ---------- Hero animation ---------- */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Split the hero title into letters so each can animate on its own
let letterIndex = 0;
document.querySelectorAll(".hero-line").forEach((line) => {
  const text = line.textContent;
  line.textContent = "";

  for (const char of text) {
    if (char === " ") {
      line.append(" ");
      continue;
    }
    const span = document.createElement("span");
    span.className = "letter";
    span.textContent = char;
    span.setAttribute("aria-hidden", "true");
    span.style.setProperty("--i", letterIndex++);
    line.append(span);
  }
});

// Parallax: photos drift a little as you scroll
if (!reduceMotion) {
  const floaters = document.querySelectorAll(".float-wrap");
  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        floaters.forEach((el) => {
          el.style.transform = `translateY(${window.scrollY * Number(el.dataset.speed)}px)`;
        });
        ticking = false;
      });
    },
    { passive: true }
  );
}