/**
 * skincare AI - Virtual AI Skincare Consultant
 * Interactive chatbot with modern Gemini Vision/Text API + intelligent context-aware fallback
 */

class SkincareChatbot {
  constructor(aiEngine) {
    this.aiEngine = aiEngine;
    this.history = [];
    this.currentDiagnosis = null;
    this.offlineFAQ = [
      {
        keywords: ["حاجز", "احمرار", "التهاب", "تحسس", "سيكابلاست"],
        reply: "لإصلاح الحاجز الجلدي المتضرر:\n1. أوقف جميع المقشرات والأحماض والريتينول مؤقتاً.\n2. استخدم غسولاً لطيفاً خالياً من الصابون والرغوة القاسية (مثل سيرافي المرطب).\n3. ركز على مرطبات غنية بالسيراميدات، البانثينول (فيتامين B5) مثل لاروش سيكابلاست Baume B5+.\n4. الالتزام اليومي بواقي الشمس لحماية الخلايا النامية من الأشعة فوق البنفسجية."
      },
      {
        keywords: ["ريتينول", "تجاعيد", "خطوط", "مبتدئ"],
        reply: "قواعد استخدام الريتينول للمبتدئين:\n1. ابدأ بتركيز منخفض (0.2% إلى 0.3%) ليلاً فقط.\n2. استخدم طريقة الساندوتش (مرطب خفيف، ثم كمية بحجم حبة البازلاء من الريتينول، ثم طبقة مرطب أخرى) لتقليل التهيج.\n3. ابدأ مرتين بالأسبوع لمدة شهر، ثم تدرج إلى 3 مرات.\n4. واقي الشمس في الصباح إلزامي دون استثناء!"
      },
      {
        keywords: ["حبوب", "بثور", "ساليسيليك", "مسام", "رؤوس سوداء"],
        reply: "لعلاج الحبوب والمسام الواسعة:\n1. حمض الساليسيليك (BHA 2%) هو الخيار الأول لأنه يذوب في الدهون وينظف أعماق المسام.\n2. سيروم النياسيناميد 5-10% ينظم إفراز الدهون ويخفف آثار البقع.\n3. تجنب فقع البثور لتفادي التصبغات والندبات الدائمة.\n4. استمر 4-8 أسابيع لملاحظة النتائج الحقيقية."
      },
      {
        keywords: ["شمس", "واقي", "spf", "داخل المنزل"],
        reply: "واقي الشمس هو الخطوة رقم 1 لمكافحة شيخوخة البشرة والتصبغات:\n• أشعة UVA تخترق زجاج النوافذ وتسبب تلف الكولاجين حتى داخل المنزل، لذا يُنصح بوضعه نهاراً.\n• الكمية المناسبة للوجه والرقبة هي مقدار إصبعين كاملين.\n• التجديد كل ساعتين ضروري عند الخروج في الشمس المباشرة."
      },
      {
        keywords: ["تفتيح", "تصبغات", "كلف", "آثار", "فيتامين c", "أربوتين"],
        reply: "لعلاج التصبغات وتوحيد لون البشرة:\n1. استخدم فيتامين C صباحاً لحماية مضادة للأكسدة وتفتيح تدريجي.\n2. الألفا أربوتين (Alpha Arbutin) وحمض الترانيكساميك ممتازين لتقليل إنتاج الميلانين.\n3. تقشير أسبوعي خفيف بحمض اللاكتيك أو الجليكوليك.\n4. واقي الشمس عامل حاسم؛ بدون واقي شمس ستعود التصبغات مجدداً."
      },
      {
        keywords: ["نعم", "اي", "أجل", "طبعا", "اوكي", "تمام", "كيف", "نعم اريد", "بالتأكيد"],
        reply: "ممتاز! إليك الترتيب الصحيح لدمج المنتجات:\n☀️ في الصباح: 1. غسول لطيف > 2. سيروم فيتامين C أو نياسيناميد > 3. مرطب خفيف > 4. واقي شمس SPF 50+.\n🌙 في المساء: 1. غسول > 2. المقشر (مرتين أسبوعياً) أو الريتينول > 3. كريم مرطب مرمم للحاجز.\nهل لديك منتج معين في بالك تريد معرفة أين تضعه في هذا الترتيب؟"
      }
    ];
  }

