/**
 * skincare AI - Project Configuration
 * مفتاح API المركزي والموديل الأحدث
 */

const APP_CONFIG = {
  // مفتاح الـ API الخاص بك
  GEMINI_API_KEY: "AQ.Ab8RN6IBAc1Q_nke0fvLf5XXLi1OYXVgClnstbBIY9EsCVyW_A",
  
  // الموديل الأحدث المتوافق من جوجل
  DEFAULT_MODEL: "gemini-3.8-flash"
};

if (typeof window !== "undefined") {
  window.APP_CONFIG = APP_CONFIG;
}
