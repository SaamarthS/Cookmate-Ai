// Simple Nutrition Tracker – with localStorage and Indian foods

// Food database – per 100 g (approx)
const FOODS = [
  { id: "chapati", name: "Chapati (wheat)", per100: { calories: 250, protein: 8, carbs: 45, fat: 4, fiber: 4 } },
  { id: "rice", name: "Rice, boiled", per100: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4 } },
  { id: "dal", name: "Cooked dal (lentils)", per100: { calories: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 7.9 } },
  { id: "egg", name: "Boiled egg", per100: { calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0 } },
  { id: "paneer", name: "Paneer", per100: { calories: 296, protein: 18, carbs: 3.6, fat: 23, fiber: 0 } },
  { id: "banana", name: "Banana", per100: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6 } },
  { id: "milk", name: "Toned milk", per100: { calories: 60, protein: 3.2, carbs: 5, fat: 3.3, fiber: 0 } },
  { id: "salad", name: "Mixed veg salad", per100: { calories: 40, protein: 1.5, carbs: 8, fat: 0.3, fiber: 2.5 } },
  { id: "chicken_curry", name: "Chicken curry (boneless)", per100: { calories: 190, protein: 18, carbs: 4, fat: 11, fiber: 1 } },
  { id: "poha", name: "Poha (cooked)", per100: { calories: 132, protein: 3, carbs: 24, fat: 2.5, fiber: 1.5 } },
  { id: "idli", name: "Idli (steamed)", per100: { calories: 128, protein: 4, carbs: 23, fat: 2.7, fiber: 1 } },
  { id: "dosa_plain", name: "Dosa, plain", per100: { calories: 168, protein: 4, carbs: 27, fat: 5, fiber: 1 } },
  { id: "sambar", name: "Sambar", per100: { calories: 60, protein: 3, carbs: 8, fat: 2, fiber: 2 } },
  { id: "upma", name: "Upma (suji)", per100: { calories: 155, protein: 4, carbs: 27, fat: 4.5, fiber: 2 } },
  { id: "curd", name: "Curd / Dahi", per100: { calories: 98, protein: 11, carbs: 3.4, fat: 4.3, fiber: 0 } },
  { id: "rajma", name: "Rajma (kidney beans curry)", per100: { calories: 140, protein: 9, carbs: 24, fat: 0.5, fiber: 5.5 } },
  { id: "chole", name: "Chole (chickpea curry)", per100: { calories: 164, protein: 8.9, carbs: 27.4, fat: 2.6, fiber: 7.6 } },
  { id: "veg_biryani", name: "Veg biryani", per100: { calories: 150, protein: 3.5, carbs: 22, fat: 4.5, fiber: 2.5 } },
  { id: "chicken_biryani", name: "Chicken biryani", per100: { calories: 180, protein: 8, carbs: 20, fat: 7, fiber: 1.5 } },
  { id: "aloo_sabzi", name: "Aloo sabzi (dry curry)", per100: { calories: 120, protein: 2, carbs: 15, fat: 6, fiber: 2 } },
];

// Storage keys
const STORAGE_KEYS = {
  profile: "nt_profile",
  log: "nt_log",
  targets: "nt_targets",
};

// State
let dailyTargets = {
  calories: 2000,
  protein: 60,
  carbs: 250,
  fat: 55,
  fiber: 25,
};

let foodLog = [];

// Helpers
function $(id) {
  return document.getElementById(id);
}

function round2(x) {
  return Math.round(x * 10) / 10;
}

function safeGetItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn("localStorage set failed", e);
  }
}

// Nutrient calculation
function calculateNutrients(food, grams) {
  const factor = grams / 100;
  const n = food.per100;
  return {
    calories: n.calories * factor,
    protein: n.protein * factor,
    carbs: n.carbs * factor,
    fat: n.fat * factor,
    fiber: n.fiber * factor,
  };
}

// Score calculation
function computeScore(totals, targets) {
  const fields = ["calories", "protein", "carbs", "fat", "fiber"];
  let sumRatio = 0;
  let count = 0;

  fields.forEach((key) => {
    const total = totals[key];
    const target = targets[key];
    if (!target || target <= 0) return;

    const ratio = total / target;
    const deviation = Math.abs(1 - ratio);

    let contribution;
    if (deviation <= 0.1) contribution = 1;
    else if (deviation <= 0.3) contribution = 0.7;
    else if (deviation <= 0.6) contribution = 0.4;
    else contribution = 0.15;

    sumRatio += contribution;
    count++;
  });

  if (count === 0) return 0;
  return Math.round((sumRatio / count) * 100);
}

