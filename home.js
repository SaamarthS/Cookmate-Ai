// home.js — FINAL CookMate AI Version
// Features:
// ✅ Ingredient suggestions (2000+ fast search)
// ✅ Tile-based grocery storage
// ✅ 2 recipes per ingredient
// ✅ Slide-up fullscreen panel
// ✅ YouTube video + step instructions

/* ---------- ELEMENTS ---------- */
const searchInput = document.getElementById("searchInput");
const suggestionsEl = document.getElementById("suggestions");
const addBtn = document.getElementById("addBtn");
const removeBtn = document.getElementById("removeBtn");
const qtyInput = document.getElementById("qtyInput");
const groceryListEl = document.getElementById("groceryList");
const generateBtn = document.getElementById("generateBtn");
const recipeGrid = document.getElementById("recipeGrid");

const recipePanel = document.getElementById("recipePanel");
const closePanel = document.getElementById("closePanel");
const panelBody = document.getElementById("panelBody");

const STORAGE_KEY = "cookmate_grocery";
let grocery = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

/* ---------- HELPERS ---------- */
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c =>
    ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[c])
  );
}

function saveAndRender(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(grocery));
  renderGrocery();
}

/* ---------- GROCERY TILE RENDER ---------- */
function renderGrocery(){
  if (!grocery.length){
    groceryListEl.innerHTML = "<div style='color:var(--muted);'>No items yet.</div>";
    return;
  }

  groceryListEl.innerHTML = "";

  grocery.forEach((g, idx) => {
    const tile = document.createElement("div");
    tile.className = "grocery-tile";
    tile.dataset.index = idx;

    tile.innerHTML = `
      <div class="grocery-title">${escapeHtml(g.name)}</div>
      <div class="grocery-qty">Qty: ${escapeHtml(g.qty)} g</div>
      <button class="grocery-remove-btn">Remove</button>
    `;

    tile.querySelector(".grocery-remove-btn").onclick = () => {
      grocery.splice(idx, 1);
      saveAndRender();
    };

    groceryListEl.appendChild(tile);
  });
}

/* ---------- INGREDIENT SUGGESTIONS ---------- */
searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();

  if (!q){
    suggestionsEl.classList.add("hidden");
    return;
  }

  // MATCH from ingredients.js
  const matches = INGREDIENTS
    .filter(i => i.toLowerCase().includes(q))
    .slice(0, 10);

  if (!matches.length){
    suggestionsEl.classList.add("hidden");
    return;
  }

  suggestionsEl.innerHTML = matches.map(m => `<li>${escapeHtml(m)}</li>`).join("");
  suggestionsEl.classList.remove("hidden");

  document.querySelectorAll("#suggestions li").forEach(li => {
    li.onclick = () => {
      searchInput.value = li.innerText;
      suggestionsEl.classList.add("hidden");
    };
  });
});

// hide suggestions when clicked outside
document.addEventListener("click", e => {
  if (!e.target.closest(".search-col")) suggestionsEl.classList.add("hidden");
});

/* ---------- ADD INGREDIENT ---------- */
addBtn.onclick = () => {
  const name = searchInput.value.trim();
  const qty = qtyInput.value.trim();

  if (!name) return alert("Enter an ingredient.");
  if (!qty) return alert("Enter quantity in grams.");

  grocery.push({ name, qty });
  saveAndRender();

  searchInput.value = "";
  qtyInput.value = "";
};

/* ---------- REMOVE MULTIPLE ---------- */
removeBtn.onclick = () => {
  alert("To remove: click the remove button on each tile.");
};

/* ---------- SLIDE-UP PANEL ---------- */
function openPanel(html){
  panelBody.innerHTML = html;
  recipePanel.classList.add("open");
}

closePanel.onclick = () => recipePanel.classList.remove("open");

/* ---------- 2 RECIPES PER INGREDIENT ---------- */
generateBtn.onclick = async () => {
  if (!grocery.length) return alert("Add ingredients first.");

  recipeGrid.innerHTML = "Loading...";
  recipeGrid.classList.remove("hidden");

  const ingredients = grocery.map(g => g.name.toLowerCase());
  const finalRecipes = [];
  const usedIds = new Set();

  // fetch 2 recipes for EACH ingredient
  for (const ing of ingredients){
    try {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ing)}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.meals) continue;

      const twoMeals = data.meals.slice(0, 2);

      for (const meal of twoMeals){
        if (!usedIds.has(meal.idMeal)){
          usedIds.add(meal.idMeal);
          finalRecipes.push(meal);
        }
      }
    } catch(e){
      console.error("Error fetching:", ing, e);
    }
  }

  if (!finalRecipes.length){
    recipeGrid.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipeGrid.innerHTML = "";

  // Render recipe cards
  finalRecipes.forEach(meal => {
    const card = document.createElement("div");
    card.className = "recipe-card-item";

    card.innerHTML = `
      <img src="${meal.strMealThumb}">
      <div class="recipe-card-title">${meal.strMeal}</div>
    `;

    card.onclick = async () => {
      try {
        const detailURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`;
        const res2 = await fetch(detailURL);
        const data2 = await res2.json();

        const info = data2.meals[0];

        // Convert to steps
        const steps = info.strInstructions
          .split(/\r?\n/)
          .filter(s => s.trim());

        const youtube = info.strYoutube
          ? `<a href="${info.strYoutube}" target="_blank">
               <button class="btn primary">Watch Video</button>
             </a>`
          : "";

        const html = `
          <img src="${info.strMealThumb}">
          <h2>${info.strMeal}</h2>
          ${youtube}
          <h3>Instructions</h3>
          <ol>${steps.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ol>
        `;

        openPanel(html);

      } catch (err){
        console.error("Detail error:", err);
        openPanel("<p>Error loading recipe.</p>");
      }
    };

    recipeGrid.appendChild(card);
  });
};

/* ---------- INITIAL RENDER ---------- */
renderGrocery();
