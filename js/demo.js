document.addEventListener("DOMContentLoaded", function () {
  const categoryLinks = document.querySelectorAll(".categories a");
  const productsContainer = document.getElementById("products");
  const languageSelect = document.getElementById("languageSelect");
  let currentLanguage = "en";
  let productsData = {};

  fetch("../json/products.json")
    .then(response => response.json())
    .then(data => {
      productsData = data;
      updateCategoryLabels();
      loadProducts("starters");
    });

  categoryLinks.forEach(link => {
    link.addEventListener("click", function () {
      categoryLinks.forEach(el => el.classList.remove("active"));
      this.classList.add("active");
      const selectedCategory = this.getAttribute("data-category");
      loadProducts(selectedCategory);
    });
  });

  if (languageSelect) {
    languageSelect.addEventListener("change", function () {
      currentLanguage = this.value;
      updateCategoryLabels();
      const activeCategory = document.querySelector(".categories a.active").getAttribute("data-category");
      loadProducts(activeCategory);
    });
  }

  function updateCategoryLabels() {
    categoryLinks.forEach(link => {
      const category = link.getAttribute("data-category");
      const translatedLabel =
        productsData.categoryLabels?.[category]?.[currentLanguage] ||
        productsData.categoryLabels?.[category]?.["en"] ||
        category;
      link.textContent = translatedLabel;
    });
  }

  function loadProducts(category) {
    productsContainer.innerHTML = "";
    document.querySelector(".container-inner").scrollTop = 0; // ✅ Scroll to top when switching categories

    if (!productsData[category]) return;

    productsData[category].forEach(product => {
      const title = product.title?.[currentLanguage] || product.title?.["en"] || "";
      const description = product.description?.[currentLanguage] || product.description?.["en"] || "";
      const allergensTitle = product.allergensTitle?.[currentLanguage] || product.allergensTitle?.["en"] || "";
      const allergens = product.allergens?.[currentLanguage] || product.allergens?.["en"] || "";

      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <div class="product-card-image">
          <img src="../img/${product.image}" alt="${title}" loading="lazy">
        </div>
        <div class="product-card-description">
          <p class="product-card-title fw-bold heading-font">${title}</p>
          <p class="product-card-price">${product.price}</p>
          <p class="product-card-description-text secondary-text mb-2">${description}</p>
          <p class="product-card-allergens-title fw-bold mb-1">${allergensTitle}</p>
          <p class="product-card-allergens-text secondary-text">${allergens}</p>
        </div>
      `;

      productsContainer.appendChild(card);
    });
  }
});


//

window.addEventListener('resize', () => {
  document.querySelector('#demo .container').style.height = `${window.innerHeight}px`;
});