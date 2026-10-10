/**
 * AskinI - Main Application Controller
 * Handles UI coordination, state management, charts, and events
 */

document.addEventListener("DOMContentLoaded", () => {
  // Instances
  const aiEngine = new SkinAIEngine();
  const chatbot = new SkincareChatbot(aiEngine);
  const ingredientChecker = new IngredientChecker();

  // Elements
  const videoEl = document.getElementById("cameraVideo");
  const previewEl = document.getElementById("imagePreview");
  const scannerCanvas = document.getElementById("scannerCanvas");
  const cameraManager = new CameraManager(videoEl, previewEl, scannerCanvas);
  const scannerHUD = new FaceScannerHUD(scannerCanvas);

  // App State
  let currentImageBase64 = null;
  let currentDiagnosis = null;
  let radarChartInstance = null;
  let currentFilter = "all";

  // Init Theme
  const isDark = localStorage.getItem("askini_dark_mode") === "true";
  if (isDark) document.documentElement.classList.add("dark");

  // Dynamic Print Date
  const printDateEl = document.getElementById("printDate");
  if (printDateEl) {
    printDateEl.textContent = new Date().toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });
  }

  // Sync Canvas Dimensions
  function syncCanvasSize() {
    const rect = previewEl.getBoundingClientRect();
    if (rect.width && rect.height) {
      scannerCanvas.width = rect.width;
      scannerCanvas.height = rect.height;
    } else {
      scannerCanvas.width = 480;
      scannerCanvas.height = 480;
    }
  }

  // ==================== NAVIGATION TABS ====================
  const tabBtns = document.querySelectorAll("[data-tab-target]");
  const tabSections = document.querySelectorAll(".tab-content-section");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab-target");
      tabBtns.forEach(b => {
        b.classList.remove("text-primary-600", "border-primary-500", "font-bold", "active");
        b.classList.add("text-slate-500", "border-transparent");
      });
      btn.classList.add("text-primary-600", "border-primary-500", "font-bold", "active");

      tabSections.forEach(section => {
        if (section.id === targetId) {
          section.classList.remove("hidden");
        } else {
          section.classList.add("hidden");
        }
      });
    });
  });

  // ==================== THEME & SETTINGS MODAL ====================
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
      const darkActive = document.documentElement.classList.contains("dark");
      localStorage.setItem("askini_dark_mode", darkActive ? "true" : "false");
    });
  }

  const apiStatusBadge = document.getElementById("apiStatusBadge");
  function updateApiBadge() {
    if (apiStatusBadge) {
      if (aiEngine.hasApiKey()) {
        apiStatusBadge.textContent = "AI Vision متصل";
        apiStatusBadge.className = "badge-pill bg-emerald-100";
      } else {
        apiStatusBadge.textContent = "نظام الذكاء التجريبي";
        apiStatusBadge.className = "badge-pill bg-slate-100";
      }
    }
  }
  updateApiBadge();

  // ==================== IMAGE INPUT (Camera & Upload) ====================
  const startCameraBtn = document.getElementById("startCameraBtn");
  const capturePhotoBtn = document.getElementById("capturePhotoBtn");
  const fileInput = document.getElementById("faceFileInput");
  const uploadBox = document.getElementById("uploadDropZone");
  const resetImageBtn = document.getElementById("resetImageBtn");
  const startAnalysisBtn = document.getElementById("startAnalysisBtn");

  // Live Camera
  if (startCameraBtn) {
    startCameraBtn.addEventListener("click", async () => {
      try {
        await cameraManager.startCamera();
        startCameraBtn.classList.add("hidden");
        capturePhotoBtn.classList.remove("hidden");
      } catch (e) {
        alert(e.message);
      }
    });
  }

  if (capturePhotoBtn) {
    capturePhotoBtn.addEventListener("click", () => {
      currentImageBase64 = cameraManager.captureSnapshot();
      capturePhotoBtn.classList.add("hidden");
      startCameraBtn.classList.remove("hidden");
      onImageReady();
    });
  }

  // File Upload
  if (fileInput) {
    fileInput.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          currentImageBase64 = await cameraManager.handleFileUpload(file);
          onImageReady();
        } catch (err) {
          alert(err.message);
        }
      }
    });
  }

  // Drag & Drop
  if (uploadBox) {
    uploadBox.addEventListener("dragover", (e) => {
      e.preventDefault();
      uploadBox.classList.add("border-primary-500", "bg-primary-50/50");
    });
    uploadBox.addEventListener("dragleave", () => {
      uploadBox.classList.remove("border-primary-500", "bg-primary-50/50");
    });
    uploadBox.addEventListener("drop", async (e) => {
      e.preventDefault();
      uploadBox.classList.remove("border-primary-500", "bg-primary-50/50");
      const file = e.dataTransfer.files[0];
      if (file) {
        try {
          currentImageBase64 = await cameraManager.handleFileUpload(file);
          onImageReady();
        } catch (err) {
          alert(err.message);
        }
      }
    });
  }

  // Preset Face Buttons
  const presetButtons = document.querySelectorAll("[data-preset]");
  presetButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const presetType = btn.getAttribute("data-preset");
      currentImageBase64 = cameraManager.loadPresetProfile(presetType);
      
      // Auto-fill questionnaire for convenience
      const concernSelect = document.getElementById("userConcernInput");
      if (concernSelect) {
        if (presetType === "oily") concernSelect.value = "acne";
        else if (presetType === "dry") concernSelect.value = "dryness";
        else if (presetType === "aging") concernSelect.value = "aging";
        else concernSelect.value = "balance";
      }

      onImageReady();
    });
  });

  function onImageReady() {
    syncCanvasSize();
    if (resetImageBtn) resetImageBtn.classList.remove("hidden");
    if (startAnalysisBtn) {
      startAnalysisBtn.removeAttribute("disabled");
      startAnalysisBtn.classList.remove("opacity-50", "cursor-not-allowed");
      startAnalysisBtn.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  if (resetImageBtn) {
    resetImageBtn.addEventListener("click", () => {
      cameraManager.stopCamera();
      previewEl.src = "";
      previewEl.classList.add("hidden");
      scannerHUD.stopScan();
      currentImageBase64 = null;
      resetImageBtn.classList.add("hidden");
      if (startAnalysisBtn) {
        startAnalysisBtn.setAttribute("disabled", "true");
        startAnalysisBtn.classList.add("opacity-50", "cursor-not-allowed");
      }
    });
  }

  // ==================== ANALYSIS EXECUTION ====================
  const scanProgressContainer = document.getElementById("scanProgressContainer");
  const scanStatusText = document.getElementById("scanStatusText");
  const resultsDashboard = document.getElementById("resultsDashboard");

  if (startAnalysisBtn) {
    startAnalysisBtn.addEventListener("click", async () => {
      if (!currentImageBase64) {
        alert("يرجى التقاط صورة أو رفعها أولاً!");
        return;
      }

      syncCanvasSize();
      scanProgressContainer.classList.remove("hidden");
      resultsDashboard.classList.add("hidden");
      startAnalysisBtn.setAttribute("disabled", "true");

      // Read user questionnaire
      const questionnaire = {
        age: document.getElementById("userAgeInput")?.value || 25,
        concern: document.getElementById("userConcernInput")?.value || "balance",
        sensitivity: document.getElementById("userSensitivityInput")?.value || "medium",
        sunExposure: document.getElementById("userSunInput")?.value || "moderate"
      };

      // Start Scanner Canvas Animation
      scannerHUD.startScan(
        (progress) => {
          // Progress tick
        },
        () => {
          // Canvas scan cycle finished
        }
      );

      try {
        // Run AI Analysis
        const result = await aiEngine.analyzeSkin(currentImageBase64, questionnaire, (status) => {
          if (scanStatusText) scanStatusText.textContent = status.messageAr;
        });

        currentDiagnosis = result;
        chatbot.setDiagnosis(result);
        saveDiagnosisToHistory(result);

        // Display results after brief cinematic delay
        setTimeout(() => {
          scannerHUD.stopScan();
          scanProgressContainer.classList.add("hidden");
          startAnalysisBtn.removeAttribute("disabled");
          renderResults(result);
          resultsDashboard.classList.remove("hidden");
          resultsDashboard.scrollIntoView({ behavior: "smooth" });
        }, 1200);

      } catch (err) {
        console.error("Analysis error:", err);
        scannerHUD.stopScan();
        scanProgressContainer.classList.add("hidden");
        startAnalysisBtn.removeAttribute("disabled");
        alert("حدث خطأ أثناء التحليل: " + err.message);
      }
    });
  }

  // ==================== RENDER RESULTS DASHBOARD ====================
  function renderResults(data) {
    // 1. Overall Score & Dial
    const scoreValEl = document.getElementById("overallScoreValue");
    const scoreCircle = document.getElementById("scoreDialCircle");
    const scoreVerdictEl = document.getElementById("scoreVerdictBadge");
    const skinTypeEl = document.getElementById("detectedSkinTypeBadge");
    const skinAgeEl = document.getElementById("detectedSkinAge");

    if (scoreValEl) scoreValEl.textContent = data.overallScore;
    if (skinTypeEl) skinTypeEl.textContent = data.skinTypeAr || data.skinType;
    if (skinAgeEl) skinAgeEl.textContent = `${data.skinAge} سنة`;

    if (scoreCircle) {
      const radius = scoreCircle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      scoreCircle.style.strokeDasharray = `${circumference} ${circumference}`;
      const offset = circumference - (data.overallScore / 100) * circumference;
      scoreCircle.style.strokeDashoffset = offset;
      
      if (data.overallScore >= 80) {
        scoreCircle.style.stroke = "#10b981"; // Emerald
        scoreVerdictEl.textContent = "ممتازة ونضرة";
        scoreVerdictEl.className = "badge-pill bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
      } else if (data.overallScore >= 60) {
        scoreCircle.style.stroke = "#f59e0b"; // Amber
        scoreVerdictEl.textContent = "جيدة مع احتياجات موضعية";
        scoreVerdictEl.className = "badge-pill bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
      } else {
        scoreCircle.style.stroke = "#f43f5e"; // Rose
        scoreVerdictEl.textContent = "تحتاج لترميم وعناية مكثفة";
        scoreVerdictEl.className = "badge-pill bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300";
      }
    }

    // 2. Summary text
    const summaryEl = document.getElementById("diagnosticSummaryText");
    if (summaryEl) summaryEl.textContent = data.summaryAr;

    // 3. Metric Progress Bars
    const m = data.metrics || {};
    setMetricBar("barHydration", "valHydration", m.hydration);
    setMetricBar("barSebum", "valSebum", m.sebumControl);
    setMetricBar("barAcne", "valAcne", m.acneSeverity);
    setMetricBar("barRedness", "valRedness", m.rednessSensitivity);
    setMetricBar("barTexture", "valTexture", m.textureSmoothness);
    setMetricBar("barElasticity", "valElasticity", m.elasticityYouth);

    // 4. Render Radar Chart
    renderRadarChart(m);

    // 5. Zone Analysis
    const zones = data.zoneAnalysis || {};
    setZoneText("zoneForehead", zones.forehead);
    setZoneText("zoneTZone", zones.tZone);
    setZoneText("zoneCheeks", zones.cheeks);
    setZoneText("zoneUnderEye", zones.underEye);
    setZoneText("zoneChin", zones.chin);

    // 6. Actives Badges
    const activesContainer = document.getElementById("recommendedActivesList");
    if (activesContainer) {
      activesContainer.innerHTML = "";
      (data.recommendedActives || []).forEach(act => {
        const span = document.createElement("span");
        span.className = "badge-pill bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300";
        span.innerHTML = `✨ <strong>${act}</strong>`;
        activesContainer.appendChild(span);
      });
    }

    // 7. Avoid Ingredients Badges
    const avoidContainer = document.getElementById("avoidIngredientsList");
    if (avoidContainer) {
      avoidContainer.innerHTML = "";
      (data.ingredientsToAvoid || []).forEach(av => {
        const span = document.createElement("span");
        span.className = "badge-pill bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300";
        span.innerHTML = `⚠️ <span>${av}</span>`;
        avoidContainer.appendChild(span);
      });
    }

    // 8. Dermatologist Tips List
    const tipsContainer = document.getElementById("dermatologistTipsList");
    if (tipsContainer) {
      tipsContainer.innerHTML = "";
      (data.tipsAr || []).forEach(tip => {
        const li = document.createElement("li");
        li.className = "flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300";
        li.innerHTML = `<span class="text-emerald-500 font-bold">✓</span> <span>${tip}</span>`;
        tipsContainer.appendChild(li);
      });
    }

    // 9. Recommended Products & Routine
    renderRoutineProducts(data);
  }

  function setMetricBar(barId, valId, score) {
    const bar = document.getElementById(barId);
    const val = document.getElementById(valId);
    const safeScore = score !== undefined ? score : 50;
    if (val) val.textContent = `${safeScore}%`;
    if (bar) bar.style.width = `${safeScore}%`;
  }

  function setZoneText(elId, text) {
    const el = document.getElementById(elId);
    if (el) el.textContent = text || "طبيعي وسليم";
  }

  // Radar Chart with Chart.js
  function renderRadarChart(metrics) {
    const canvas = document.getElementById("skinMetricsRadarChart");
    if (!canvas) return;

    if (radarChartInstance) {
      radarChartInstance.destroy();
    }

    const labels = [
      "الترطيب (Hydration)",
      "توازن الدهون (Sebum)",
      "نقاء الحبوب (Clear Skin)",
      "هدوء الاحمرار (Calmness)",
      "نعومة المسام (Texture)",
      "المرونة والشباب (Elasticity)"
    ];

    const values = [
      metrics.hydration || 60,
      metrics.sebumControl || 50,
      100 - (metrics.acneSeverity || 20), // Invert acne so higher = better
      100 - (metrics.rednessSensitivity || 30), // Invert redness
      metrics.textureSmoothness || 70,
      metrics.elasticityYouth || 75
    ];

    radarChartInstance = new Chart(canvas, {
      type: "radar",
      data: {
        labels: labels,
        datasets: [{
          label: "مؤشرات البشرة",
          data: values,
          fill: true,
          backgroundColor: "rgba(139, 92, 246, 0.2)",
          borderColor: "#8b5cf6",
          pointBackgroundColor: "#ec4899",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#8b5cf6",
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { color: "rgba(148, 163, 184, 0.2)" },
            grid: { color: "rgba(148, 163, 184, 0.15)" },
            pointLabels: {
              font: { family: "Tajawal, sans-serif", size: 11, weight: "bold" },
              color: "#64748b"
            },
            ticks: { display: false, min: 0, max: 100 }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  // Render Product Routine Cards
  function renderRoutineProducts(diagnosis) {
    const routine = window.getRecommendedProducts(diagnosis);
    const morningContainer = document.getElementById("morningRoutineList");
    const eveningContainer = document.getElementById("eveningRoutineList");

    if (morningContainer) {
      morningContainer.innerHTML = "";
      routine.morning.forEach(item => {
        morningContainer.appendChild(createProductCard(item.stepAr, item.product));
      });
    }

    if (eveningContainer) {
      eveningContainer.innerHTML = "";
      routine.evening.forEach(item => {
        eveningContainer.appendChild(createProductCard(item.stepAr, item.product));
      });
    }

    // Set filter listeners
    const filterBtns = document.querySelectorAll("[data-product-filter]");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        currentFilter = btn.getAttribute("data-product-filter");
        filterBtns.forEach(b => b.classList.remove("bg-primary-600", "text-white"));
        btn.classList.add("bg-primary-600", "text-white");
        filterProductCards();
      });
    });
  }

  function createProductCard(stepTitle, product) {
    const card = document.createElement("div");
    card.className = "product-card p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-sm hover:shadow-md transition flex flex-col md:flex-row gap-4 items-start";
    card.setAttribute("data-price-tier", product.priceTier);
    card.setAttribute("data-fragrance-free", product.isFragranceFree ? "true" : "false");

    const priceSymbols = { budget: "$ اقتصادي", moderate: "$$ متوسط", premium: "$$$ فاخر" };

    card.innerHTML = `
      <div class="w-full md:w-28 h-28 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0 relative">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
        <span class="absolute top-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">${priceSymbols[product.priceTier]}</span>
      </div>
      <div class="flex-1">
        <div class="flex flex-wrap items-center justify-between gap-1 mb-1">
          <span class="text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/60 px-2 py-0.5 rounded-full">${stepTitle}</span>
          <span class="text-xs text-amber-500 font-bold">★ ${product.rating}</span>
        </div>
        <h4 class="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base">${product.nameAr}</h4>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-2 font-mono">${product.brand} - ${product.name}</p>
        <p class="text-xs text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">${product.benefitAr}</p>
        
        <div class="flex flex-wrap gap-1 mb-2">
          ${(product.keyIngredientsAr || []).map(ing => `<span class="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">🧪 ${ing}</span>`).join("")}
          ${product.isFragranceFree ? `<span class="text-[11px] bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded">🌿 خالٍ من العطور</span>` : ""}
        </div>

        <div class="text-[11px] bg-slate-50 dark:bg-slate-800/60 p-2 rounded text-slate-600 dark:text-slate-400">
          <strong>طريقة الاستخدام:</strong> ${product.howToUseAr}
        </div>
      </div>
    `;
    return card;
  }

  function filterProductCards() {
    const cards = document.querySelectorAll(".product-card");
    cards.forEach(c => {
      let show = true;
      if (currentFilter === "budget" && c.getAttribute("data-price-tier") !== "budget") show = false;
      if (currentFilter === "fragrance_free" && c.getAttribute("data-fragrance-free") !== "true") show = false;
      c.style.display = show ? "flex" : "none";
    });
  }

  // ==================== PRINT / EXPORT PDF ====================
  const printReportBtn = document.getElementById("printReportBtn");
  if (printReportBtn) {
    printReportBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // ==================== CHATBOT LOGIC ====================
  const chatMessagesContainer = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");
  const sendChatBtn = document.getElementById("sendChatBtn");
  const chipButtons = document.querySelectorAll("[data-chat-prompt]");

  async function handleUserChatMessage(msgText) {
    if (!msgText || !msgText.trim()) return;
    const clean = msgText.trim();
    if (chatInput) chatInput.value = "";

    // Add user message bubble
    appendChatBubble("user", clean);

    // Add loading indicator
    const loadingId = appendChatLoading();

    try {
      const reply = await chatbot.sendMessage(clean);
      removeChatLoading(loadingId);
      appendChatBubble("assistant", reply);
    } catch (e) {
      removeChatLoading(loadingId);
      appendChatBubble("assistant", "حدث خطأ أثناء الرد، يرجى المحاولة مجدداً.");
    }
  }

  if (sendChatBtn && chatInput) {
    sendChatBtn.addEventListener("click", () => handleUserChatMessage(chatInput.value));
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleUserChatMessage(chatInput.value);
    });
  }

  chipButtons.forEach(chip => {
    chip.addEventListener("click", () => {
      const prompt = chip.getAttribute("data-chat-prompt");
      handleUserChatMessage(prompt);
    });
  });

  function appendChatBubble(role, text) {
    if (!chatMessagesContainer) return;
    const bubble = document.createElement("div");
    bubble.className = role === "user" 
      ? "flex justify-end mb-3" 
      : "flex justify-start mb-3";

    bubble.innerHTML = `
      <div class="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
        role === "user"
          ? "bg-gradient-to-r from-primary-600 to-indigo-600 text-white rounded-tr-none shadow"
          : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700"
      }">
        <p class="whitespace-pre-line">${text}</p>
      </div>
    `;
    chatMessagesContainer.appendChild(bubble);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  }

  function appendChatLoading() {
    if (!chatMessagesContainer) return null;
    const id = "loading_" + Date.now();
    const el = document.createElement("div");
    el.id = id;
    el.className = "flex justify-start mb-3";
    el.innerHTML = `
      <div class="bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl px-4 py-2.5 text-xs flex items-center gap-2">
        <span class="animate-spin inline-block w-3 h-3 border-2 border-primary-500 border-t-transparent rounded-full"></span>
        <span>المستشار الذكي يكتب الرد...</span>
      </div>
    `;
    chatMessagesContainer.appendChild(el);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    return id;
  }

  function removeChatLoading(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  // ==================== INGREDIENT CHECKER ====================
  const ingredientInput = document.getElementById("ingredientInput");
  const checkIngredientsBtn = document.getElementById("checkIngredientsBtn");
  const ingredientResultsBox = document.getElementById("ingredientResultsBox");

  if (checkIngredientsBtn && ingredientInput) {
    checkIngredientsBtn.addEventListener("click", () => {
      const text = ingredientInput.value;
      if (!text || !text.trim()) {
        alert("يرجى لصق قائمة المكونات أولاً!");
        return;
      }

      const report = ingredientChecker.analyze(text);
      renderIngredientReport(report);
    });
  }

  function renderIngredientReport(rep) {
    if (!ingredientResultsBox) return;
    ingredientResultsBox.classList.remove("hidden");

    document.getElementById("ingredientScoreVal").textContent = `${rep.safetyScore}/100`;
    document.getElementById("ingredientVerdictText").textContent = rep.verdictAr;

    const warningsContainer = document.getElementById("ingredientWarningsList");
    warningsContainer.innerHTML = "";
    if (rep.warnings.length === 0) {
      warningsContainer.innerHTML = `<li class="text-xs text-emerald-600 dark:text-emerald-400">لم يتم رصد مهيجات أو مواد عالية الانسداد للمسام!</li>`;
    } else {
      rep.warnings.forEach(w => {
        const li = document.createElement("li");
        li.className = "text-xs text-rose-600 dark:text-rose-400 flex items-start gap-1.5";
        li.innerHTML = `<span>⚠️</span> <span>${w}</span>`;
        warningsContainer.appendChild(li);
      });
    }

    const positivesContainer = document.getElementById("ingredientPositivesList");
    positivesContainer.innerHTML = "";
    if (rep.positives.length === 0) {
      positivesContainer.innerHTML = `<li class="text-xs text-slate-500">لا توجد مكونات فعالة مميزة معروفة في القائمة المدخلة.</li>`;
    } else {
      rep.positives.forEach(p => {
        const li = document.createElement("li");
        li.className = "text-xs text-emerald-600 dark:text-emerald-400 flex items-start gap-1.5";
        li.innerHTML = `<span>✓</span> <span>${p}</span>`;
        positivesContainer.appendChild(li);
      });
    }
  }

  // ==================== DIAGNOSIS HISTORY ====================
  function saveDiagnosisToHistory(diagnosis) {
    try {
      const history = JSON.parse(localStorage.getItem("askini_history") || "[]");
      const record = {
        date: new Date().toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric" }),
        score: diagnosis.overallScore,
        skinType: diagnosis.skinTypeAr,
        skinAge: diagnosis.skinAge
      };
      history.unshift(record);
      // Keep last 10
      if (history.length > 10) history.pop();
      localStorage.setItem("askini_history", JSON.stringify(history));
      renderHistoryList();
    } catch (e) {
      console.warn("Could not save history:", e);
    }
  }

  function renderHistoryList() {
    const listEl = document.getElementById("historyListContainer");
    if (!listEl) return;
    const history = JSON.parse(localStorage.getItem("askini_history") || "[]");
    listEl.innerHTML = "";

    if (history.length === 0) {
      listEl.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">لا توجد تحليلات سابقة محفوظة بعد.</p>`;
      return;
    }

    history.forEach(item => {
      const row = document.createElement("div");
      row.className = "flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs";
      row.innerHTML = `
        <div>
          <span class="font-bold text-slate-800 dark:text-slate-200">${item.skinType}</span>
          <span class="text-slate-400 mr-2">${item.date}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-primary-600 font-bold">العمر: ${item.skinAge}</span>
          <span class="badge-pill bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">${item.score}/100</span>
        </div>
      `;
      listEl.appendChild(row);
    });
  }

  renderHistoryList();
});
