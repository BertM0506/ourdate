const WHATSAPP_NUMBER = "6281283446636";

const CONFIG = {
    targetDate: new Date("March 28, 2026 16:00:00"),
    tripStart: new Date("March 28, 2026"),
    tripEnd: new Date("April 5, 2026"),
    loveStart: new Date("March 28, 2026"), // Bisa kamu ganti ke tanggal jadian asli kalian
    quotes: [
    // --- Sweet & Puitis ---
    "Nica, senyum kamu itu bug paling indah di hidup aku. ❤️",
    "Kamu adalah baris kode favorit yang nggak akan pernah aku hapus. ✨",
    "Jogja itu indah, tapi kamu tetap pemandangan terbaikku. 🏔️",
    "Cinta aku ke kamu itu infinite loop, nggak ada berhentinya! 🔄",
    "Nggak sabar mau pegang tangan kamu di Tugu Jogja. 📸",
    "Aku kangen kamu 💗",
    "Cepet ketemu ya 💖",
    "Jogja nanti jadi saksi kita ✨",
    "Kamu rumah aku 🏠",
    "Aku sayang kamu ❤️",
    "Terima kasih sudah lahir dan jadi bagian dari duniaku. 🌸",
    "Setiap detik sama kamu itu kayak jackpot buat aku. 🎰💖",
    "Hati aku cuma punya satu alamat: Kamu. 📍",
    "Jarak itu cuma angka, rasa sayang aku itu nyata. 🌌",

    // --- Humor & Programmer Vibes ---
    "Kamu adalah 'Success Response' dari semua doa-doa aku. ✅",
    "Kalo kamu itu CSS, kamu adalah 'important!' di hidup aku. 💎",
    "Dunia mungkin penuh error, tapi kamu adalah solusinya. 🛠️❤️",
    "Cinta kita nggak butuh debugging, sudah sempurna apa adanya. 💻✨",
    "Aku nggak butuh ChatGPT buat tau kalau aku sayang banget sama kamu. 🤖❤️",
    "Sistem hati aku cuma kompatibel sama kamu. 📱💞",

    // --- Virtual Hug & Kangen ---
    "Sending virtual hug... Loading 100%... Done! 🤗❤️",
    "Jangan capek ya kerjanya, ada aku yang selalu nungguin kamu. ✨",
    "Kalo kangen, klik tombol ini lagi ya. Aku selalu ada buat kamu. 🧸",
    "Distraksi terindah aku ya cuma chat dari kamu. 😍",
    "Sudah minum air putih belum? Jangan lupa jaga kesehatan buat trip kita! 💧",
    "Counting days... Nggak sabar mau denger suara ketawa kamu langsung. 🎤",
    "Kalau rindu itu berat, biar kita bagi dua ya di Jogja nanti. ⚖️💗",
    "Pelukan virtual ini gratis, bisa diklik kapan aja kamu mau! 🤗✨",
    "Cuma mau bilang: I love you more than yesterday. 📈💖",
    "Nica, kamu itu moodbooster paling ampuh sedunia. 🔋❤️"
]
};

const PLAN_DATES = [
    { id: "day-28", date: "2026-03-28" },
    { id: "day-29", date: "2026-03-29" },
    { id: "day-30", date: "2026-03-30" },
    { id: "day-31", date: "2026-03-31" },
    { id: "day-01", date: "2026-04-01" },
    { id: "day-02", date: "2026-04-02" },
    { id: "day-03", date: "2026-04-03" },
    { id: "day-04", date: "2026-04-04" },
    { id: "day-05", date: "2026-04-05" }
];

/* 🎬 CINEMATIC AUTO HIDE */
window.addEventListener("load", () => {
    setTimeout(() => {
        const cinematic = document.getElementById("cinematic");
        if(cinematic) {
            cinematic.style.opacity = "0";
            setTimeout(() => cinematic.style.display = "none", 1000);
        }
    }, 4000);
});

/* 🔐 VALIDATE */
function validate() {
    const pw = document.getElementById("pw").value;

    if (pw === "28032026") {
        // vibrate & confetti
        if (navigator.vibrate) navigator.vibrate(100);
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });

        // play music
        const audio = document.getElementById("bgm");
        audio.volume = 0.5;
        audio.play().catch(() => {});

        // transition
        const lockScreen = document.getElementById("lock");
        lockScreen.style.transform = "translateY(-100%)";
        
        setTimeout(() => {
            lockScreen.style.display = "none";
            const mainContent = document.getElementById("main");
            mainContent.style.display = "block";
            setTimeout(() => mainContent.style.opacity = "1", 50);
            startApp();
        }, 800);

    } else {
        alert("Kode salah, Sayang.. 🥺");
    }
}

