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

const productList = document.getElementById("product-list");
const filterBar = document.getElementById("filter-bar");

const categories = ["All", ...new Set(products.map((p) => p.category))];
let activeCategory = "All";

function createOrderLink(productName) {
  const message = `Hi Mom & Sons Farm, I'd like to order: ${productName}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

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
              ${
          product.image
            ? `<img class="product-image" src="${product.image}" alt="${product.name} at Mom &amp; Sons Farm" loading="lazy" />`
            : `<div class="product-emoji">${product.emoji}</div>`
        }
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">${product.price}</p>
        <a class="btn" href="${createOrderLink(product.name)}" target="_blank" rel="noopener">
          Order on WhatsApp
        </a>
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

renderFilters();
renderProducts();