/**
 * AskinI - Cosmetic Ingredient Checker & Comedogenic Analyzer
 */

class IngredientChecker {
  constructor(dictionary = window.INGREDIENTS_DICT) {
    this.dict = dictionary || {};
  }

  /**
   * Analyze raw text containing comma-separated or newline-separated ingredients
   */
  analyze(rawText) {
    if (!rawText || !rawText.trim()) {
      return { total: 0, items: [], safetyScore: 100, warnings: [], positives: [] };
    }

    // Split by commas, semicolons, or newlines
    const rawTokens = rawText
      .split(/[,;\n]/)
      .map(t => t.trim())
      .filter(t => t.length > 1);

    const items = [];
    let highComedogenicCount = 0;
    let highIrritantCount = 0;
    let beneficialCount = 0;
    const warnings = [];
    const positives = [];

    rawTokens.forEach(token => {
      const cleanLower = token.toLowerCase().replace(/[^a-z0-9 ]/gi, " ").trim();
      let matchedInfo = null;

      // Look for dictionary match
      for (const [key, info] of Object.entries(this.dict)) {
        if (cleanLower.includes(key) || key.includes(cleanLower)) {
          matchedInfo = { key, ...info };
          break;
        }
      }

      // Check common comedogenic markers if not directly in dict
      let comedogenic = matchedInfo ? matchedInfo.comedogenic : 0;
      let irritancy = matchedInfo ? matchedInfo.irritancy : 0;
      let isBeneficial = false;

      if (!matchedInfo) {
        if (/parfum|fragrance|aroma/i.test(cleanLower)) {
          irritancy = 4;
          warnings.push(`عطور اصطناعية (${token}): قد تسبب تحسساً للبشرة المعرضة للإكزيما أو الاحمرار.`);
        } else if (/alcohol denat|ethanol|isopropyl alcohol/i.test(cleanLower)) {
          irritancy = 4;
          warnings.push(`كحول مجفف (${token}): قد يضعف الحاجز الواقي عند الاستخدام المتكرر.`);
        } else if (/cocos nucifera|coconut oil|isopropyl myristate|wheat germ oil/i.test(cleanLower)) {
          comedogenic = 4;
          warnings.push(`مكون يسد المسام بدرجة عالية (${token}): غير ملائم للبشرة الدهنية والمعرضة للحبوب.`);
        } else if (/niacinamide|ceramide|panthenol|centella|hyaluron|glycerin|zinc/i.test(cleanLower)) {
          isBeneficial = true;
          beneficialCount++;
          positives.push(`مكون فعال ومفيد (${token}) لدعم صحة البشرة وحاجز الترطيب.`);
        }
      } else {
        if (comedogenic >= 3) {
          highComedogenicCount++;
          warnings.push(`${matchedInfo.nameAr}: تصنيف سد مسام مرتفع (${comedogenic}/5).`);
        }
        if (irritancy >= 3) {
          highIrritantCount++;
          warnings.push(`${matchedInfo.nameAr}: تصنيف تهييج للبشرة الحساسة (${irritancy}/5).`);
        }
        if (comedogenic === 0 && irritancy <= 1) {
          beneficialCount++;
          positives.push(`${matchedInfo.nameAr}: ${matchedInfo.benefitAr}`);
        }
      }

      items.push({
        rawName: token,
        matched: Boolean(matchedInfo),
        details: matchedInfo,
        comedogenic,
        irritancy,
        isBeneficial
      });
    });

    // Calculate overall safety score (0 - 100)
    let penalty = (highComedogenicCount * 18) + (highIrritantCount * 22);
    let bonus = beneficialCount * 6;
    let safetyScore = Math.min(100, Math.max(10, 85 - penalty + bonus));

    let verdictAr = "منتج آمن ومتوازن";
    if (highComedogenicCount > 1 && highIrritantCount > 0) {
      verdictAr = "يحتاج حذر: قد يسد المسام ويسبب تحسساً للبشرة الدهنية والحساسة";
    } else if (highComedogenicCount > 1) {
      verdictAr = "غير محبذ للبشرة المعرضة للحبوب (كوميدوجينيك مرتفع)";
    } else if (highIrritantCount > 1) {
      verdictAr = "غير محبذ للبشرة الحساسة (يحتوي مهيجات أو عطور)";
    } else if (safetyScore > 80) {
      verdictAr = "ممتاز: تركيبة لطيفة ومفيدة للحاجز الجلدي";
    }

    return {
      totalIngredients: items.length,
      safetyScore: Math.round(safetyScore),
      verdictAr,
      highComedogenicCount,
      highIrritantCount,
      beneficialCount,
      warnings,
      positives,
      items
    };
  }
}

if (typeof window !== "undefined") {
  window.IngredientChecker = IngredientChecker;
}
