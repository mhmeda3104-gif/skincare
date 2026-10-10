/**
 * AskinI - Clinical Skincare & Products Knowledge Base
 * Database of dermatologically recognized skincare products, ingredients, and routine logic.
 */

const SKIN_PRODUCTS_DB = [
  // ==================== CLEANSER (الغسول) ====================
  {
    id: "cleanser-cerave-foaming",
    category: "cleanser",
    step: "cleanse",
    name: "CeraVe Foaming Facial Cleanser",
    brand: "CeraVe",
    nameAr: "غسول سيرافي الرغوي للبشرة الدهنية والمختلطة",
    suitableSkinTypes: ["oily", "combination"],
    targetedConcerns: ["acne", "pores", "sebum"],
    keyIngredients: ["Ceramides 1, 3, 6-II", "Niacinamide", "Hyaluronic Acid"],
    keyIngredientsAr: ["سيراميدات أساسية", "نياسيناميد", "حمض الهيالورونيك"],
    benefitAr: "ينظف المسام بعمق ويزيل الزيوت الزائدة دون الإخلال بالحاجز الواقي للبشرة.",
    benefitEn: "Deeply cleanses and removes excess oil without disrupting the protective skin barrier.",
    howToUseAr: "يستخدم صباحاً ومساءً على بشرة رطبة، يدلك بلطف بحركات دائرية لمدة 60 ثانية ثم يشطف بالماء الفاتر.",
    howToUseEn: "Use AM & PM on wet skin, massage gently for 60 seconds and rinse with lukewarm water.",
    warningsAr: "تجنب ملامسة محيط العينين مباشرة.",
    warningsEn: "Avoid direct contact with immediate eye area.",
    priceTier: "budget", // budget ($), moderate ($$), premium ($$$)
    isFragranceFree: true,
    isNonComedogenic: true,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "cleanser-cerave-hydrating",
    category: "cleanser",
    step: "cleanse",
    name: "CeraVe Hydrating Cleanser",
    brand: "CeraVe",
    nameAr: "غسول سيرافي المرطب للبشرة الجافة والعادية",
    suitableSkinTypes: ["dry", "normal", "sensitive"],
    targetedConcerns: ["hydration", "redness", "sensitivity"],
    keyIngredients: ["Ceramides", "Hyaluronic Acid", "MVE Delivery Tech"],
    keyIngredientsAr: ["سيراميدات", "حمض الهيالورونيك", "تقنية إطلاق الترطيب المستمر"],
    benefitAr: "غسول لوشن كريمي غير رغوي يرطب البشرة ويهدئ التحسس ويقوي الحاجز الطبيعي.",
    benefitEn: "Non-foaming lotion cleanser that hydrates, calms irritation and reinforces the natural barrier.",
    howToUseAr: "يدلك على بشرة مبللة صباحاً ومساءً ويشطف بلطف.",
    howToUseEn: "Massage onto wet skin morning and night, rinse gently.",
    warningsAr: "لطيف جداً ومناسب حتى للأكزيما والبشرة شديدة التحسس.",
    warningsEn: "Safe for eczema-prone and highly reactive skin.",
    priceTier: "budget",
    isFragranceFree: true,
    isNonComedogenic: true,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "cleanser-laroche-effaclar",
    category: "cleanser",
    step: "cleanse",
    name: "La Roche-Posay Effaclar Purifying Foaming Gel",
    brand: "La Roche-Posay",
    nameAr: "جل إيفاكلار المنقي للبشرة المعرضة للحبوب",
    suitableSkinTypes: ["oily", "acne_prone", "combination"],
    targetedConcerns: ["acne", "sebum", "pores"],
    keyIngredients: ["Zinc PCA", "Thermal Spring Water"],
    keyIngredientsAr: ["زنك PCA منظم للإفرازات", "مياه لاروش بوزيه الحرارية المهدئة"],
    benefitAr: "ينقي البشرة ويقلل لمعان الدهون والحبوب بفضل أملاح الزنك المطهرة.",
    benefitEn: "Purifies oily skin and visibly reduces shine and blemishes with sebum-regulating Zinc PCA.",
    howToUseAr: "يوضع مقدار ضخة على اليدين مع قليل من الماء لعمل رغوة، ثم يغسل به الوجه.",
    howToUseEn: "Lather with water in hands, apply to face, gently cleanse and rinse.",
    warningsAr: "إذا شعرت بجفاف شديد، قلل الاستخدام لمرة واحدة يومياً.",
    warningsEn: "If dryness occurs, reduce use to once daily.",
    priceTier: "moderate",
    isFragranceFree: false,
    isNonComedogenic: true,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=80"
  },

  // ==================== TONER & EXFOLIANT (التونر والمقشرات) ====================
  {
    id: "toner-paulas-choice-bha",
    category: "exfoliant",
    step: "treatment",
    name: "Paula's Choice 2% BHA Liquid Exfoliant",
    brand: "Paula's Choice",
    nameAr: "مقشر بولاز تشويس السائل بحمض الساليسيليك 2%",
    suitableSkinTypes: ["oily", "combination", "normal"],
    targetedConcerns: ["acne", "pores", "texture", "blackheads"],
    keyIngredients: ["2% Salicylic Acid (BHA)", "Green Tea Extract"],
    keyIngredientsAr: ["حمض الساليسيليك 2%", "مستخلص الشاي الأخضر المضاد للأكسدة"],
    benefitAr: "يقشر داخل المسام ويزيل الرؤوس السوداء والجلد الميت وينعم ملمس البشرة سريعاً.",
    benefitEn: "Penetrates inside pores to dissolve sebum, eliminate blackheads, and smooth skin texture.",
    howToUseAr: "يطبق مساءً بعد الغسول بواسطة قطنة أو بالأصابع، مرتين إلى 3 مرات أسبوعياً. لا يشطف.",
    howToUseEn: "Apply PM with cotton pad or fingers, 2-3 nights per week. Do not rinse off.",
    warningsAr: "ضرورة استخدام واقي شمس صباحاً. تجنب استخدامه في نفس الليلة مع الريتينول.",
    warningsEn: "Must wear daily SPF. Avoid combining in same routine with high strength retinol.",
    priceTier: "premium",
    isFragranceFree: true,
    isNonComedogenic: true,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1608248597359-21669a84d001?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "toner-cosrx-propolis",
    category: "toner",
    step: "prep",
    name: "COSRX Full Fit Propolis Synergy Toner",
    brand: "COSRX",
    nameAr: "تونر العكبر المغذي والمرطب من كوسركس",
    suitableSkinTypes: ["dry", "normal", "sensitive", "combination"],
    targetedConcerns: ["hydration", "dullness", "redness"],
    keyIngredients: ["72.6% Black Bee Propolis", "10% Honey Extract"],
    keyIngredientsAr: ["خلاصة عكبر النحل 72.6%", "مستخلص العسل الطبيعي"],
    benefitAr: "يمنح البشرة توهجاً صحياً (Glass Skin)، ويهدئ الالتهابات ويرطب بعمق.",
    benefitEn: "Delivers deep hydration, anti-inflammatory calm, and glowing supple skin.",
    howToUseAr: "يوضع بضع قطرات على راحة اليد ويطبطب به بلطف على الوجه والرقبة بعد الغسول.",
    howToUseEn: "Pat gently onto face and neck right after cleansing.",
    warningsAr: "تحقق من حساسية منتجات العسل قبل الاستخدام.",
    warningsEn: "Patch test if you have known bee product allergies.",
    priceTier: "moderate",
    isFragranceFree: true,
    isNonComedogenic: true,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1608248597359-21669a84d001?w=300&auto=format&fit=crop&q=80"
  },

  // ==================== SERUMS & ACTIVES (السيرومات والمواد الفعالة) ====================
  {
    id: "serum-ordinary-niacinamide",
    category: "serum",
    step: "treatment",
    name: "The Ordinary Niacinamide 10% + Zinc 1%",
    brand: "The Ordinary",
    nameAr: "سيروم ذا أورديناري نياسيناميد 10% مع الزنك 1%",
    suitableSkinTypes: ["oily", "combination", "acne_prone"],
    targetedConcerns: ["sebum", "pores", "acne", "pigmentation"],
    keyIngredients: ["10% Niacinamide (Vitamin B3)", "1% Zinc PCA"],
    keyIngredientsAr: ["نياسيناميد 10%", "زنك PCA 1%"],
    benefitAr: "يضبط الإفرازات الدهنية، يقلص مظهر المسام الواسعة ويوحد لون البشرة.",
    benefitEn: "Controls sebum production, refines pores, and improves uneven skin tone and blemishes.",
    howToUseAr: "ضع 2-3 قطرات على كامل الوجه صباحاً ومساءً قبل الكريمات الثقيلة.",
    howToUseEn: "Apply 2-3 drops all over face AM and PM before heavier moisturizers.",
    warningsAr: "إذا حدث تحسس أو احمرار، قلل الكمية أو استخدمه مرة واحدة يومياً.",
    warningsEn: "If stinging occurs, reduce frequency or buffer with moisturizer.",
    priceTier: "budget",
    isFragranceFree: true,
    isNonComedogenic: true,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "serum-ordinary-hyaluronic",
    category: "serum",
    step: "treatment",
    name: "The Ordinary Hyaluronic Acid 2% + B5",
    brand: "The Ordinary",
    nameAr: "سيروم حمض الهيالورونيك 2% مع فيتامين B5",
    suitableSkinTypes: ["dry", "normal", "sensitive", "combination", "oily"],
    targetedConcerns: ["hydration", "texture", "fine_lines"],
    keyIngredients: ["Multi-molecular Hyaluronic Acid", "Vitamin B5 (Panthenol)"],
    keyIngredientsAr: ["حمض هيالورونيك متعدد الأوزان الجزيئية", "فيتامين B5 المرمم"],
    benefitAr: "يجذب الرطوبة في طبقات الجلد المتعددة لمنح مظهر ممتلئ وناعم ومرن.",
    benefitEn: "Multi-depth hydration formula for plump, supple, and deeply hydrated skin.",
    howToUseAr: "يطبق على بشرة رطبة قليلاً بالماء، ثم يتبع فوراً بكريم مرطب لحبس الماء داخل الجلد.",
    howToUseEn: "Apply to slightly damp skin, then lock in immediately with moisturizer.",
    warningsAr: "لا يوضع على بشرة جافة تماماً في جو جاف حتى لا يسحب الرطوبة من داخل الجلد.",
    warningsEn: "Always apply on damp skin to prevent trans-epidermal moisture loss.",
    priceTier: "budget",
    isFragranceFree: true,
    isNonComedogenic: true,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "serum-beauty-joseon-glow-deep",
    category: "serum",
    step: "treatment",
    name: "Beauty of Joseon Glow Deep Serum: Rice + Arbutin",
    brand: "Beauty of Joseon",
    nameAr: "سيروم بيوتي أوف جوسون لتفتيح وتوحيد التصبغات (الأرز والأربوتين)",
    suitableSkinTypes: ["dry", "combination", "normal", "sensitive"],
    targetedConcerns: ["pigmentation", "dark_spots", "dullness"],
    keyIngredients: ["68% Rice Bran Water", "2% Alpha-Arbutin"],
    keyIngredientsAr: ["ماء نخالة الأرز 68%", "ألفا أربوتين 2% المثبط للتصبغات"],
    benefitAr: "يفتح البقع الداكنة وآثار الحبوب ويوحد لون البشرة بلطف بدون تهييج.",
    benefitEn: "Fades hyperpigmentation, acne marks, and enhances natural radiant glow gently.",
    howToUseAr: "ضع 2-3 قطرات صباحاً ومساءً على كامل الوجه مع الطبطبة اللطيفة.",
    howToUseEn: "Apply 2-3 drops AM & PM, gently patting into skin.",
    warningsAr: "يجب الالتزام بواقي الشمس للحفاظ على نتائج التفتيح.",
    warningsEn: "Consistent sunscreen application is required for lasting results.",
    priceTier: "moderate",
    isFragranceFree: true,
    isNonComedogenic: true,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "serum-cerave-retinol",
    category: "retinoid",
    step: "night_treatment",
    name: "CeraVe Resurfacing Retinol Serum",
    brand: "CeraVe",
    nameAr: "سيروم سيرافي بالريتينول المغلف لتجديد خلايا البشرة والمسام",
    suitableSkinTypes: ["oily", "combination", "normal", "aging"],
    targetedConcerns: ["wrinkles", "texture", "pigmentation", "pores"],
    keyIngredients: ["Encapsulated Retinol", "Licorice Root Extract", "3 Essential Ceramides"],
    keyIngredientsAr: ["ريتينول مغلف بطيء الإطلاق", "مستخلص عرق السوس", "سيراميدات"],
    benefitAr: "يحفز تجديد الكولاجين، يخفف الخطوط الدقيقة وآثار حب الشباب وينعم المسام بلطف فائق.",
    benefitEn: "Stimulates cellular turnover, smooths fine lines, diminishes post-acne marks and minimizes pores.",
    howToUseAr: "مساءً فقط. ابدأ بمرتين أسبوعياً ثم تدرج. ضع كمية بحجم حبة البازلاء على بشرة جافة.",
    howToUseEn: "PM only. Start 2 nights per week. Apply pea-sized amount to completely dry skin.",
    warningsAr: "غير مناسب للحوامل والمرضعات. يمنع نهاراً. ضرورة استخدام واقي الشمس يومياً.",
    warningsEn: "Not recommended during pregnancy/nursing. PM use only. Daily SPF is mandatory.",
    priceTier: "moderate",
    isFragranceFree: true,
    isNonComedogenic: true,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&auto=format&fit=crop&q=80"
  },

  // ==================== MOISTURIZERS (المرطبات) ====================
  {
    id: "moisturizer-laroche-cicaplast",
    category: "moisturizer",
    step: "moisturize",
    name: "La Roche-Posay Cicaplast Baume B5+",
    brand: "La Roche-Posay",
    nameAr: "بلسم لاروش بوزيه سيكابلاست B5+ المرمم للحاجز الجلدي",
    suitableSkinTypes: ["dry", "sensitive", "compromised"],
    targetedConcerns: ["redness", "sensitivity", "hydration", "barrier_damage"],
    keyIngredients: ["5% Panthenol (B5)", "Madecassoside (Centella)", "Tribioma Prebiotic"],
    keyIngredientsAr: ["بانثينول 5%", "ماديكاسوسايد (خلاصة السنتيللا)", "مركب تريبيوما المعزز للميكروبيوم"],
    benefitAr: "علاج إنقاذي مكثف يهدئ التهيج، يصلح الحاجز الجلدي المتضرر ويزيل الاحمرار فوراً.",
    benefitEn: "Intense soothing multi-purpose balm that repairs damaged skin barrier and eliminates irritation.",
    howToUseAr: "يطبق مرتين يومياً على المناطق الجافة والمتهيجة، أو كطبقة ختامية مسائية (Slugging خفيف).",
    howToUseEn: "Apply twice daily to irritated zones or as a soothing finishing barrier coat.",
    warningsAr: "قوامه غني ومكثف، لأصحاب البشرة شديدة الدهنية يفضل استخدامه موضعياً فقط.",
    warningsEn: "Rich texture; for very oily skin, spot-apply on compromised zones.",
    priceTier: "moderate",
    isFragranceFree: true,
    isNonComedogenic: false,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "moisturizer-neutrogena-hydro-boost",
    category: "moisturizer",
    step: "moisturize",
    name: "Neutrogena Hydro Boost Water Gel",
    brand: "Neutrogena",
    nameAr: "جل مائي مرطب نيتروجينا هايدرو بوست",
    suitableSkinTypes: ["oily", "combination", "normal"],
    targetedConcerns: ["hydration", "sebum"],
    keyIngredients: ["Hyaluronic Acid", "Amino Acids", "Electrolytes"],
    keyIngredientsAr: ["حمض الهيالورونيك", "أحماض أمينية", "شوارد مرطبة"],
    benefitAr: "ترطيب خفيف وفوري بتركيبة جل مائي خالية من الزيوت تمتصها البشرة في ثوانٍ.",
    benefitEn: "Ultra-lightweight oil-free water gel that absorbs in seconds and floods skin with hydration.",
    howToUseAr: "يوضع صباحاً ومساءً على الوجه والرقبة بعد السيروم.",
    howToUseEn: "Smooth over face and neck AM & PM after serums.",
    warningsAr: "اختر النسخة الخالية من العطور (Fragrance-Free) إذا كانت بشرتك حساسة.",
    warningsEn: "Opt for the fragrance-free version if you have reactive skin.",
    priceTier: "moderate",
    isFragranceFree: true,
    isNonComedogenic: true,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "moisturizer-cerave-pm",
    category: "moisturizer",
    step: "moisturize",
    name: "CeraVe PM Facial Moisturizing Lotion",
    brand: "CeraVe",
    nameAr: "لوشن سيرافي الليلي المرطب للوجه",
    suitableSkinTypes: ["combination", "oily", "normal", "sensitive"],
    targetedConcerns: ["hydration", "barrier_damage", "redness"],
    keyIngredients: ["Niacinamide", "3 Essential Ceramides", "Hyaluronic Acid"],
    keyIngredientsAr: ["نياسيناميد مهدئ ومفتح", "سيراميدات 1 و 3 و 6", "حمض الهيالورونيك"],
    benefitAr: "لوشن خفيف جداً يغذي حاجز البشرة طوال الليل دون إثقال المسام أو تسبيب لمعان.",
    benefitEn: "Lightweight nightly lotion that restores the protective barrier without clogging pores.",
    howToUseAr: "يوضع ليلاً كآخر خطوة قبل النوم على الوجه والرقبة.",
    howToUseEn: "Apply PM liberally to face and neck as the final routine step.",
    warningsAr: "ممتاز للاستخدام فوق المقشرات والسيرومات.",
    warningsEn: "Ideal for pairing over retinoids and exfoliating acids.",
    priceTier: "budget",
    isFragranceFree: true,
    isNonComedogenic: true,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&auto=format&fit=crop&q=80"
  },

  // ==================== SUNSCREENS (واقيات الشمس) ====================
  {
    id: "sunscreen-laroche-anthelios",
    category: "sunscreen",
    step: "protect",
    name: "La Roche-Posay Anthelios UVMune 400 Oil Control Fluid SPF50+",
    brand: "La Roche-Posay",
    nameAr: "فلود لاروش بوزيه أنثيليوس يو في ميون 400 للتحكم بالدهون SPF50+",
    suitableSkinTypes: ["oily", "combination", "acne_prone", "sensitive"],
    targetedConcerns: ["sun_protection", "sebum", "pigmentation"],
    keyIngredients: ["Mexoryl 400 (Ultra-long UVA filter)", "Airlicium Technology"],
    keyIngredientsAr: ["فلتر ميكسوريل 400 فائق الحماية من أعمق أشعة UVA", "جزيئات إيرليسيوم الماصة للدهون"],
    benefitAr: "حماية طبية قصوى لا تترك أثراً أبيض، مع تأثير مطفئ للمعان يدوم حتى 12 ساعة.",
    benefitEn: "Maximum medical UV defense against ultra-long UVA rays with invisible 12h matte finish.",
    howToUseAr: "يرج جيداً قبل الاستخدام، يوضع مقدار إصبعين على الوجه والرقبة قبل الخروج بـ 15 دقيقة.",
    howToUseEn: "Shake well, apply two finger lengths generously 15 mins before sun exposure.",
    warningsAr: "يعاد تطبيقه كل ساعتين عند التعرض المباشر للشمس أو بعد السباحة والتعرق.",
    warningsEn: "Reapply every 2 hours during direct sun exposure or after swimming/sweating.",
    priceTier: "moderate",
    isFragranceFree: true,
    isNonComedogenic: true,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "sunscreen-beauty-joseon-relief",
    category: "sunscreen",
    step: "protect",
    name: "Beauty of Joseon Relief Sun: Rice + Probiotics SPF50+ PA++++",
    brand: "Beauty of Joseon",
    nameAr: "واقي شمس بيوتي أوف جوسون بخلاصة الأرز والبروبيوتيك SPF50+",
    suitableSkinTypes: ["dry", "normal", "combination", "sensitive"],
    targetedConcerns: ["sun_protection", "hydration", "dullness"],
    keyIngredients: ["30% Rice Extract", "Fermented Grain Probiotics"],
    keyIngredientsAr: ["مستخلص الأرز المغذي 30%", "بروبيوتيك الحبوب المخمرة"],
    benefitAr: "واقي شمس كوري كلاسيكي بملمس كريم مرطب خفيف لا يترك بياضاً ويمنح نضارة طبيعية ساحرة.",
    benefitEn: "Cult-favorite organic sunscreen with comfortable moisturizing cream texture and no white cast.",
    howToUseAr: "يطبق صباحاً كآخر خطوة في الروتين قبل المكياج.",
    howToUseEn: "Apply generously in the morning as the final skincare step.",
    warningsAr: "مناسب للبشرة التي تبحث عن ترطيب إضافي ومظهر ديوي صحي.",
    warningsEn: "Great for skin wanting extra hydration and a radiant dewy finish.",
    priceTier: "moderate",
    isFragranceFree: true,
    isNonComedogenic: true,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&auto=format&fit=crop&q=80"
  }
];

