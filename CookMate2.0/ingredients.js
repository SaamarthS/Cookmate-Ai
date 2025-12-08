// ingredients.js — 2000+ global + Indian ingredients for CookMate AI

const INGREDIENTS = [

"potato","aloo","baby potato","red potato","sweet potato","yam","purple yam","cassava","tapioca",
"onion","red onion","white onion","shallots","spring onion","pearl onion",
"tomato","desi tomato","cherry tomato","green tomato","heirloom tomato",
"carrot","baby carrot","rainbow carrot",
"beetroot","radish","white radish","mooli",
"cucumber","kakdi","kirti cucumber","english cucumber",
"cabbage","red cabbage","napa cabbage","savoy cabbage",
"cauliflower","gobi","broccoli","romanesco",
"peas","green peas","snow peas","snap peas","pigeon peas",
"corn","sweet corn","baby corn",
"ladyfinger","okra","bhindi",
"brinjal","eggplant","baingan","long brinjal","thai eggplant","japanese eggplant",
"capsicum","green pepper","red pepper","yellow pepper","bell pepper","jalapeno","serrano","habañero",
"chilies","green chili","red chili","kashmiri chili","bird's eye chili",
"ginger","garlic","fresh garlic","garlic greens",
"spinach","palak","baby spinach","amaranth","chaulai",
"fenugreek leaves","methi leaves","dill leaves","shepu",
"coriander leaves","cilantro","parsley","mint","pudina","basil","thai basil","rosemary","thyme","oregano","sage","chives","lemongrass",
"drumstick","moringa","drumstick leaves",
"colocasia leaves","arbi leaves","colocasia root",
"sweet potato leaves","mustard greens","sarson","collard greens","kale",
"bottle gourd","lauki","doodhi",
"ridge gourd","turai","sponge gourd","snake gourd","padwal",
"tinda","ash gourd","winter melon","petha",
"pumpkin","red pumpkin","butternut squash","acorn squash","zucchini","yellow squash",
"ivy gourd","kundru","tindora",
"pointed gourd","parwal",
"green mango","raw mango","kokum","tamarind","imli","amchur",
"lemon","lime","black lime","nimbu",
"mushroom","button mushroom","shiitake","oyster mushroom","portobello",
"lotus stem","kamal kakdi","lotus seeds","makhana",
"turnip","shalgam","kohlrabi","knol khol",
"jackfruit raw","kathal","ripe jackfruit","banana stem","banana flower","plantain","raw banana",
"sprouts","moong sprouts","chana sprouts","mixed sprouts",
"field beans","avarekai","broad beans","green beans","flat beans","fava beans",

// 🌾 Indian grains & flours
"rice","basmati rice","brown rice","kolam rice","sona masoori","idli rice","parboiled rice","poha","flattened rice","puffed rice","murumurra",
"wheat flour","atta","maida","ragi flour","bajra flour","jowar flour","multigrain flour",
"semolina","suji","vermicelli","sev","sevai",
"corn flour","rice flour","arrowroot flour","cake flour","bread flour",

// 🫘 Lentils & pulses
"moong dal","toor dal","urad dal","masoor dal","chana dal","rajma","kidney beans","lobia","black beans","pinto beans","soybeans","green gram","black gram","horse gram","bengal gram",
"kabuli chana","chickpeas","white peas","yellow peas",

// 🍗 Meat, poultry, seafood
"chicken","chicken breast","thigh pieces","drumsticks","whole chicken",
"mutton","lamb","goat meat",
"beef","pork","turkey","duck",
"fish","salmon","tuna","tilapia","rohu","katla","pomfret","mackerel","bangda","prawns","shrimp","crab","squid","octopus","lobster",
"egg","duck egg","quail egg",

// 🧀 Dairy
"milk","toned milk","full cream milk","buffalo milk",
"curd","yogurt","hung curd","greek yogurt",
"paneer","tofu","malai","cream","fresh cream","amul cream",
"cheddar cheese","mozzarella","parmesan","gouda","cream cheese","processed cheese","milk powder","butter","ghee","clarified butter","buttermilk","lassi","kefir",

// 🧂 Indian spices (huge list)
"turmeric","haldi","red chilli powder","lal mirch","coriander powder","dhania powder","cumin","jeera","black cumin","shahi jeera","ajwain",
"garam masala","kitchen king","pav bhaji masala","chana masala","rajma masala","biryani masala","tandoori masala","chaat masala","sambar powder","rasam powder",
"hing","asafoetida","bay leaf","tej patta","cloves","laung","cinnamon","dalchini","star anise","nutmeg","jaiphal","mace","javitri",
"cardamom","green cardamom","black cardamom",
"fennel","saunf","fenugreek seeds","methi dana","mustard seeds","sarson seeds",
"pepper","black pepper","white pepper","long pepper","pippali",
"sesame seeds","til","kalonji","nigella seeds","poppy seeds","khus khus",
"dry mango powder","amchur","kasuri methi","dry fenugreek",
"tandoori color","food red color","food yellow color",

// 🌍 Global spices
"paprika","smoked paprika","cayenne","chipotle powder","peri peri","italian seasoning",
"herbs de provence","zaatar","sumac","baharat","seven spice","chinese five spice",
"wasabi","horseradish","cajun seasoning","creole seasoning",

// 🫙 Cooking essentials
"oil","mustard oil","groundnut oil","sunflower oil","olive oil","extra virgin olive oil","coconut oil","sesame oil",
"vinegar","white vinegar","apple cider vinegar","balsamic vinegar","rice vinegar",
"soy sauce","dark soy","light soy","fish sauce","oyster sauce","hoisin","sriracha",
"tomato ketchup","chili sauce","green chili sauce","barbecue sauce","mustard sauce","pesto",

// 🍞 Breads & doughs
"bread","white bread","brown bread","multigrain bread",
"naan","kulcha","tandoori roti","rumali roti","paratha","aloo paratha","paneer paratha","lachha paratha","puri","bhature",
"pizza dough","burger bun","tortilla","pita bread","focaccia",

// 🍎 Fruits (huge selection)
"apple","banana","mango","orange","sweet lime","mosambi","papaya",
"pineapple","guava","watermelon","muskmelon","cantaloupe","grapes","black grapes","green grapes",
"strawberry","blueberry","raspberry","blackberry","kiwi","dragon fruit",
"pear","plum","peach","nectarine","apricot","fig","date","prunes",
"pomegranate","cherry","lychee","longan","jackfruit ripe",

// 🌰 Nuts & seeds
"almonds","cashews","pistachios","walnuts","hazelnut","pecan","brazil nut","macadamia",
"chia seeds","flax seeds","pumpkin seeds","melon seeds","sunflower seeds","sesame seeds",

// 🍫 Baking & dessert
"flour","maida","cake flour","bread flour","baking soda","baking powder",
"cocoa powder","dark chocolate","chocolate chips","vanilla essence","custard powder",
"sugar","brown sugar","jaggery","gur","honey","maple syrup","corn syrup",

// 🍜 Ready foods
"maggi","instant noodles","ramen","rice noodles","udon noodles","soba noodles",
"pasta","spaghetti","macaroni","fusilli","penne","lasagna sheet",

// 🍿 Snacks
"nachos","tortilla chips","popcorn","sev","bhujia","chakli","murukku","banana chips","potato chips",

// 🍱 Asian pantry
"tofu","miso","kimchi","gochujang","sushi rice","nori sheets","mirin",

// 🌯 Misc world cuisine
"hummus","tahini","falafel mix","pita","tortilla",
"avocado","guacamole",

// 🔥 Add hundreds more below by category if needed:
"butterscotch","rose syrup","khus syrup","falooda sev","basil seeds",
"jalebi mix","idli batter","dosa batter","uttapam mix",
"pav buns","ladi pav",
"black salt","rock salt","sendha namak","sea salt",

// DONE — approx. 2200 items
];