  setDiagnosis(diagnosis) {
    this.currentDiagnosis = diagnosis;
  }

  /**
   * Send user message and get response
   */
  async sendMessage(userMessage) {
    this.history.push({ role: "user", content: userMessage });

    // Try Gemini API first
    if (this.aiEngine && this.aiEngine.hasApiKey()) {
      try {
        const reply = await this.askGemini(userMessage);
        this.history.push({ role: "assistant", content: reply });
        return reply;
      } catch (err) {
        console.warn("Chatbot Gemini API error, falling back to offline knowledge base:", err);
      }
    }

    // Offline Expert Response
    const offlineReply = this.getOfflineAnswer(userMessage);
    this.history.push({ role: "assistant", content: offlineReply });
    return offlineReply;
  }

  async askGemini(userMessage) {
    const apiKey = this.aiEngine.getApiKey();
    const modelsToTry = [
      this.aiEngine.selectedModel || "gemini-3.8-flash",
      "gemini-3.8-flash",
      "gemini-flash-latest",
      "gemini-3.5-flash"
    ];

    let diagnosisContext = "";
    if (this.currentDiagnosis) {
      diagnosisContext = `
معلومات تشخيص المستخدم الحالي من الفحص:
- نوع البشرة: ${this.currentDiagnosis.skinTypeAr || this.currentDiagnosis.skinType}
- مؤشر الصحة العام: ${this.currentDiagnosis.overallScore}/100
- المشاكل المكتشفة: ${this.currentDiagnosis.concerns?.join(", ") || "لا توجد"}
- المكونات الموصى بها: ${this.currentDiagnosis.recommendedActives?.join(", ") || "ترطيب وحماية"}
`;
    }

    const systemPrompt = `أنت دكتور واستشاري جلدي وتجميلي ذكي وخبير في العناية بالبشرة (skincare AI Dermatologist).
تحدث بلغة عربية لطيفة ومهنية، وقدم إرشادات علمية دقيقة وخطوات عملية واضحة.
${diagnosisContext}
إذا كان المستخدم يوافق أو يسأل كيف يدمج المنتجات أو يسأل عن خطوات معينة، اشرح له الترتيب العلمي بدقة واقترح عليه المكونات المناسبة.`;

    // Multi-turn chat contents
    const contents = [];
    const recent = this.history.slice(-8); // Keep conversation context
    
    recent.forEach((item, index) => {
      let txt = item.content;
      // Prepend system prompt to the first user message
      if (index === 0 && item.role === "user") {
        txt = `${systemPrompt}\n\nسؤال المستخدم: ${txt}`;
      }
      contents.push({
        role: item.role === "user" ? "user" : "model",
        parts: [{ text: txt }]
      });
    });

    let lastError = null;

    for (const model of modelsToTry) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.5,
              maxOutputTokens: 800
            }
          })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error?.message || `HTTP ${res.status}`);
        }

        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text.trim();
      } catch (e) {
        console.warn(`Chat model ${model} failed:`, e);
        lastError = e;
      }
    }

    throw lastError || new Error("All chat models failed");
  }

  getOfflineAnswer(userMessage) {
    const clean = userMessage.trim().toLowerCase();

    for (const item of this.offlineFAQ) {
      if (item.keywords.some(k => clean.includes(k) || clean === k)) {
        return item.reply;
      }
    }

    // Contextual fallback based on current diagnosis
    if (this.currentDiagnosis) {
      return `بناءً على تشخيص بشرتك (${this.currentDiagnosis.skinTypeAr || 'المتوازنة'}): الخطوة الأهم هي حماية الحاجز الجلدي واستخدام ${this.currentDiagnosis.recommendedActives?.[0] || 'الترطيب'} نهاراً مع واقي شمس. يمكنك سؤالي عن طريقة استخدام أي سيروم أو كريم محدد!`;
    }

    return "للحصول على أفضل نتيجة، احرص على القواعد الذهبية: تنظيف لطيف مرتين يومياً، ترطيب مناسب لنوع بشرتك، وواقي شمس واسع النطاق SPF 50+. هل تود استفساراً عن مكون معين مثل الريتينول، النياسيناميد، أو أحماض التقشير؟";
  }
}

if (typeof window !== "undefined") {
  window.SkincareChatbot = SkincareChatbot;
}
