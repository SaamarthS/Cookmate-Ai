// ============================================
// Health → Foods & Simple Recipe Suggestions
// ============================================
// BIG database of common diseases, weaknesses & deficiencies.
// This is ONLY for general education,
// NOT for diagnosis, treatment, cure, or emergency use.
// Always consult a doctor / specialist / dietitian.
// ============================================

const healthData = [
  // 1) Iron deficiency / Anemia
  {
    keywords: ["anemia", "low hemoglobin", "iron deficiency", "iron-deficiency", "hb low"],
    title: "Iron Deficiency / Anemia Support",
    foods: [
      "Leafy greens (spinach, methi, amaranth)",
      "Legumes (lentils, rajma, chana, moong)",
      "Beetroot, pomegranate, dates, raisins",
      "Eggs and lean meats (if non-vegetarian)",
      "Jaggery (gur) in moderation, with meals"
    ],
    recipes: [
      "Palak dal / spinach dal with lemon on top",
      "Beetroot & carrot salad with lemon",
      "Rajma or chole with brown rice",
      "Sprouted moong salad with onion, tomato, lemon"
    ]
  },

  // 2) Vitamin D / Weak bones
  {
    keywords: ["vitamin d", "vit d", "weak bones", "bone pain", "osteomalacia"],
    title: "Vitamin D & Bone Strength Support",
    foods: [
      "Safe sunlight exposure as advised by doctor",
      "Mushrooms (exposed to sunlight if possible)",
      "Fortified milk, curd, or plant-based milks",
      "Egg yolk",
      "Fatty fish (salmon, sardines, mackerel – if non-veg)",
      "Sesame seeds and ragi with calcium-rich foods"
    ],
    recipes: [
      "Ragi dosa or ragi porridge with curd",
      "Mixed mushroom stir-fry",
      "Curd with nuts & seeds as a side"
    ]
  },

  // 3) Rickets (children)
  {
    keywords: ["rickets", "bone deformity", "weak bones in children"],
    title: "Rickets / Severe Vitamin D & Calcium Deficiency (Supportive Foods)",
    foods: [
      "Safe sunlight exposure as advised by paediatrician",
      "Calcium-rich foods: milk, curd, paneer, ragi, sesame seeds",
      "Vitamin D sources: fortified milk, mushrooms, egg yolk, fatty fish (if non-veg)",
      "Adequate protein for growth",
      "Avoid frequent junk food and soft drinks"
    ],
    recipes: [
      "Ragi porridge with milk and a little jaggery",
      "Vegetable paneer pulao with curd",
      "Mixed vegetable dal with ragi roti",
      "Sesame seed (til) chutney with idli or dosa"
    ]
  },

  // 4) Eye problems / Vitamin A
  {
    keywords: [
      "eye problem", "eye problems", "poor eyesight", "weak eyesight",
      "night blindness", "dry eyes", "eye strain", "vitamin a deficiency"
    ],
    title: "Eye Health / Vitamin A & Antioxidant Support",
    foods: [
      "Carrot, pumpkin, sweet potato (beta-carotene)",
      "Dark green leafy vegetables (spinach, methi, amaranth)",
      "Fruits like mango, papaya, orange",
      "Nuts & seeds (almonds, sunflower seeds, flax seeds)",
      "Fish rich in omega-3 (if non-veg)",
      "Plenty of water to reduce dryness"
    ],
    recipes: [
      "Carrot & cucumber salad with lemon",
      "Palak (spinach) sabzi or palak dal",
      "Pumpkin sabzi with chapati",
      "Papaya bowl with a few nuts (no extra sugar)"
    ]
  },

  // 5) Vitamin C deficiency / low immunity
  {
    keywords: [
      "vitamin c deficiency", "weak immunity", "frequent infection",
      "bleeding gums", "scurvy", "cold frequently"
    ],
    title: "Vitamin C & Immunity Support",
    foods: [
      "Citrus fruits (orange, lemon, mosambi)",
      "Amla (Indian gooseberry), guava, kiwi",
      "Tomato, capsicum, green leafy vegetables",
      "Sprouts and lightly cooked vegetables",
      "Plenty of water"
    ],
    recipes: [
      "Amla juice or amla pickle (limited salt/oil)",
      "Mixed fruit bowl with orange, guava, kiwi",
      "Tomato and cucumber salad with lemon",
      "Lemon water without excess sugar"
    ]
  },

  // 6) Calcium deficiency / Osteoporosis risk
  {
    keywords: [
      "calcium deficiency", "weak bones", "osteoporosis", "bone fracture"
    ],
    title: "Calcium-Rich Food Support",
    foods: [
      "Milk, curd, paneer, cheese (in moderation)",
      "Ragi, sesame seeds (til), almonds",
      "Green leafy vegetables like sarson, methi, amaranth",
      "Fortified plant milks (check labels)",
      "Vitamin D sources to help calcium absorption"
    ],
    recipes: [
      "Ragi roti / ragi dosa with vegetable curry",
      "Curd rice with grated carrot",
      "Paneer bhurji with chapati",
      "Sesame seed chutney with idli / dosa"
    ]
  },

  // 7) Vitamin B12 deficiency
  {
    keywords: ["vitamin b12", "b12 deficiency", "b12", "numbness", "tingling"],
    title: "Vitamin B12 Deficiency Support",
    foods: [
      "Milk, curd, paneer (for vegetarians)",
      "Fortified breakfast cereals (check label)",
      "Eggs, fish, and lean meats (for non-vegetarians)",
      "Balanced meals with enough protein",
      "B12 supplements only as per doctor’s advice"
    ],
    recipes: [
      "Curd rice with vegetables",
      "Paneer bhurji with chapati",
      "Egg bhurji with vegetables (for non-veg eaters)",
      "Vegetable upma with a side of curd"
    ]
  },

  // 8) Iodine deficiency / Goitre
  {
    keywords: ["iodine deficiency", "goitre", "goiter", "neck swelling"],
    title: "Iodine Deficiency / Goitre (Supportive Foods)",
    foods: [
      "Use iodised salt as recommended",
      "Dairy products like milk, curd, paneer",
      "Fish and seafood (if non-veg)",
      "Eggs (if non-veg)",
      "Avoid excess raw cruciferous vegetables in very large amounts unless doctor says okay"
    ],
    recipes: [
      "Simple vegetable curry with iodised salt",
      "Fish curry (if non-veg) with rice",
      "Curd with vegetables as side dish"
    ]
  },

  // 9) Zinc deficiency
  {
    keywords: ["zinc deficiency", "slow wound healing", "low immunity zinc"],
    title: "Zinc-Rich Food Support",
    foods: [
      "Pulses and dals (chana, rajma, lentils)",
      "Nuts & seeds (pumpkin seeds, sesame, cashews, almonds)",
      "Whole grains (wheat, millets, oats)",
      "Dairy (milk, curd, paneer)",
      "Eggs, meat (if non-veg)"
    ],
    recipes: [
      "Mixed dal khichdi with vegetables",
      "Sprouts salad with seeds on top",
      "Paneer stir-fry with vegetables",
      "Oats upma with peanuts"
    ]
  },

  // 10) Protein deficiency / Underweight
  {
    keywords: ["protein deficiency", "low protein", "muscle loss", "underweight"],
    title: "Protein Deficiency / Underweight Support",
    foods: [
      "Pulses and dals (toor, moong, masoor, chana)",
      "Sprouts (moong, chana, mixed sprouts)",
      "Paneer, milk, curd, tofu, soy chunks",
      "Eggs, fish, chicken (if non-vegetarian)",
      "Nuts & seeds (peanuts, almonds, walnuts, sunflower seeds)"
    ],
    recipes: [
      "Mixed dal khichdi with ghee (small amount)",
      "Sprouts chaat with onion, tomato, lemon",
      "Paneer or tofu bhurji with chapati",
      "Egg omelette with vegetables (if non-veg)"
    ]
  },

  // 11) Constipation
  {
    keywords: ["constipation", "no motion", "hard stool"],
    title: "Constipation Relief Support",
    foods: [
      "Plenty of water throughout the day (unless restricted by doctor)",
      "High-fibre foods: fruits (guava, papaya, banana), vegetables, salads",
      "Whole grains: oats, brown rice, millets, whole wheat chapati",
      "Soaked raisins or figs (in moderation)",
      "Avoid very oily, deep-fried and extremely processed foods"
    ],
    recipes: [
      "Oats upma with vegetables",
      "Fruit bowl with papaya, banana and a few soaked raisins",
      "Veg khichdi with extra vegetables",
      "Salad with cucumber, carrot, tomato, onion and lemon"
    ]
  },

  // 12) Fatigue / Low energy
  {
    keywords: ["fatigue", "tired", "weakness", "low energy", "tiredness"],
    title: "General Fatigue / Low Energy Support",
    foods: [
      "Whole grains (oats, brown rice, millets)",
      "Fruits like banana, apple, orange, seasonal fruits",
      "Nuts & seeds (almonds, walnuts, sunflower seeds)",
      "Plenty of water, buttermilk, lemon water",
      "Balanced meals with carbs + protein + healthy fat"
    ],
    recipes: [
      "Oats upma with vegetables",
      "Banana + peanut butter smoothie (less sugar)",
      "Lemon water with a pinch of salt after sweating",
      "Paneer or tofu bhurji with chapati"
    ]
  },

  // 13) Diabetes
  {
    keywords: ["diabetes", "high sugar", "high blood sugar", "type 2 diabetes"],
    title: "Diabetes-Friendly Eating Support",
    foods: [
      "Whole grains: millets, brown rice, oats (controlled portions)",
      "Non-starchy vegetables (lauki, tinda, bhindi, beans, leafy greens)",
      "Protein: dal, paneer, curd, eggs, fish (as allowed by doctor)",
      "Nuts (small handful) like almonds and walnuts",
      "Avoid sugary drinks, sweets, refined flour"
    ],
    recipes: [
      "Vegetable sambar with small portion of brown rice",
      "Bhindi sabzi + dal + salad",
      "Vegetable stir-fry with paneer / tofu",
      "Curd with cucumber and spices as a side"
    ]
  },

  // 14) High BP / Hypertension
  {
    keywords: [
      "high bp", "high blood pressure", "hypertension", "bp problem"
    ],
    title: "High Blood Pressure / Hypertension Support",
    foods: [
      "More fruits and vegetables (esp. potassium-rich like banana or coconut water ONLY if allowed by doctor)",
      "Use less salt in cooking (as advised)",
      "Whole grains instead of refined flour",
      "Nuts in small quantity, unsalted",
      "Avoid very salty, packaged foods, pickles and fried snacks"
    ],
    recipes: [
      "Vegetable dal with low-salt chapati",
      "Steamed or lightly sautéed vegetables",
      "Fruit bowl (if allowed by dietitian)",
      "Home-cooked poha / upma with more vegetables and less salt"
    ]
  },

  // 15) High cholesterol
  {
    keywords: ["high cholesterol", "cholesterol", "lipids high"],
    title: "High Cholesterol Support",
    foods: [
      "Oats, barley, and other whole grains",
      "Plenty of vegetables and fruits",
      "Good fats from nuts, seeds, and limited oils",
      "Fish rich in omega-3 (if non-veg)",
      "Avoid deep-fried foods, trans fats, and reused fried oil"
    ],
    recipes: [
      "Oats porridge with fruits (no extra sugar)",
      "Grilled or baked fish with vegetables (if non-veg)",
      "Salad with sprouts, vegetables and lemon",
      "Vegetable curry made with minimal oil"
    ]
  },

  // 16) Acidity / Gas
  {
    keywords: ["acidity", "gas", "heartburn", "bloating"],
    title: "Acidity / Gas Relief Support",
    foods: [
      "Light, non-spicy home-cooked food",
      "Banana, coconut water, buttermilk",
      "Boiled vegetables, khichdi, idli",
      "Small, frequent meals instead of heavy meals",
      "Avoid very oily, spicy, late-night heavy dinners"
    ],
    recipes: [
      "Moong dal khichdi with little ghee",
      "Curd rice with grated carrot",
      "Steamed idli with coconut chutney (less spicy)"
    ]
  },

  // 17) Gastritis
  {
    keywords: ["gastritis", "stomach burning", "stomach irritation"],
    title: "Gastritis Support (Gentle Foods)",
    foods: [
      "Soft, non-spicy foods like khichdi, curd rice",
      "Banana, coconut water, buttermilk",
      "Avoid chilli, very sour and deep-fried items",
      "Eat smaller meals more often",
      "Avoid lying down immediately after eating"
    ],
    recipes: [
      "Plain moong dal khichdi",
      "Curd rice with coriander",
      "Soft upma with minimal oil"
    ]
  },

  // 18) Cold / Cough
  {
    keywords: ["cold", "cough", "sore throat", "runny nose"],
    title: "Cold / Cough Support",
    foods: [
      "Warm water frequently",
      "Herbal teas (tulsi, ginger, honey – not for infants)",
      "Soups (tomato, vegetable, chicken if non-veg)",
      "Fruits rich in vitamin C (orange, amla, lemon, guava)",
      "Avoid very cold drinks and ice creams"
    ],
    recipes: [
      "Ginger–tulsi tea with honey (for adults, not infants)",
      "Hot vegetable soup with pepper",
      "Lemon water with a pinch of honey"
    ]
  },

  // 19) Obesity / Overweight
  {
    keywords: ["obesity", "overweight", "weight loss", "lose weight"],
    title: "Weight Management / Overweight Support",
    foods: [
      "More vegetables and salads in every meal",
      "Whole grains instead of refined flour",
      "Protein in every meal (dal, paneer, curd, eggs, fish)",
      "Avoid sugary drinks, sweets, deep-fried snacks",
      "Plenty of water, buttermilk, unsweetened herbal teas"
    ],
    recipes: [
      "Vegetable dal with 1–2 chapatis (no extra ghee)",
      "Stir-fried vegetables with paneer / tofu",
      "Vegetable salad before meals",
      "Boiled chana / sprouts chaat"
    ]
  },

  // 20) PCOS / PCOD
  {
    keywords: ["pcos", "pcod", "polycystic", "irregular periods"],
    title: "PCOS / PCOD Lifestyle & Food Support (General)",
    foods: [
      "Balanced meals with protein + fibre + healthy fats",
      "Whole grains instead of refined flour",
      "Plenty of vegetables and some fruits",
      "Nuts and seeds (flax, sunflower, sesame) in small quantity",
      "Avoid excessive sugary foods, soft drinks and deep-fried snacks"
    ],
    recipes: [
      "Vegetable dal with salad and chapati",
      "Stir-fried vegetables with paneer / tofu",
      "Ragi / millet-based dosa with sambar",
      "Sprouts chaat as an evening snack"
    ]
  },

  // 21) Hair fall
  {
    keywords: ["hair fall", "hairfall", "hair loss"],
    title: "Hair Fall / Hair Health Support",
    foods: [
      "Protein-rich foods (dal, paneer, curd, eggs, fish)",
      "Iron-rich foods (greens, beetroot, dates, rajma, chana)",
      "Good fats (nuts, seeds, groundnut, til)",
      "Fruits and vegetables for vitamins and antioxidants",
      "Plenty of water"
    ],
    recipes: [
      "Sprouts salad with onion, tomato and lemon",
      "Paneer tikka (tawa, less oil) with salad",
      "Mixed vegetable dal with brown rice",
      "Fruit bowl with a few nuts"
    ]
  },

  // 22) Skin problems / Acne
  {
    keywords: ["skin problem", "acne", "pimples", "dull skin", "oily skin"],
    title: "Skin Health Support",
    foods: [
      "Plenty of water and unsweetened fluids",
      "Fruits & vegetables rich in vitamin C and antioxidants",
      "Healthy fats from nuts, seeds and a little oil",
      "Avoid too much sugary, oily and packaged junk foods",
      "Balanced meals instead of frequent fried snacks"
    ],
    recipes: [
      "Fruit salad (orange, pomegranate, papaya)",
      "Stir-fried vegetables with minimal oil",
      "Lemon water instead of sugary soft drinks"
    ]
  },

  // 23) Stress / Anxiety / Mood (food support only)
  {
    keywords: ["stress", "anxiety", "low mood", "depression food"],
    title: "Stress & Mood Support (Through Food Only)",
    foods: [
      "Regular meals instead of skipping food",
      "Whole grains (oats, brown rice, millets)",
      "Protein from dals, paneer, curd, eggs, fish",
      "Nuts & seeds (walnuts, almonds, pumpkin seeds)",
      "Limit excess caffeine and sugary drinks"
    ],
    recipes: [
      "Vegetable oats upma",
      "Curd with fruits and a few nuts",
      "Dal, rice and a big portion of vegetables",
      "Herbal tea (chamomile / tulsi) in the evening (if suitable)"
    ]
  },

  // 24) Insomnia / Poor sleep
  {
    keywords: ["insomnia", "can’t sleep", "cant sleep", "poor sleep", "sleep problem"],
    title: "Sleep Support (Food & Timing Only)",
    foods: [
      "Light dinner, not too close to bedtime",
      "Warm milk (if suitable for you)",
      "Avoid heavy, oily, spicy dinners late at night",
      "Avoid strong tea/coffee close to bedtime",
      "Regular meal timings during the day"
    ],
    recipes: [
      "Simple khichdi or light dal-chapati for dinner",
      "Warm milk with a pinch of turmeric (if advised okay)",
      "Light vegetable soup in the evening"
    ]
  },

  // 25) Kidney stones (general, non-personalised)
  {
    keywords: ["kidney stone", "kidney stones"],
    title: "Kidney Stone Support (Diet Tips – General)",
    foods: [
      "Plenty of water unless doctor restricts",
      "Limit very salty and packaged foods",
      "Avoid too many colas / soft drinks",
      "Moderate amount of animal protein (as per doctor)",
      "Some fruits and vegetables (specific restrictions depend on stone type)"
    ],
    recipes: [
      "Simple vegetable dal with chapati",
      "Veg upma / poha with less salt",
      "Buttermilk (if allowed) instead of soft drinks"
    ]
  },

  // 26) Fatty liver (general lifestyle)
  {
    keywords: ["fatty liver", "liver fat"],
    title: "Fatty Liver Support (Healthy Eating)",
    foods: [
      "More vegetables and some fruits (doctor-approved)",
      "Whole grains instead of refined flour",
      "Lean protein: dals, paneer, curd, eggs, fish (limit red meat)",
      "Avoid very sugary foods, soft drinks, alcohol (as per medical advice)",
      "Use limited oil, avoid deep-frying"
    ],
    recipes: [
      "Vegetable dal with brown rice",
      "Grilled / baked fish with vegetables (if non-veg)",
      "Millet khichdi with vegetables",
      "Curd as a side with meals"
    ]
  },

  // 27) CANCER (during treatment – chemo/radiation)
  {
    keywords: [
      "cancer", "chemotherapy", "chemo", "radiation", "radiotherapy", "tumor", "tumour"
    ],
    title: "Cancer Treatment Support (Food for Strength – NOT a Cure)",
    foods: [
      "Follow the hospital / oncologist / dietitian diet chart FIRST",
      "Soft, easy-to-digest foods if there is nausea or mouth sores",
      "Small, frequent meals with enough calories and protein (dal, paneer, curd, eggs, fish as allowed)",
      "Safe, well-cooked food to reduce infection risk (avoid raw street food, unsafe water)",
      "Plenty of safe fluids (boiled/filtered water, soups, buttermilk, coconut water if allowed)"
    ],
    recipes: [
      "Soft khichdi with dal and vegetables (low spice), ONLY if tolerated",
      "Plain curd rice or dahi with soft rice",
      "Mild vegetable or chicken soup (well cooked, not very spicy)",
      "Smoothies made from doctor-allowed fruits and curd/milk",
      "Every patient is different: exact diet MUST be from oncology team and clinical dietitian."
    ]
  },

  // 28) Heart disease / after heart attack
  {
    keywords: [
      "heart attack", "heart disease", "coronary", "cad", "angina", "bypass surgery"
    ],
    title: "Heart Disease / Post–Heart Attack Support (Food)",
    foods: [
      "Strictly follow cardiologist and cardiac dietitian instructions",
      "More vegetables, salads and fruits (only if allowed – some patients have restrictions)",
      "Whole grains instead of refined flour",
      "Healthy fats from nuts and seeds in small amounts; avoid trans fats and deep-fried foods",
      "Low-salt, low-sugar, low-oil diet as recommended by doctor"
    ],
    recipes: [
      "Vegetable dal with steamed rice or chapati (less oil, less salt)",
      "Steamed / sautéed vegetables with minimal oil",
      "Oats or dal-based dishes instead of heavy fried snacks",
      "Doctor-approved fruit bowl instead of sweets"
    ]
  },

  // 29) Stroke (recovery support)
  {
    keywords: ["stroke", "paralysis", "brain stroke"],
    title: "Stroke Recovery (General Food Support)",
    foods: [
      "Diet must follow neurologist and rehab dietitian advice",
      "Soft, easy-to-swallow foods if there is swallowing difficulty (as guided by speech therapist/dietitian)",
      "Balanced, low-salt diet to control blood pressure",
      "Whole grains, vegetables, adequate protein for recovery (as allowed)",
      "Avoid alcohol, smoking, very salty and fried foods"
    ],
    recipes: [
      "Soft khichdi or mashed vegetable dal, if swallowing is safe",
      "Smooth, soft upma or porridge",
      "Curd (if allowed) with soft rice",
      "Any change must be first approved by treating team"
    ]
  },

  // 30) Chronic kidney disease (CKD) – very general
  {
    keywords: ["ckd", "chronic kidney disease", "kidney failure"],
    title: "Chronic Kidney Disease – Diet Is STRICTLY Doctor-Specific",
    foods: [
      "Kidney patients need a VERY personalised diet plan – always follow nephrologist and renal dietitian",
      "Fluids, salt, potassium, phosphorus and protein may be restricted – depends on your reports",
      "Avoid packaged salty snacks, pickles, soft drinks",
      "Use iodised salt only in the limited quantity allowed by doctor",
      "Do not copy diets of other patients – lab reports and stage are different"
    ],
    recipes: [
      "Only prepare foods recommended by your renal dietitian (e.g., specific dal quantity, specific vegetables)",
      "Often simple home food with controlled portions of dal, rice/chapati and selected vegetables is used",
      "Never start ‘high-protein’ or ‘high-fruit’ diet in CKD without doctor’s advice"
    ]
  },

  // 31) General weakness / “deficiency”
  {
    keywords: ["weakness", "deficiency", "general deficiency", "poor health", "weak"],
    title: "General Deficiency / Overall Nutrition Support",
    foods: [
      "Balanced plate: 1/2 vegetables + 1/4 whole grains + 1/4 protein",
      "Variety of colourful fruits and vegetables daily",
      "Different dals and pulses during the week",
      "Nuts & seeds in small quantity daily",
      "Plenty of water; avoid excess junk food and soft drinks"
    ],
    recipes: [
      "Mixed veg dal with chapati and salad",
      "Khichdi with vegetables and curd",
      "Sprouts salad or chana chaat",
      "Seasonal fruit bowl after meals instead of sweets"
    ]
  }
];

