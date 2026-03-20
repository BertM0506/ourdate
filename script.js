const WHATSAPP_NUMBER = "6281283446636";

const CONFIG = {
    targetDate: new Date("March 28, 2026 16:00:00"),
    tripStart: new Date("March 28, 2026"),
    tripEnd: new Date("April 5, 2026"),
    quotes: [
        "Nica, senyum kamu itu bug paling indah di hidup aku. ❤️",
        "Kamu adalah baris kode favorit yang nggak akan pernah aku hapus. ✨",
        "Jogja itu indah, tapi kamu tetap pemandangan terbaikku. 🏔️",
        "Cinta aku ke kamu itu infinite loop, nggak ada berhentinya! 🔄",
        "Nggak sabar mau pegang tangan kamu di Tugu Jogja. 📸",
        "Sending virtual hug... Loading 100%... Done! 🤗❤️",
        "Jangan capek ya kerjanya, ada aku yang selalu nungguin kamu. ✨",
        "Kamu itu kayak Wi-Fi, langsung connect ke hati aku. 📶💖",
        "Kalo kangen, klik tombol ini lagi ya. Aku selalu ada buat kamu. 🧸",
        "Distraksi terindah aku ya cuma chat dari kamu. 😍",
        "Nica, makasih ya sudah jadi bagian paling bahagia di 2026 ini. 🌸",
        "Aku nggak butuh ChatGPT buat tau kalau aku sayang banget sama kamu. 🤖❤️",
        "Sudah minum air putih belum? Jangan lupa jaga kesehatan buat trip kita! 💧",
        "Counting days... Nggak sabar mau denger suara ketawa kamu langsung. 🎤",
        "Kamu adalah 'Home' setiap kali aku ngerasa capek. 🏠❤️",
        "Mau kopi atau mau aku? Eh, mau jalan bareng aku aja ya! ☕+me",
        "Kalau rindu itu berat, biar kita bagi dua ya di Jogja nanti. ⚖️💗"
    ]
};

const PLAN_DATES = [
    { id: "day-28", date: "2026-03-28" }, { id: "day-29", date: "2026-03-29" },
    { id: "day-30", date: "2026-03-30" }, { id: "day-31", date: "2026-03-31" },
    { id: "day-01", date: "2026-04-01" }, { id: "day-02", date: "2026-04-02" },
    { id: "day-03", date: "2026-04-03" }, { id: "day-04", date: "2026-04-04" },
    { id: "day-05", date: "2026-04-05" }
];

function validate() {
    const pw = document.getElementById('pw').value;
    if (pw === "28032026") {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        document.getElementById('lock').style.transform = "translateY(-100%)";
        setTimeout(() => {
            document.getElementById('lock').style.display = "none";
            document.getElementById('main').style.display = "block";
            setTimeout(() => document.getElementById('main').style.opacity = "1", 100);
            startApp();
        }, 800);
    } else { alert("Kode salah, Sayang.. 🥺"); }
}

function startApp() {
    initTimer();
    updateProgress();
    initWA();
    initHearts();
    autoChecklist();
    document.getElementById('bgm').play().catch(() => { });
}

function updateProgress() {
    const now = new Date();
    const diffDays = Math.ceil((CONFIG.targetDate - now) / (1000 * 60 * 60 * 24));

    // Dynamic Greeting
    const g = document.getElementById('timeGreeting');
    if (diffDays > 0) g.innerText = `${diffDays} Hari Lagi Kita Ketemu! ✈️`;
    else g.innerText = "Enjoy Jogja, Beautiful! 💗";

    // Progress Bar
    const totalTrip = CONFIG.tripEnd - CONFIG.tripStart;
    const progress = now - CONFIG.tripStart;
    let percent = Math.max(0, Math.min(100, (progress / totalTrip) * 100));
    document.getElementById('progress-bar').style.width = percent + "%";
}

function autoChecklist() {
    const todayStr = new Date().toISOString().split('T')[0];
    PLAN_DATES.forEach(item => {
        const el = document.getElementById(item.id);
        if (el && todayStr > item.date) el.classList.add('completed-day');
    });
}

function showNewQuote() {
    const qText = document.getElementById('quoteText');
    const randomQuote = CONFIG.quotes[Math.floor(Math.random() * CONFIG.quotes.length)];
    qText.style.opacity = 0;
    setTimeout(() => { qText.innerText = randomQuote; qText.style.opacity = 1; }, 300);
}

function initTimer() {
    setInterval(() => {
        const diff = CONFIG.targetDate - new Date().getTime();
        if (diff < 0) return;
        document.getElementById('d').innerText = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
        document.getElementById('h').innerText = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        document.getElementById('m').innerText = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        document.getElementById('s').innerText = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
    }, 1000);
}

function initWA() {
    const msg = encodeURIComponent("Sayang, aku sudah cek plannernya! Gak sabar nunggu tanggal 28 nanti.. 💖");
    document.getElementById('waLink').href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

function initHearts() {
    setInterval(() => {
        const h = document.createElement("div");
        h.innerHTML = "💗";
        h.style.cssText = `position:fixed; bottom:-50px; left:${Math.random() * 100}vw; font-size:20px; transition:4s linear; z-index:1; pointer-events:none;`;
        document.body.appendChild(h);
        setTimeout(() => { h.style.transform = "translateY(-110vh)"; h.style.opacity = "0"; }, 100);
        setTimeout(() => h.remove(), 4500);
    }, 1000);
}

function togglePlan(el) {
    const det = el.querySelector('.plan-details');
    det.style.display = (det.style.display === "block") ? "none" : "block";
}

function showSurprise() { document.getElementById('overlay').style.display = "flex"; }
function closeOverlay() { document.getElementById('overlay').style.display = "none"; }