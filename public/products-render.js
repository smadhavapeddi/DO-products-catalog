// Renders the product catalog grid from GET /api/products, and wires each
// product's "Ask AI" / "Generate Icon" buttons to pre-fill (not auto-submit)
// the AI panels below — the catalog itself is static reference content.

async function renderCatalog() {
  const container = document.getElementById("categories");
  try {
    const res = await fetch("/api/products");
    const { categories } = await res.json();

    categories.forEach((cat) => {
      const card = document.createElement("div");
      card.className = "category-card";

      const title = document.createElement("h3");
      title.textContent = `${cat.icon} ${cat.category}`;
      card.appendChild(title);

      const blurb = document.createElement("p");
      blurb.className = "blurb";
      blurb.textContent = cat.blurb;
      card.appendChild(blurb);

      cat.items.forEach((item) => {
        const row = document.createElement("div");
        row.className = "product-row";

        const left = document.createElement("div");
        left.innerHTML = `<div class="product-name">${item.name}</div><div class="product-desc">${item.desc}</div>`;
        row.appendChild(left);

        const actions = document.createElement("div");
        actions.className = "product-actions";

        const askBtn = document.createElement("button");
        askBtn.textContent = "Ask AI";
        askBtn.addEventListener("click", () => {
          document.getElementById("chat-prompt").value =
            `In 2-3 sentences, explain DigitalOcean's ${item.name} and give one concrete use case.`;
          document.getElementById("chat-prompt").scrollIntoView({ behavior: "smooth", block: "center" });
        });

        const iconBtn = document.createElement("button");
        iconBtn.textContent = "Generate Icon";
        iconBtn.addEventListener("click", () => {
          document.getElementById("image-prompt").value =
            `A clean, modern flat icon representing DigitalOcean's "${item.name}" (${item.desc}), ocean-blue color palette, minimalist, on a white background`;
          document.getElementById("image-prompt").scrollIntoView({ behavior: "smooth", block: "center" });
        });

        actions.appendChild(askBtn);
        actions.appendChild(iconBtn);
        row.appendChild(actions);
        card.appendChild(row);
      });

      container.appendChild(card);
    });
  } catch (err) {
    container.textContent = "Could not load product catalog.";
  }
}

renderCatalog();