// UI updates
function updateFoodPreview() {
  const select = $("foodSelect");
  const gramsInput = $("foodQuantity");
  const grams = parseFloat(gramsInput.value) || 100;

  const foodId = select.value;
  const food = FOODS.find((f) => f.id === foodId);
  const previewContainer = $("foodPreviewChips");
  previewContainer.innerHTML = "";

  if (!food) return;

  const n = calculateNutrients(food, grams);

  const chips = [
    { label: "Calories", value: `${round2(n.calories)} kcal` },
    { label: "Protein", value: `${round2(n.protein)} g` },
    { label: "Carbs", value: `${round2(n.carbs)} g` },
    { label: "Fat", value: `${round2(n.fat)} g` },
    { label: "Fiber", value: `${round2(n.fiber)} g` },
  ];

  chips.forEach((c) => {
    const div = document.createElement("div");
    div.className = "chip";
    div.innerHTML = `<strong>${c.label}</strong> ${c.value}`;
    previewContainer.appendChild(div);
  });
}

function updateLogTable() {
  const tbody = $("logTableBody");
  const emptyState = $("emptyState");
  tbody.innerHTML = "";

  if (foodLog.length === 0) {
    emptyState.style.display = "block";
    return;
  }
  emptyState.style.display = "none";

  foodLog.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.grams}</td>
      <td>${round2(item.nutrients.calories)}</td>
      <td>${round2(item.nutrients.protein)}</td>
      <td>${round2(item.nutrients.carbs)}</td>
      <td>${round2(item.nutrients.fat)}</td>
      <td>${round2(item.nutrients.fiber)}</td>
    `;
    tbody.appendChild(tr);
  });
}

function updateSummary() {
  const totals = foodLog.reduce(
    (acc, item) => {
      acc.calories += item.nutrients.calories;
      acc.protein += item.nutrients.protein;
      acc.carbs += item.nutrients.carbs;
      acc.fat += item.nutrients.fat;
      acc.fiber += item.nutrients.fiber;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );

  $("summaryCalories").textContent = `${round2(totals.calories)} kcal`;
  $("summaryProtein").textContent = `${round2(totals.protein)} g`;
  $("summaryCarbs").textContent = `${round2(totals.carbs)} g`;
  $("summaryFatFiber").textContent = `${round2(totals.fat)} g fat · ${round2(totals.fiber)} g fiber`;

  $("summaryCaloriesTarget").textContent = `Target: ${dailyTargets.calories} kcal`;
  $("summaryProteinTarget").textContent = `Target: ${dailyTargets.protein} g`;
  $("summaryCarbsTarget").textContent = `Target: ${dailyTargets.carbs} g`;
  $("summaryFatFiberTarget").textContent = `Target: ${dailyTargets.fat} g fat · ${dailyTargets.fiber} g fiber`;

  function setBar(total, target, barId, labelId, unit) {
    const bar = $(barId);
    const label = $(labelId);
    const pct = target > 0 ? Math.min(120, (total / target) * 100) : 0;
    bar.style.width = `${pct}%`;
    label.textContent = `${round2(total)} / ${target || "—"} ${unit}`;
  }

  setBar(totals.calories, dailyTargets.calories, "caloriesBar", "caloriesLabel", "kcal");
  setBar(totals.protein, dailyTargets.protein, "proteinBar", "proteinLabel", "g");
  setBar(totals.carbs, dailyTargets.carbs, "carbsBar", "carbsLabel", "g");
  setBar(totals.fat, dailyTargets.fat, "fatsBar", "fatsLabel", "g");
  setBar(totals.fiber, dailyTargets.fiber, "fiberBar", "fiberLabel", "g");

  const score = computeScore(totals, dailyTargets);
  const scoreLabel = $("scoreLabel");
  if (foodLog.length === 0) {
    scoreLabel.textContent = "Score: — / 100 (add food to see today's score)";
  } else {
    let mood = "Keep going";
    if (score >= 85) mood = "Great day!";
    else if (score >= 70) mood = "Solid balance";
    else if (score >= 50) mood = "Can be improved";
    else mood = "You’ve just started";

    scoreLabel.textContent = `Score: ${score} / 100 · ${mood}`;
  }
}

// Targets and profile
function recalculateTargetsFromProfile() {
  const weight = parseFloat($("weight").value) || 60;
  const activity = $("activity").value;

  let calPerKg = 30;
  if (activity === "sedentary") calPerKg = 28;
  if (activity === "light") calPerKg = 30;
  if (activity === "moderate") calPerKg = 32;
  if (activity === "high") calPerKg = 36;

  const calories = Math.round(weight * calPerKg);
  const protein = Math.round(weight * 1.2);
  const carbs = Math.round((calories * 0.5) / 4);
  const fat = Math.round((calories * 0.25) / 9);
  const fiber = 25;

  dailyTargets = { calories, protein, carbs, fat, fiber };
  saveTargetsToStorage();
  saveProfileToStorage();
  updateSummary();
}

function setDefaultTargets() {
  dailyTargets = {
    calories: 2000,
    protein: 60,
    carbs: 250,
    fat: 55,
    fiber: 25,
  };
  saveTargetsToStorage();
  updateSummary();
}

// Storage helpers
function saveProfileToStorage() {
  const profile = {
    name: $("name").value || "",
    age: $("age").value || "",
    height: $("height").value || "",
    weight: $("weight").value || "",
    gender: $("gender").value,
    activity: $("activity").value,
  };
  safeSetItem(STORAGE_KEYS.profile, JSON.stringify(profile));
}

function loadProfileFromStorage() {
  const raw = safeGetItem(STORAGE_KEYS.profile);
  if (!raw) return;
  try {
    const profile = JSON.parse(raw);
    if (profile.name !== undefined) $("name").value = profile.name;
    if (profile.age !== undefined) $("age").value = profile.age;
    if (profile.height !== undefined) $("height").value = profile.height;
    if (profile.weight !== undefined) $("weight").value = profile.weight;
    if (profile.gender !== undefined) $("gender").value = profile.gender;
    if (profile.activity !== undefined) $("activity").value = profile.activity;
  } catch (e) {
    console.warn("Failed to parse profile", e);
  }
}

function saveLogToStorage() {
  safeSetItem(STORAGE_KEYS.log, JSON.stringify(foodLog));
}

function loadLogFromStorage() {
  const raw = safeGetItem(STORAGE_KEYS.log);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      foodLog = parsed;
    }
  } catch (e) {
    console.warn("Failed to parse log", e);
  }
}

function saveTargetsToStorage() {
  safeSetItem(STORAGE_KEYS.targets, JSON.stringify(dailyTargets));
}

function loadTargetsFromStorage() {
  const raw = safeGetItem(STORAGE_KEYS.targets);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      dailyTargets = {
        calories: parsed.calories || dailyTargets.calories,
        protein: parsed.protein || dailyTargets.protein,
        carbs: parsed.carbs || dailyTargets.carbs,
        fat: parsed.fat || dailyTargets.fat,
        fiber: parsed.fiber || dailyTargets.fiber,
      };
    }
  } catch (e) {
    console.warn("Failed to parse targets", e);
  }
}

// Init
function initFoodSelect() {
  const select = $("foodSelect");
  FOODS.forEach((food) => {
    const opt = document.createElement("option");
    opt.value = food.id;
    opt.textContent = food.name;
    select.appendChild(opt);
  });
  updateFoodPreview();
}

document.addEventListener("DOMContentLoaded", () => {
  // Load from storage
  loadProfileFromStorage();
  loadTargetsFromStorage();
  loadLogFromStorage();

  initFoodSelect();
  updateLogTable();
  updateSummary();

  $("foodSelect").addEventListener("change", updateFoodPreview);
  $("foodQuantity").addEventListener("input", updateFoodPreview);

  $("addFoodBtn").addEventListener("click", () => {
    const foodId = $("foodSelect").value;
    const grams = parseFloat($("foodQuantity").value);
    if (!grams || grams <= 0) {
      alert("Enter quantity in grams (e.g. 100).");
      return;
    }
    const food = FOODS.find((f) => f.id === foodId);
    if (!food) return;

    const nutrients = calculateNutrients(food, grams);
    foodLog.push({
      id: food.id,
      name: food.name,
      grams,
      nutrients,
    });

    $("foodQuantity").value = "";
    updateFoodPreview();
    updateLogTable();
    updateSummary();
    saveLogToStorage();
  });

  $("saveProfileBtn").addEventListener("click", () => {
    recalculateTargetsFromProfile();
    alert("Profile saved and daily targets updated!");
  });

  $("resetTargetsBtn").addEventListener("click", () => {
    setDefaultTargets();
    alert("Targets reset to default demo values.");
  });

  $("clearLogBtn").addEventListener("click", () => {
    if (!confirm("Clear today's log?")) return;
    foodLog = [];
    updateLogTable();
    updateSummary();
    saveLogToStorage();
  });

  $("exportBtn").addEventListener("click", () => {
    if (foodLog.length === 0) {
      alert("No data to export yet.");
      return;
    }
    const exportObj = {
      profile: {
        name: $("name").value || null,
        age: $("age").value || null,
        height: $("height").value || null,
        weight: $("weight").value || null,
        gender: $("gender").value,
        activity: $("activity").value,
      },
      dailyTargets,
      log: foodLog,
    };
    const json = JSON.stringify(exportObj, null, 2);
    navigator.clipboard
      .writeText(json)
      .then(() => alert("JSON copied to clipboard. Paste it into a file to save."))
      .catch(() => alert("Here is your JSON in console. (Clipboard failed)"));
    console.log("Exported data:", exportObj);
  });
});
