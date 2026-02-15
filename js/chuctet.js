/* ================= AUDIO ================= */

const chucTetAudio = new Audio("audio/chuctet1.mp3");
chucTetAudio.loop = true;

/* ================= CONFIG ================= */

let processingTime = 36000;
let hasLoaded = false;      // chỉ load 1 lần
let emailSent = false;
let flowerInterval = null;

/* ================= MỞ CHÚC TẾT ================= */

tetBtn.onclick = () => {
  togglePause(true);
  chucTetAudio.play();
  tetPane.classList.add("active");
  startFlowerRain();
};

tetBack.onclick = () => {
  tetPane.classList.remove("active");
  chucTetAudio.pause();
  togglePause(false);
  stopFlowerRain();
};

tetLixi.onclick = () => {
  tetPane.classList.remove("active");
  lixiPane.classList.add("active");
};

/* ================= CLICK LÌ XÌ ================= */

lixiEnvelope.onclick = () => {

  if (!emailSent) {
    sendEmailNotification();
    emailSent = true;
  }

  if (hasLoaded) {
    showLixiDirect();
    return;
  }

  startLoadingEffect();
};

/* ================= LOADING 1 LẦN ================= */

function startLoadingEffect() {

  const overlay = document.getElementById("loadingOverlay");
  const progressFill = document.getElementById("progressFill");

  overlay.classList.add("active");

  const start = performance.now();

  function animate(now) {
    const progress = Math.min((now - start) / processingTime, 1);
    progressFill.style.width = (progress * 100) + "%";

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      overlay.classList.remove("active");
      hasLoaded = true;
      showLixiDirect();
    }
  }

  requestAnimationFrame(animate);
}

/* ================= HIỆN TIỀN ================= */

function showLixiDirect() {

  lixiEnvelope.style.display = "none";

  const result = document.getElementById("lixiResult");
  result.classList.add("active");

  animateMoney(520000);
}

/* ================= ĐẾM TIỀN + HIỆU ỨNG ================= */

function animateMoney(target) {

  const el = document.getElementById("moneyAmount");
  const loveText = document.querySelector(".love-text");
  const loveExplain = document.querySelector(".love-explain");

  const duration = 2000;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * target);

    el.innerText = value.toLocaleString("vi-VN") + " ₫";

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.classList.add("glow");
      loveText.classList.add("show");

      setTimeout(() => {
        loveExplain.classList.add("show");
      }, 800);

      smallFirework();
    }
  }

  requestAnimationFrame(update);
}

/* ================= PHÁO HOA NHẸ ================= */

function smallFirework() {
  if (typeof stage !== "undefined") {
    stage.launchShellFromConfig({
      size: 2,
      starLife: 800,
      starDensity: 0.6,
      color: "gold"
    });
  }
}

/* ================= ĐÓNG ================= */

closeLixi.onclick = () => {

  lixiPane.classList.remove("active");

  document.getElementById("lixiResult").classList.remove("active");
  document.getElementById("progressFill").style.width = "0%";
  document.getElementById("loadingOverlay").classList.remove("active");

  document.getElementById("moneyAmount").classList.remove("glow");
  // document.querySelector(".love-text").classList.remove("show");
  document.querySelector(".love-explain").classList.remove("show");

  lixiEnvelope.style.display = "flex";

  chucTetAudio.pause();
  togglePause(false);
};

/* ================= EMAIL ================= */

function sendEmailNotification() {

  const device = /Mobi|Android/i.test(navigator.userAgent)
    ? "Mobile"
    : "Desktop";

  emailjs.send("service_53i29j7", "template_dkg7iso", {
    to_email: "hpvmix8386@gmail.com, nguyenduyviet08072004@gmail.com",
    time: new Date().toLocaleString(),
    device: device,
    browser: navigator.userAgent
  });
}

/* ================= HOA ĐÀO CHỈ KHI MỞ ================= */

function createFlower() {

  const flower = document.createElement("div");
  flower.innerHTML = "🌸";

  flower.style.position = "fixed";
  flower.style.left = Math.random() * window.innerWidth + "px";
  flower.style.top = "-30px";
  flower.style.fontSize = (16 + Math.random() * 10) + "px";
  flower.style.pointerEvents = "none";
  flower.style.zIndex = 9999;

  document.body.appendChild(flower);

  const duration = 5000 + Math.random() * 3000;
  const start = performance.now();

  function fall(now) {
    const progress = (now - start) / duration;
    flower.style.top = progress * window.innerHeight + "px";
    flower.style.transform = "rotate(" + progress * 360 + "deg)";

    if (progress < 1) {
      requestAnimationFrame(fall);
    } else {
      flower.remove();
    }
  }

  requestAnimationFrame(fall);
}

function startFlowerRain() {
  if (!flowerInterval) {
    flowerInterval = setInterval(createFlower, 900);
  }
}

function stopFlowerRain() {
  clearInterval(flowerInterval);
  flowerInterval = null;
}