// =============================
// Utility functions
// =============================

function normalizeText(text) {
  return text.trim().toLowerCase();
}

// Find best match based on user input
function findMatch(userInput) {
  const normalized = normalizeText(userInput);
  if (!normalized) return null;

  // 1) Exact keyword inclusion (best)
  for (const item of healthData) {
    for (const keyword of item.keywords) {
      if (normalized.includes(keyword)) {
        return item;
      }
    }
  }

  // 2) Partial word overlap (fallback)
  const words = normalized.split(/\s+/);
  for (const item of healthData) {
    if (
      item.keywords.some(kw =>
        words.some(w => kw.includes(w) || w.includes(kw))
      )
    ) {
      return item;
    }
  }

  return null;
}

// Render results into HTML
function renderResults(match, userText) {
  const resultsSection = document.getElementById("resultsSection");
  const resultsContent = document.getElementById("resultsContent");
  const resultTitle = document.getElementById("resultTitle");

  resultsContent.innerHTML = "";

  if (!match) {
    resultTitle.textContent = `No exact match for: "${userText}"`;
    const block = document.createElement("div");
    block.className = "result-block";
    block.innerHTML = `
      <h3>Try these tips:</h3>
      <ul>
        <li>Check your spelling (e.g., "diabetes", "anemia", "hypertension").</li>
        <li>Use simple words like "iron deficiency", "vitamin D", "rickets", "cancer", "kidney disease".</li>
        <li>For serious or long-term problems, ALWAYS consult a doctor or dietitian. This tool is only general.</li>
      </ul>
    `;
    resultsContent.appendChild(block);
    resultsSection.classList.remove("hidden");
    return;
  }

  resultTitle.textContent = match.title;

  // Foods block
  const foodsBlock = document.createElement("div");
  foodsBlock.className = "result-block";
  foodsBlock.innerHTML = "<h3>Helpful Foods (General)</h3>";
  const foodList = document.createElement("ul");
  match.foods.forEach(food => {
    const li = document.createElement("li");
      li.textContent = food;
      foodList.appendChild(li);
  });
  foodsBlock.appendChild(foodList);

  // Recipes block
  const recipesBlock = document.createElement("div");
  recipesBlock.className = "result-block";
  recipesBlock.innerHTML = "<h3>Simple Recipe Ideas</h3>";
  const recipeList = document.createElement("ul");
  match.recipes.forEach(recipe => {
    const li = document.createElement("li");
    li.textContent = recipe;
    recipeList.appendChild(li);
  });
  recipeList.appendChild(document.createElement("li")).textContent =
    "Important: These are general ideas only. Always follow your doctor’s or dietitian’s exact instructions for your condition.";
  recipesBlock.appendChild(recipeList);

  resultsContent.appendChild(foodsBlock);
  resultsContent.appendChild(recipesBlock);

  resultsSection.classList.remove("hidden");
}

// =============================
// Event listeners
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("conditionInput");
  const button = document.getElementById("findFoodsBtn");

  button.addEventListener("click", () => {
    const userText = input.value;
    const match = findMatch(userText);
    renderResults(match, userText);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      button.click();
    }
  });
});