/* 🚀 START APP */
function startApp() {
    initTimer();
    updateProgress();
    initWA();
    initHearts();
    autoChecklist();
    loveCounter();
    randomPopup();
}

/* ⏳ TIMER */
function initTimer() {
    setInterval(() => {
        const diff = CONFIG.targetDate - new Date();

        if (diff < 0) {
            ["d", "h", "m", "s"].forEach(id => document.getElementById(id).innerText = "00");
            return;
        }

        document.getElementById("d").innerText = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
        document.getElementById("h").innerText = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        document.getElementById("m").innerText = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
        document.getElementById("s").innerText = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
    }, 1000);
}

/* 📊 PROGRESS + GREETING */
function updateProgress() {
    const now = new Date();
    const diffDays = Math.ceil((CONFIG.targetDate - now) / (1000 * 60 * 60 * 24));
    const g = document.getElementById("timeGreeting");

    if (diffDays > 0) {
        g.innerText = `${diffDays} Hari Lagi Kita Ketemu 💗`;
    } else {
        g.innerText = "Enjoy Jogja, Beautiful 💖";
    }

    const total = CONFIG.tripEnd - CONFIG.tripStart;
    const progress = now - CONFIG.tripStart;
    let percent = Math.max(0, Math.min(100, (progress / total) * 100));
    document.getElementById("progress-bar").style.width = percent + "%";
}

/* ❤️ LOVE COUNTER (Check Console) */
function loveCounter() {
    const now = new Date();
    const days = Math.floor((now - CONFIG.loveStart) / (1000*60*60*24));
    console.log("Hari bersama sejak rencana:", days);
}

/* 📱 WHATSAPP */
function initWA() {
    const msg = encodeURIComponent("Sayang aku sudah lihat semuanya 💗");
    document.getElementById("waLink").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

/* ✅ AUTO CHECKLIST */
function autoChecklist() {
    const today = new Date();
    PLAN_DATES.forEach(item => {
        const el = document.getElementById(item.id);
        const planDate = new Date(item.date);
        if (el && today > planDate) {
            el.classList.add("completed-day");
        }
    });
}

/* 💗 FLOATING HEARTS */
function initHearts() {
    setInterval(() => {
        const h = document.createElement("div");
        h.innerHTML = "💗";
        h.style.cssText = `
            position:fixed;
            bottom:-50px;
            left:${Math.random()*100}vw;
            font-size:${Math.random()*20+15}px;
            opacity:${Math.random()};
            transition:4s linear;
            z-index:1;
            pointer-events:none;
        `;
        document.body.appendChild(h);
        setTimeout(() => {
            h.style.transform = "translateY(-110vh)";
            h.style.opacity = "0";
        }, 100);
        setTimeout(() => h.remove(), 4500);
    }, 800);
}

/* 💬 QUOTES */
function showNewQuote() {
    const q = document.getElementById('quoteText');
    const random = CONFIG.quotes[Math.floor(Math.random() * CONFIG.quotes.length)];
    q.style.opacity = 0;
    setTimeout(() => {
        q.innerText = random;
        q.style.opacity = 1;
    }, 300);
}

/* 📸 UPLOAD FOTO */
const uploadInput = document.getElementById("uploadPhoto");
if(uploadInput) {
    uploadInput.addEventListener("change", function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(event) {
            const div = document.createElement("div");
            div.className = "polaroid";
            div.innerHTML = `
                <div class="photo-frame">
                    <img src="${event.target.result}">
                </div>
                <div class="photo-desc">
                    <h4>Memory Baru 💖</h4>
                    <p>Moment kita ✨</p>
                </div>
            `;
            document.querySelector(".polaroid-slider").prepend(div);
        };
        reader.readAsDataURL(file);
    });
}

/* ⚠️ RANDOM KANGEN POPUP */
function randomPopup() {
    setInterval(() => {
        if (Math.random() > 0.8) {
            alert("Aku kangen kamu 💗");
        }
    }, 30000); // Muncul cek random setiap 30 detik
}

/* 📖 TOGGLE PLAN */
function togglePlan(el) {
    const details = el.querySelector('.plan-details');
    if(details) {
        details.style.display = (details.style.display === "block") ? "none" : "block";
    }
    el.classList.toggle("active");
}

/* 🎵 MUSIC FIX */
document.body.addEventListener("click", () => {
    document.getElementById("bgm").play().catch(()=>{});
}, { once: true });

/* 🎁 OVERLAY SURPRISE */
function showSurprise(){
    document.getElementById('overlay').style.display="flex";
}
function closeOverlay(){
    document.getElementById('overlay').style.display="none";
}