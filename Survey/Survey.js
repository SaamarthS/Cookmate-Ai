// element refs
const intro = document.getElementById("intro");
const hero = document.getElementById("hero");
const survey = document.getElementById("survey");
const home = document.getElementById("home");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const submitBtn = document.getElementById("submitBtn");

// Steps array
let steps = [...document.querySelectorAll(".step")];
let current = 0;

// Start → Logo → Survey
startBtn.onclick = () => {
  intro.classList.add("hidden");
  hero.classList.remove("hidden");

  setTimeout(() => {
    hero.classList.add("hidden");
    survey.classList.remove("hidden");
    showStep(0);
  }, 900);
};

// Show specific step
function showStep(i){
  current = i;

  steps.forEach((step, idx)=>{
    step.style.display = idx === i ? "block" : "none";
  });

  backBtn.disabled = i === 0;
  nextBtn.style.display = i === steps.length - 1 ? "none" : "inline-block";
  submitBtn.classList.toggle("hidden", i !== steps.length - 1);
}

nextBtn.onclick = () => showStep(current + 1);
backBtn.onclick = () => showStep(current - 1);

// Step 1 number selector
const inc = document.getElementById("inc");
const dec = document.getElementById("dec");
const familyCount = document.getElementById("familyCount");

inc.onclick = () => familyCount.value = Math.min(20, +familyCount.value + 1);
dec.onclick = () => familyCount.value = Math.max(1, +familyCount.value - 1);

// Step 2 diet
const diet = document.getElementById("diet");
document.querySelectorAll(".large-option:not(.spice)").forEach(btn=>{
  btn.onclick = ()=>{
    document.querySelectorAll(".large-option:not(.spice)").forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected");
    diet.value = btn.dataset.value;
  };
});

// Step 3 cuisines
const cuisinesHidden = document.getElementById("cuisines");
document.querySelectorAll(".chk input").forEach(box=>{
  box.onchange = ()=>{
    cuisinesHidden.value = JSON.stringify(
      [...document.querySelectorAll(".chk input:checked")].map(c=>c.value)
    );
  };
});

// Step 4 spice
const spice = document.getElementById("spice");
document.querySelectorAll(".spice").forEach(btn=>{
  btn.onclick = ()=>{
    document.querySelectorAll(".spice").forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected");
    spice.value = btn.dataset.value;
  };
});

// Submit
document.getElementById("surveyForm").onsubmit = e => {
  e.preventDefault();

  const data = {
    family: +familyCount.value,
    diet: diet.value,
    cuisines: JSON.parse(cuisinesHidden.value || "[]"),
    spice
  };

  localStorage.setItem("cookmate_onboard", JSON.stringify(data));

  survey.classList.add("hidden");
  home.classList.remove("hidden");
};