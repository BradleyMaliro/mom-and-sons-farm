const WHATSAPP_NUMBER = "254700000000"; // replace with the real number later

const products = [
  {
    name: "Kienyeji Chicken",
    emoji: "🐓",
    description: "Free-range farm-raised chicken, sold live or dressed.",
    price: "KSh 1,000 each",
  },
  {
    name: "Fresh Eggs",
    emoji: "🥚",
    description: "Fresh layer eggs collected daily. Sold by the tray.",
    price: "KSh 450 per tray",
  },
  {
    name: "Pork",
    emoji: "🐖",
    description: "Fresh pork from our own pigs, cut to order.",
    price: "KSh 600 per kg",
  },
  {
    name: "Goat",
    emoji: "🐐",
    description: "Healthy goats for meat or breeding, ready for events.",
    price: "Ask for price",
  },
  {
    name: "Sheep & Mutton",
    emoji: "🐑",
    description: "Live sheep or fresh mutton, perfect for celebrations.",
    price: "Ask for price",
  },
  {
    name: "Fresh Milk",
    emoji: "🥛",
    description: "Fresh cow milk, delivered chilled.",
    price: "KSh 70 per litre",
  },
  {
    name: "Rabbits",
    emoji: "🐇",
    description: "Live rabbits for meat or breeding.",
    price: "KSh 1,500 each",
  },
  {
    name: "Geese",
    emoji: "🦆",
    description: "Farm-raised geese, great for the festive season.",
    price: "Ask for price",
  },  {
    name: "Day-Old Chicks",
    emoji: "🐥",
    description: "Healthy kienyeji day-old chicks for your own farm.",
    price: "Ask for price",
  },
];

const productList = document.getElementById("product-list");

function createOrderLink(productName) {
  const message = `Hi Mom & Sons Farm, I'd like to order: ${productName}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderProducts() {
  productList.innerHTML = products
    .map(
      (product) => `
      <article class="product-card">
        <div class="product-emoji">${product.emoji}</div>
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

renderProducts();