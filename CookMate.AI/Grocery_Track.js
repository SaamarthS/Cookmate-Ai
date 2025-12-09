const searchInput = document.getElementById("searchInput");
const suggestionsEl = document.getElementById("suggestions");
const qtyInput = document.getElementById("qtyInput");
const expiryInput = document.getElementById("expiryInput");
const addBtn = document.getElementById("addBtn");
const groceryListEl = document.getElementById("groceryList");
const recipeBtn = document.getElementById("recipeBtn");

let grocery = [];

// Load from localStorage on page load
if (localStorage.getItem('groceryData')) {
    grocery = JSON.parse(localStorage.getItem('groceryData'));
}

function renderList() {
    recipeBtn.classList.toggle("disabled", grocery.length === 0);
    
    grocery.sort((a, b) => {
        if (!a.expiry && !b.expiry) return 0;
        if (!a.expiry) return 1;
        if (!b.expiry) return -1;
        return new Date(a.expiry) - new Date(b.expiry);
    });
    
    groceryListEl.innerHTML = '';
    const today = new Date();
    
    grocery.forEach((item, index) => {
        const tile = document.createElement('div');
        tile.className = 'grocery-tile';
        
        let status = 'Perfectly Fine';
        if (!item.expiry) {
            tile.classList.add('gray');
            status = 'No expiry date';
        } else {
            const expDate = new Date(item.expiry);
            const diff = (expDate - today) / (1000 * 60 * 60 * 24);
            if (diff <= 0) {
                tile.classList.add('red');
                status = 'Expired';
            } else if (diff <= 15) {
                tile.classList.add('orange');
                status = 'About to Expire';
            }
        }
        
        tile.innerHTML = `
    <label class="check-wrapper">
      <input type="checkbox" class="select-check">
      <span class="checkmark"></span>
    </label>

    <h3>${item.name}</h3>
    <p>Qty: ${item.qty} g</p>
    <p>Expiry: ${item.expiry || 'No date'}</p>
    <p><strong>Status:</strong> ${status}</p>

    <button class="remove-btn">Remove</button>
`; 
copyBtn.onclick = () => {
    const tiles = document.querySelectorAll(".grocery-tile");
    let selectedNames = [];

    tiles.forEach((tile, index) => {
        const check = tile.querySelector(".select-check");
        if (check && check.checked) {
            const item = grocery[index];
            selectedNames.push(item.name);
        }
    });

    if (selectedNames.length === 0) {
        alert("No items selected.");
        return;
    }

    const finalText = selectedNames.join(", ");

    navigator.clipboard.writeText(finalText)
        .then(() => alert("Copied: " + finalText));
};
        
        tile.querySelector('.remove-btn').onclick = () => {
            grocery.splice(index, 1);
            renderList();
        };
        
        groceryListEl.appendChild(tile);
    });
    
    // CRITICAL: SYNC WITH ALERTS (50g threshold)
    localStorage.setItem('groceryData', JSON.stringify(grocery));
}

copyBtn.onclick = () => {
    const tiles = document.querySelectorAll(".grocery-tile");
    let selectedNames = [];

    tiles.forEach((tile, index) => {
        const check = tile.querySelector(".select-check");
        if (check && check.checked) {
            const item = grocery[index];
            selectedNames.push(item.name);
        }
    });

    if (selectedNames.length === 0) {
        alert("No items selected.");
        return;
    }

    const finalText = selectedNames.join(", ");

    navigator.clipboard.writeText(finalText)
        .then(() => alert("Copied: " + finalText));
};

// ----------------- SUGGESTIONS (ORIGINAL) -----------------
searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) {
        suggestionsEl.classList.add("hidden");
        return;
    }
    
    const matches = INGREDIENTS.filter(i => i.toLowerCase().includes(q)).slice(0, 10);
    suggestionsEl.innerHTML = matches.map(m => `<li>${m}</li>`).join('');
    suggestionsEl.classList.remove("hidden");
});

document.addEventListener("click", e => {
    if (!e.target.closest(".col")) {
        suggestionsEl.classList.add("hidden");
    }
});

// Click suggestion (fixed)
suggestionsEl.addEventListener("click", e => {
    if (e.target.tagName === 'LI') {
        searchInput.value = e.target.innerText;
        suggestionsEl.classList.add("hidden");
    }
});

// ----------------- ADD ITEM (ORIGINAL) -----------------
addBtn.onclick = () => {
    const name = searchInput.value.trim();
    const qty = qtyInput.value.trim();
    const expiry = expiryInput.value.trim();
    
    if (!name) return alert("Enter ingredient");
    if (!qty) return alert("Enter quantity");
    
    grocery.push({ name, qty, expiry });
    searchInput.value = '';
    qtyInput.value = '';
    expiryInput.value = '';
    renderList();
};

// ----------------- RECIPE BUTTON -----------------
recipeBtn.onclick = () => {
    if (grocery.length === 0) return;
    window.location.href = ""; // blank as requested
};

// Initial render
renderList();

// script.js
document.getElementById('recipeBtn').addEventListener('click', () => {
    window.location.href = 'https://saamarth.app.n8n.cloud/webhook/5b13c7c7-3356-4aa2-a8ec-bc7b9ce39bb1/chat';
});