// ==================== INGREDIENTS KNOWLEDGE BASE ====================
const INGREDIENTS_DICT = {
  "salicylic acid": {
    nameAr: "حمض الساليسيليك (BHA)",
    category: "حمض مقشر ومنظف مسام",
    comedogenic: 0,
    irritancy: 2,
    benefitAr: "حمض محب للدهون يخترق عمق المسام لإذابة الزهم وعلاج الحبوب والرؤوس السوداء.",
    bestFor: ["oily", "acne_prone", "combination"]
  },
  "niacinamide": {
    nameAr: "نياسيناميد (فيتامين B3)",
    category: "مهدئ ومضاد التهاب وموحد للون",
    comedogenic: 0,
    irritancy: 1,
    benefitAr: "ينظم إفراز الدهون، يقلص مظهر المسام، يدعم حاجز البشرة ويفتح آثار التصبغات.",
    bestFor: ["all", "oily", "sensitive", "pigmentation"]
  },
  "hyaluronic acid": {
    nameAr: "حمض الهيالورونيك",
    category: "مرطب وجاذب للماء (Humectant)",
    comedogenic: 0,
    irritancy: 0,
    benefitAr: "يحتفظ بما يصل إلى 1000 ضعف وزنه من الماء لترطيب وتعبئة طبقات الجلد.",
    bestFor: ["dry", "dehydrated", "all"]
  },
  "retinol": {
    nameAr: "الريتينول (مشتق فيتامين A)",
    category: "مجدد خلايا ومحفز كولاجين",
    comedogenic: 0,
    irritancy: 3,
    benefitAr: "المعيار الذهبي لمقاومة التجاعيد، تحفيز الكولاجين، تجديد الخلايا وصقل ملمس البشرة.",
    bestFor: ["aging", "wrinkles", "texture", "acne"]
  },
  "ceramides": {
    nameAr: "السيراميدات",
    category: "دهون دهنية داعمة للحاجز الجلدي",
    comedogenic: 0,
    irritancy: 0,
    benefitAr: "اللبنات الأساسية التي تحمي حاجز الجلد وتمنع فقدان الماء والجفاف والتحسس.",
    bestFor: ["dry", "sensitive", "compromised"]
  },
  "centella asiatica": {
    nameAr: "سينتيلا اسياتيكا (سيكا)",
    category: "مهدئ عشبي ومضاد للالتهاب",
    comedogenic: 0,
    irritancy: 0,
    benefitAr: "تهدئ الاحمرار الشديد، تسرع التئام الجروح وتدعم مناعة الجلد.",
    bestFor: ["sensitive", "redness", "acne_prone"]
  },
  "vitamin c": {
    nameAr: "فيتامين C (حمض الأسكوربيك)",
    category: "مضاد أكسدة قوي ومفتح",
    comedogenic: 0,
    irritancy: 2,
    benefitAr: "يحمي من التلف البيئي وأشعة الشمس، يوحد لون البشرة ويمنح نضارة فائقة.",
    bestFor: ["dullness", "pigmentation", "aging"]
  },
  "benzoyl peroxide": {
    nameAr: "بنزويل بيروكسيد",
    category: "مضاد بكتيريا الحبوب",
    comedogenic: 0,
    irritancy: 3,
    benefitAr: "يقضي على بكتيريا حب الشباب بسرعة ويخفف البثور الملتهبة.",
    bestFor: ["acne_prone"]
  },
  "isopropyl myristate": {
    nameAr: "أيزوبروبيل ميريستات",
    category: "مادة منعمة ومستحلبة",
    comedogenic: 5,
    irritancy: 3,
    benefitAr: "مادة تسد المسام بشكل عالي وقد تسبب ظهور الرؤوس البيضاء والحبوب.",
    bestFor: []
  },
  "coconut oil": {
    nameAr: "زيت جوز الهند (Cocos Nucifera)",
    category: "زيت طبيعي مرطب",
    comedogenic: 4,
    irritancy: 1,
    benefitAr: "مرطب غني جداً للجسم، لكنه يسد مسام الوجه لدى معظم أصحاب البشرة الدهنية والمختلطة.",
    bestFor: ["dry_body"]
  },
  "fragrance": {
    nameAr: "العطور الاصطناعية (Parfum)",
    category: "مادة معطرة",
    comedogenic: 0,
    irritancy: 4,
    benefitAr: "تضيف رائحة للمنتج لكنها تعتبر المسبب الأول لحساسية الجلد والتهيج.",
    bestFor: []
  },
  "alcohol denat": {
    nameAr: "الكحول المجفف (Denatured Alcohol)",
    category: "مذيب وقابض",
    comedogenic: 0,
    irritancy: 4,
    benefitAr: "يجفف الدهون مؤقتاً لكن قد يضر بالحاجز الجلدي ويسبب جفافاً ارتدادياً وتحسساً.",
    bestFor: []
  }
];

