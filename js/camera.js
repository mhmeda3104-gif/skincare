/**
 * AskinI - Camera & Media Handler
 * Handles WebRTC live selfie camera, file uploads, canvas snapshots, and demo clinical presets.
 */

class CameraManager {
  constructor(videoElement, previewElement, canvasElement) {
    this.video = videoElement;
    this.preview = previewElement;
    this.canvas = canvasElement;
    this.stream = null;
    this.capturedBase64 = null;
  }

  /**
   * Start live camera stream
   */
  async startCamera() {
    try {
      this.stopCamera();
      const constraints = {
        video: {
          facingMode: "user",
          width: { ideal: 720 },
          height: { ideal: 720 }
        },
        audio: false
      };
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.video.srcObject = this.stream;
      await this.video.play();
      this.video.classList.remove("hidden");
      this.preview.classList.add("hidden");
      return true;
    } catch (err) {
      console.warn("Camera access denied or unavailable:", err);
      throw new Error("لم نتمكن من الوصول للكاميرا. يرجى السماح بالإذن أو رفع صورة من جهازك.");
    }
  }

  /**
   * Stop camera stream
   */
  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.video) {
      this.video.srcObject = null;
      this.video.classList.add("hidden");
    }
  }

  /**
   * Capture photo snapshot from live video
   */
  captureSnapshot() {
    if (!this.video || this.video.videoWidth === 0) return null;

    const canvas = document.createElement("canvas");
    const size = Math.min(this.video.videoWidth, this.video.videoHeight);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    // Center crop square
    const sx = (this.video.videoWidth - size) / 2;
    const sy = (this.video.videoHeight - size) / 2;
    ctx.drawImage(this.video, sx, sy, size, size, 0, 0, size, size);

    this.capturedBase64 = canvas.toDataURL("image/jpeg", 0.88);
    this.stopCamera();
    this.showPreview(this.capturedBase64);
    return this.capturedBase64;
  }

  /**
   * Handle user uploaded image file
   */
  async handleFileUpload(file) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith("image/")) {
        reject(new Error("يرجى اختيار ملف صورة صالح (JPG, PNG, WEBP)."));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const rawBase64 = e.target.result;
        this.compressAndResizeImage(rawBase64, 800, 800).then(compressed => {
          this.capturedBase64 = compressed;
          this.stopCamera();
          this.showPreview(compressed);
          resolve(compressed);
        }).catch(reject);
      };
      reader.onerror = () => reject(new Error("حدث خطأ أثناء قراءة ملف الصورة."));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Resize & compress image for optimal speed and API payload limits
   */
  compressAndResizeImage(base64Str, maxWidth = 800, maxHeight = 800) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressed = canvas.toDataURL("image/jpeg", 0.85);
        resolve(compressed);
      };
      img.src = base64Str;
    });
  }

  /**
   * Display preview
   */
  showPreview(dataUrl) {
    if (this.preview) {
      this.preview.src = dataUrl;
      this.preview.classList.remove("hidden");
    }
  }

  getCapturedImage() {
    return this.capturedBase64;
  }

  /**
   * Generate an illustrative SVG / Canvas avatar preset for quick demo testing
   */
  loadPresetProfile(type) {
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 600);
    bgGrad.addColorStop(0, "#f8fafc");
    bgGrad.addColorStop(1, "#e2e8f0");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 600, 600);

    // Realistic Face Rendering (Clinical Mock)
    const skinTones = {
      oily: { base: "#fed7aa", shadow: "#f97316", highlight: "#ffedd5" },
      dry: { base: "#ffedd5", shadow: "#ea580c", highlight: "#fff7ed" },
      aging: { base: "#fde047", shadow: "#ca8a04", highlight: "#fef9c3" },
      normal: { base: "#fcd34d", shadow: "#d97706", highlight: "#fef3c7" }
    };
    const tone = skinTones[type] || skinTones.normal;

    // Head Oval
    ctx.fillStyle = tone.base;
    ctx.beginPath();
    ctx.ellipse(300, 310, 160, 210, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cheeks & Features
    if (type === "oily") {
      // Shine spots on forehead and nose
      ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
      ctx.beginPath();
      ctx.ellipse(300, 230, 45, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(300, 330, 18, 30, 0, 0, Math.PI * 2);
      ctx.fill();

      // Minor blemishes / redness dots on chin and cheeks
      ctx.fillStyle = "rgba(239, 68, 68, 0.75)";
      [ [230, 360], [245, 380], [360, 350], [300, 440], [315, 450] ].forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (type === "dry") {
      // Flushed cheeks
      ctx.fillStyle = "rgba(244, 63, 94, 0.35)";
      ctx.beginPath();
      ctx.ellipse(220, 360, 45, 30, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(380, 360, 45, 30, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === "aging") {
      // Subtle fine lines
      ctx.strokeStyle = "rgba(180, 83, 9, 0.35)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(210, 290); ctx.lineTo(185, 285);
      ctx.moveTo(210, 295); ctx.lineTo(180, 295);
      ctx.moveTo(390, 290); ctx.lineTo(415, 285);
      ctx.moveTo(390, 295); ctx.lineTo(420, 295);
      ctx.stroke();
    }

    // Eyes
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.ellipse(235, 290, 18, 10, 0, 0, Math.PI * 2);
    ctx.ellipse(365, 290, 18, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eyebrows
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(235, 275, 25, Math.PI * 1.1, Math.PI * 1.8);
    ctx.arc(365, 275, 25, Math.PI * 1.2, Math.PI * 1.9);
    ctx.stroke();

    // Nose
    ctx.strokeStyle = "rgba(100, 116, 139, 0.45)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(300, 290);
    ctx.lineTo(294, 345);
    ctx.lineTo(306, 345);
    ctx.stroke();

    // Mouth / Lips
    ctx.strokeStyle = "#f43f5e";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(300, 405, 32, 0.15, Math.PI - 0.15);
    ctx.stroke();

    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    this.capturedBase64 = dataUrl;
    this.stopCamera();
    this.showPreview(dataUrl);
    return dataUrl;
  }
}

if (typeof window !== "undefined") {
  window.CameraManager = CameraManager;
}
