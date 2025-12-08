// INTRO → LOGO
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("hero").classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("hero").classList.add("hidden");
    document.getElementById("survey").classList.remove("hidden");
    showStep(0);
  }, 1500);
});

// SURVEY STEPS
let steps = document.querySelectorAll(".step");
let current = 0;

function showStep(i){
  current = i;
  steps.forEach((s, idx)=> s.classList.toggle("active", idx === i));

  document.getElementById("backBtn").disabled = i === 0;
  document.getElementById("nextBtn").classList.toggle("hidden", i === steps.length - 1);
  document.getElementById("submitBtn").classList.toggle("hidden", i !== steps.length - 1);
}

document.getElementById("nextBtn").onclick = () => showStep(current + 1);
document.getElementById("backBtn").onclick = () => showStep(current - 1);

// number control
document.getElementById("inc").onclick = () => {
  let x = document.getElementById("familyCount");
  x.value = Math.min(20, Number(x.value) + 1);
};
document.getElementById("dec").onclick = () => {
  let x = document.getElementById("familyCount");
  x.value = Math.max(1, Number(x.value) - 1);
};

// food selection
document.querySelectorAll(".food-card").forEach(card => {
  card.onclick = () => card.classList.toggle("selected");
});

// submit survey
document.getElementById("surveyForm").onsubmit = (e) => {
  e.preventDefault();
  document.getElementById("survey").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
};