// Helper to recommend products tailored to user's diagnosis
function getRecommendedProducts(diagnosis) {
  const skinType = diagnosis.skinType || "normal";
  const concerns = diagnosis.concerns || [];
  
  // Morning Routine
  const amCleanser = SKIN_PRODUCTS_DB.find(p => p.category === "cleanser" && p.suitableSkinTypes.includes(skinType)) 
    || SKIN_PRODUCTS_DB[0];
    
  let amSerum = SKIN_PRODUCTS_DB.find(p => p.category === "serum" && (
    (skinType === "oily" && p.id.includes("niacinamide")) ||
    (skinType === "dry" && p.id.includes("hyaluronic")) ||
    (concerns.includes("pigmentation") && p.id.includes("glow-deep"))
  )) || SKIN_PRODUCTS_DB.find(p => p.category === "serum");

  const amMoisturizer = SKIN_PRODUCTS_DB.find(p => p.category === "moisturizer" && p.suitableSkinTypes.includes(skinType))
    || SKIN_PRODUCTS_DB[9];

  const amSunscreen = SKIN_PRODUCTS_DB.find(p => p.category === "sunscreen" && p.suitableSkinTypes.includes(skinType))
    || SKIN_PRODUCTS_DB[11];

  // Evening Routine
  const pmCleanser = amCleanser;
  
  let pmTreatment = null;
  if (concerns.includes("acne") || concerns.includes("pores")) {
    pmTreatment = SKIN_PRODUCTS_DB.find(p => p.id === "toner-paulas-choice-bha");
  } else if (concerns.includes("wrinkles") || diagnosis.skinAge > 28) {
    pmTreatment = SKIN_PRODUCTS_DB.find(p => p.id === "serum-cerave-retinol");
  } else if (concerns.includes("redness") || diagnosis.metrics?.redness > 60) {
    pmTreatment = SKIN_PRODUCTS_DB.find(p => p.id === "moisturizer-laroche-cicaplast");
  } else {
    pmTreatment = SKIN_PRODUCTS_DB.find(p => p.id === "serum-beauty-joseon-glow-deep");
  }

  const pmMoisturizer = (skinType === "dry" || diagnosis.metrics?.hydration < 45)
    ? SKIN_PRODUCTS_DB.find(p => p.id === "moisturizer-laroche-cicaplast")
    : SKIN_PRODUCTS_DB.find(p => p.id === "moisturizer-cerave-pm");

  return {
    morning: [
      { stepAr: "1. الغسول (Cleanser)", stepEn: "1. Cleanse", product: amCleanser },
      { stepAr: "2. السيروم العلاجي (Serum)", stepEn: "2. Target Serum", product: amSerum },
      { stepAr: "3. المرطب (Moisturizer)", stepEn: "3. Hydrate", product: amMoisturizer },
      { stepAr: "4. الحماية من الشمس (Sunscreen)", stepEn: "4. UV Protect", product: amSunscreen }
    ],
    evening: [
      { stepAr: "1. التنظيف (Cleanse)", stepEn: "1. Cleanse", product: pmCleanser },
      { stepAr: "2. العلاج المركز (Treatment)", stepEn: "2. Active Treatment", product: pmTreatment },
      { stepAr: "3. الترميم الليلي (Night Repair)", stepEn: "3. Night Repair", product: pmMoisturizer }
    ]
  };
}

if (typeof window !== "undefined") {
  window.SKIN_PRODUCTS_DB = SKIN_PRODUCTS_DB;
  window.INGREDIENTS_DICT = INGREDIENTS_DICT;
  window.getRecommendedProducts = getRecommendedProducts;
}
