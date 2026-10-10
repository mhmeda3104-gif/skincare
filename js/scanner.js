/**
 * AskinI - Futuristic Facial Scanner Canvas & HUD Animation
 */

class FaceScannerHUD {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext("2d");
    this.isScanning = false;
    this.scanProgress = 0; // 0 to 100
    this.animationId = null;
    this.scanLineY = 0;
    this.scanDirection = 1;
    this.zones = [
      { nameAr: "الجبهة (Forehead)", x: 0.5, y: 0.28, radius: 24, status: "pending", score: 0 },
      { nameAr: "محيط العين الأيمن (Right Eye)", x: 0.36, y: 0.40, radius: 18, status: "pending", score: 0 },
      { nameAr: "محيط العين الأيسر (Left Eye)", x: 0.64, y: 0.40, radius: 18, status: "pending", score: 0 },
      { nameAr: "الأنف ومنطقة T (Nose / T-Zone)", x: 0.5, y: 0.52, radius: 22, status: "pending", score: 0 },
      { nameAr: "الخد الأيمن (Right Cheek)", x: 0.32, y: 0.58, radius: 26, status: "pending", score: 0 },
      { nameAr: "الخد الأيسر (Left Cheek)", x: 0.68, y: 0.58, radius: 26, status: "pending", score: 0 },
      { nameAr: "الذقن (Chin)", x: 0.5, y: 0.78, radius: 24, status: "pending", score: 0 }
    ];
    this.particles = [];
    this.initParticles();
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < 35; i++) {
      this.particles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.002,
        vy: (Math.random() - 0.5) * 0.002,
        size: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.7 + 0.3
      });
    }
  }

  startScan(onProgress = () => {}, onComplete = () => {}) {
    this.isScanning = true;
    this.scanProgress = 0;
    this.scanLineY = 0;
    this.onProgressCallback = onProgress;
    this.onCompleteCallback = onComplete;
    this.zones.forEach(z => { z.status = "pending"; z.score = 0; });
    this.animate();
  }

  stopScan() {
    this.isScanning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.clear();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  animate() {
    if (!this.isScanning) return;

    const w = this.canvas.width;
    const h = this.canvas.height;
    this.clear();

    // Advance progress smoothly
    this.scanProgress = Math.min(100, this.scanProgress + 0.7);

    // Update scan line
    this.scanLineY += 3.5 * this.scanDirection;
    if (this.scanLineY > h) {
      this.scanLineY = h;
      this.scanDirection = -1;
    } else if (this.scanLineY < 0) {
      this.scanLineY = 0;
      this.scanDirection = 1;
    }

    // 1. Draw glowing scan sweep line
    this.drawScanLine(w, h);

    // 2. Draw face oval guide & corner brackets
    this.drawCornerBrackets(w, h);
    this.drawFacialGrid(w, h);

    // 3. Draw and update anatomical target zones
    this.drawZones(w, h);

    // 4. Draw tech floating particles & data points
    this.drawParticles(w, h);

    // 5. Draw HUD stats header / footer
    this.drawHUDInfo(w, h);

    if (this.onProgressCallback) {
      this.onProgressCallback(Math.round(this.scanProgress));
    }

    if (this.scanProgress >= 100) {
      this.isScanning = false;
      if (this.onCompleteCallback) {
        setTimeout(() => this.onCompleteCallback(), 400);
      }
      return;
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  drawScanLine(w, h) {
    const y = this.scanLineY;
    const gradient = this.ctx.createLinearGradient(0, y - 25, 0, y + 25);
    gradient.addColorStop(0, "rgba(6, 182, 212, 0)");
    gradient.addColorStop(0.5, "rgba(6, 182, 212, 0.4)");
    gradient.addColorStop(0.9, "rgba(236, 72, 153, 0.8)");
    gradient.addColorStop(1, "rgba(236, 72, 153, 0)");

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, y - 25, w, 50);

    // Crisp laser line
    this.ctx.strokeStyle = "#38bdf8";
    this.ctx.lineWidth = 2;
    this.ctx.shadowColor = "#06b6d4";
    this.ctx.shadowBlur = 12;
    this.ctx.beginPath();
    this.ctx.moveTo(0, y);
    this.ctx.lineTo(w, y);
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;
  }

  drawCornerBrackets(w, h) {
    const margin = 20;
    const len = 30;
    this.ctx.strokeStyle = "rgba(14, 165, 233, 0.8)";
    this.ctx.lineWidth = 3;

    // Top-Left
    this.ctx.beginPath();
    this.ctx.moveTo(margin, margin + len);
    this.ctx.lineTo(margin, margin);
    this.ctx.lineTo(margin + len, margin);
    this.ctx.stroke();

    // Top-Right
    this.ctx.beginPath();
    this.ctx.moveTo(w - margin - len, margin);
    this.ctx.lineTo(w - margin, margin);
    this.ctx.lineTo(w - margin, margin + len);
    this.ctx.stroke();

    // Bottom-Left
    this.ctx.beginPath();
    this.ctx.moveTo(margin, h - margin - len);
    this.ctx.lineTo(margin, h - margin);
    this.ctx.lineTo(margin + len, h - margin);
    this.ctx.stroke();

    // Bottom-Right
    this.ctx.beginPath();
    this.ctx.moveTo(w - margin - len, h - margin);
    this.ctx.lineTo(w - margin, h - margin);
    this.ctx.lineTo(w - margin, h - margin - len);
    this.ctx.stroke();
  }

  drawFacialGrid(w, h) {
    const cx = w * 0.5;
    const cy = h * 0.52;
    const rx = w * 0.32;
    const ry = h * 0.42;

    this.ctx.save();
    this.ctx.strokeStyle = "rgba(139, 92, 246, 0.35)";
    this.ctx.lineWidth = 1.5;
    this.ctx.setLineDash([6, 6]);

    // Face oval outline
    this.ctx.beginPath();
    this.ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    this.ctx.stroke();

    // Central alignment crosshair lines
    this.ctx.setLineDash([4, 8]);
    this.ctx.strokeStyle = "rgba(6, 182, 212, 0.25)";
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy - ry);
    this.ctx.lineTo(cx, cy + ry);
    this.ctx.moveTo(cx - rx, cy);
    this.ctx.lineTo(cx + rx, cy);
    this.ctx.stroke();

    this.ctx.restore();
  }

  drawZones(w, h) {
    const time = Date.now() * 0.003;

    this.zones.forEach((zone, idx) => {
      const zx = zone.x * w;
      const zy = zone.y * h;

      // Status updates based on scan progress
      const threshold = (idx + 1) * 13;
      if (this.scanProgress >= threshold) {
        zone.status = "scanned";
        if (zone.score === 0) zone.score = Math.floor(Math.random() * 25) + 75;
      } else if (this.scanProgress >= threshold - 10) {
        zone.status = "active";
      }

      // Outer pulsing ring
      this.ctx.save();
      const pulse = Math.sin(time + idx) * 3;
      this.ctx.lineWidth = 1.5;

      if (zone.status === "scanned") {
        this.ctx.strokeStyle = "rgba(16, 185, 129, 0.85)"; // Green completed
        this.ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
      } else if (zone.status === "active") {
        this.ctx.strokeStyle = "rgba(236, 72, 153, 0.9)"; // Pink active
        this.ctx.fillStyle = "rgba(236, 72, 153, 0.25)";
      } else {
        this.ctx.strokeStyle = "rgba(148, 163, 184, 0.4)"; // Pending slate
        this.ctx.fillStyle = "rgba(148, 163, 184, 0.05)";
      }

      this.ctx.beginPath();
      this.ctx.arc(zx, zy, zone.radius + pulse, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();

      // Center node dot
      this.ctx.beginPath();
      this.ctx.arc(zx, zy, 3, 0, Math.PI * 2);
      this.ctx.fillStyle = zone.status === "scanned" ? "#10b981" : (zone.status === "active" ? "#ec4899" : "#94a3b8");
      this.ctx.fill();

      // Label when active or scanned
      if (zone.status !== "pending") {
        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "bold 11px Tajawal, sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.shadowColor = "rgba(0,0,0,0.8)";
        this.ctx.shadowBlur = 4;
        this.ctx.fillText(zone.nameAr.split(" ")[0], zx, zy - zone.radius - 6);
        this.ctx.shadowBlur = 0;
      }

      this.ctx.restore();
    });
  }

  drawParticles(w, h) {
    this.ctx.fillStyle = "rgba(56, 189, 248, 0.6)";
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = 1;
      if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1;
      if (p.y > 1) p.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  drawHUDInfo(w, h) {
    this.ctx.save();
    this.ctx.font = "600 13px 'Cairo', monospace, sans-serif";
    this.ctx.fillStyle = "#38bdf8";
    this.ctx.textAlign = "right";

    // Progress percentage
    const percentText = `AI SCANNING: ${Math.round(this.scanProgress)}%`;
    this.ctx.fillText(percentText, w - 24, 38);

    // Live spectral ticker
    let ticker = "فحص نسيج ومسام البشرة...";
    if (this.scanProgress < 25) ticker = "تحديد المعالم التشريحية للوجه...";
    else if (this.scanProgress < 50) ticker = "تحليل الحاجز المائي والإفراز الدهني...";
    else if (this.scanProgress < 75) ticker = "رصد التصبغات ومناطق الالتهاب الاحمرارية...";
    else ticker = "معالجة النتائج وإعداد التوصيات العلاجية...";

    this.ctx.textAlign = "center";
    this.ctx.font = "bold 13px Tajawal, sans-serif";
    this.ctx.fillStyle = "#f8fafc";
    this.ctx.shadowColor = "rgba(0,0,0,0.9)";
    this.ctx.shadowBlur = 6;
    this.ctx.fillText(ticker, w * 0.5, h - 30);

    this.ctx.restore();
  }
}

if (typeof window !== "undefined") {
  window.FaceScannerHUD = FaceScannerHUD;
}
