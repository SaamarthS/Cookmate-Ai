// recipes_local.js
// Generates 650+ Indian recipe objects (RECIPES_LOCAL) at runtime.
// Each recipe: { id, title, image, ingredients:[], instructions: [step1, step2, ...] }

(function(global){
  const baseDishes = [
    {tpl:"Aloo {style}", ingr:["potato","turmeric","oil","salt"], tag:"veg"},
    {tpl:"Aloo Paratha {style}", ingr:["potato","wheat flour","ghee","salt"], tag:"veg"},
    {tpl:"Masala {grain}", ingr:["rice","tomato","onion","turmeric","oil"], tag:"veg"},
    {tpl:"Paneer {style}", ingr:["paneer","tomato","cream","butter"], tag:"veg"},
    {tpl:"Paneer Tikka Masala", ingr:["paneer","yogurt","spices","tomato"], tag:"veg"},
    {tpl:"Dal {style}", ingr:["lentils","turmeric","ghee","cumin"], tag:"veg"},
    {tpl:"Chole {style}", ingr:["chickpeas","onion","tomato","garam masala"], tag:"veg"},
    {tpl:"Egg Curry {style}", ingr:["eggs","tomato","onion","turmeric"], tag:"nonveg"},
    {tpl:"Chicken {style}", ingr:["chicken","onion","tomato","garam masala"], tag:"nonveg"},
    {tpl:"Fish {style}", ingr:["fish","turmeric","salt","chili"], tag:"nonveg"},
    {tpl:"Pav Bhaji", ingr:["potato","cauliflower","tomato","butter"], tag:"veg"},
    {tpl:"Idli Sambhar", ingr:["rice","urad dal","tamarind","sambar dal"], tag:"veg"},
    {tpl:"Dosa {style}", ingr:["rice","urad dal","salt","oil"], tag:"veg"},
    {tpl:"Upma", ingr:["semolina","mustard","green chili","onion"], tag:"veg"},
    {tpl:"Poha", ingr:["flattened rice","turmeric","mustard","peanuts"], tag:"veg"},
    {tpl:"Pulao {style}", ingr:["rice","ghee","mixed vegetables","spices"], tag:"veg"},
    {tpl:"Biryani {style}", ingr:["rice","meat","yogurt","biryani masala"], tag:"nonveg"},
    {tpl:"Rasam", ingr:["tamarind","tomato","pepper","curry leaves"], tag:"veg"},
    {tpl:"Sambar", ingr:["dal","tamarind","sambar powder","vegetables"], tag:"veg"},
    {tpl:"Gajar Halwa", ingr:["carrot","milk","sugar","ghee"], tag:"veg"}
  ];

  const styles = [
    "Masala","Dry","With Peas","Curry","Stir-Fry","Roasted","Gravy","Tawa",
    "Punjabi","Hyderabadi","Kadai","Mughlai","Chettinad","Goan","Malvani",
    "Simple","Quick","Restaurant Style","Home Style","Street Style"
  ];

  const grains = ["Rice","Pulao","Khichdi","Biryani"];
  const veggies = ["Paneer","Aloo","Cauliflower","Spinach","Mixed Veg","Matar","Brinjal"];

  const placeholders = [
    "https://i.imgur.com/4C6vK6S.jpg","https://i.imgur.com/8b6z6XJ.jpg","https://i.imgur.com/Ja4k8zM.jpg",
    "https://i.imgur.com/6M7Y2Yk.jpg","https://i.imgur.com/3Gf3K5Z.jpg","https://i.imgur.com/placeholder.png",
    "https://i.imgur.com/wq6bXb8.jpg","https://i.imgur.com/2nCt3Sbl.jpg","https://i.imgur.com/2kFZwrX.jpg"
  ];

  const instrTemplates = {
    basic: [
      [
        "Heat 2 tablespoons oil in a pan over medium heat.",
        "Add aromatics (onion/garlic/ginger) and sauté until soft.",
        "Add the main vegetables or protein and spices; stir well.",
        "Pour in a splash of water, cover and simmer until cooked.",
        "Garnish with fresh herbs and serve hot."
      ],
      [
        "Warm oil or ghee in a wide pan.",
        "Temper whole spices for 30 seconds, then add chopped onion and sauté.",
        "Add tomatoes and cook until oil separates, then add main ingredients.",
        "Cook on low heat with lid on until flavors combine.",
        "Finish with a squeeze of lemon or chopped coriander."
      ]
    ],
    rice: [
      [
        "Wash the rice until water runs clear and soak for 15 minutes.",
        "Heat ghee, add whole spices and sauté for 30 seconds.",
        "Add rice and vegetables, stir for a minute.",
        "Add water in a 1:2 ratio, bring to boil then simmer covered until done.",
        "Turn off heat, let it rest for 5 minutes, fluff with a fork and serve."
      ],
      [
        "Sauté chopped onions and spices in oil.",
        "Add rice and stir so each grain is coated.",
        "Add stock or water, cover and cook on low until rice is tender.",
        "Let it rest off heat, then garnish and serve."
      ]
    ],
    sweets: [
      [
        "Grate or chop the main ingredient and add to a heavy-bottom pan.",
        "Pour milk and sugar; cook on low while stirring frequently.",
        "Reduce the mixture until thick and aromatic.",
        "Finish with ghee and nuts; serve warm."
      ]
    ],
    batter: [
      [
        "Soak the grains or lentils as required and grind to a smooth batter.",
        "Ferment the batter if needed for 6-8 hours.",
        "Heat a tawa and spread the batter thinly to form dosas or pour to make idlis.",
        "Cook until crisp/golden and serve with chutney and sambar."
      ]
    ]
  };

  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  function uniqueId(prefix, n){ return `${prefix}_${n}_${Math.random().toString(36).slice(2,8)}`; }

  const RECIPES_LOCAL = [];
  let counter = 0;

  for(let base of baseDishes){
    const times = 12;
    for(let t=0;t<times;t++){
      counter++;
      let title = base.tpl;
      if(title.includes("{style}")) title = title.replace("{style}", pick(styles));
      if(title.includes("{grain}")) title = title.replace("{grain}", pick(grains));
      if(Math.random() > 0.8 && base.tag === "veg") title += " " + pick(["Delight","Special","Chef's Choice","Quick"]);

      const ingrSet = new Set(base.ingr.slice());
      const extras = ["ginger","garlic","coriander","green chili","onion","tomato","cumin","mustard seeds","cashew","cream","yogurt","ghee","chili powder","garam masala","turmeric","potato","peas","spinach","curry leaves","coconut"];
      const extraCount = 1 + Math.floor(Math.random()*4);
      for(let i=0;i<extraCount;i++) ingrSet.add(pick(extras));

      const image = pick(placeholders);

      let instrArr = instrTemplates.basic;
      const lctitle = title.toLowerCase();
      if(lctitle.includes("rice") || lctitle.includes("pulao") || lctitle.includes("biryani")) instrArr = instrTemplates.rice;
      if(lctitle.includes("halwa") || lctitle.includes("kheer") || lctitle.includes("payasam")) instrArr = instrTemplates.sweets;
      if(lctitle.includes("dosa") || lctitle.includes("idli")) instrArr = instrTemplates.batter;

      const steps = pick(instrArr);

      RECIPES_LOCAL.push({
        id: uniqueId("local", counter),
        title: title,
        image: image,
        ingredients: Array.from(ingrSet),
        instructions: steps  // array of step strings
      });
    }
  }

  while(RECIPES_LOCAL.length < 650){
    const style = pick(styles);
    const vg = pick(veggies);
    counter++;
    const title = `${vg} ${style}`;
    const image = pick(placeholders);
    const ingr = [vg.toLowerCase(), "onion", "tomato", pick(["cumin","garam masala","turmeric","chili powder"])];
    const steps = pick(instrTemplates.basic);
    RECIPES_LOCAL.push({
      id: uniqueId("local_extra", counter),
      title: title,
      image: image,
      ingredients: ingr,
      instructions: steps
    });
  }

  global.RECIPES_LOCAL = RECIPES_LOCAL;

})(window);
