function getSettingsFromURL() {
    const params = new URLSearchParams(window.location.search);
    return {
        text: params.get("text") || "",
        dotColor: params.get("dotColor") || "#000000",
        bgColor: params.get("bgColor") || "#ffffff",
        dotStyle: params.get("dotStyle") || "square",
        margin: params.get("margin") || 10,
        format: params.get("format") || "png"
    };
}

const logoInput = document.getElementById("logoInput");
const logoPreview = document.getElementById("logoPreview");

logoInput.addEventListener("change", () => {
    const file = logoInput.files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        logoPreview.src = imageURL;
        logoPreview.style.display = "block";
    } else {
        logoPreview.src = "";
        logoPreview.style.display = "none";
    }
});


const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    type: "svg",
    data: "https://example.com",
    dotsOptions: { color: "#000000", type: "rounded" },
    backgroundOptions: { color: "#ffffff" },
    imageOptions: { crossOrigin: "anonymous", margin: 10 }
});

const qrContainer = document.getElementById("qr-code");
qrCode.append(qrContainer);

function updateQR() {
    const text = document.getElementById("text").value;
    const dotColor = document.getElementById("dotColor").value;
    const bgColor = document.getElementById("bgColor").value;
    const dotStyle = document.getElementById("dotStyle").value;
    const logoInput = document.getElementById("logoInput");
    const margin = parseInt(document.getElementById("marginInput").value) || 0;

    const logoFile = logoInput.files[0];
    let imageURL = "";
    if (logoFile) {
        imageURL = URL.createObjectURL(logoFile);
    }

    qrCode.update({
        data: text,
        dotsOptions: { color: dotColor, type: dotStyle },
        backgroundOptions: { color: bgColor },
        image: imageURL || "",
        imageOptions: {
            crossOrigin: "anonymous",
            margin: margin
        }
    });
    // Relancer animation
    const qrSvg = qrContainer.querySelector("svg");
    if (qrSvg) {
        qrSvg.style.animation = "none";
        qrSvg.offsetHeight; // Trigger reflow
        qrSvg.style.animation = null;
    }

    saveSettings();
    updateFavicon(dotColor, bgColor);

}

function downloadQR() {
    const format = document.getElementById("exportFormat").value;
    qrCode.download({ name: "qr-code", extension: format });
}

function saveSettings() {
    const settings = {
        text: document.getElementById("text").value,
        dotColor: document.getElementById("dotColor").value,
        bgColor: document.getElementById("bgColor").value,
        dotStyle: document.getElementById("dotStyle").value,
        margin: document.getElementById("marginInput").value,
        format: document.getElementById("exportFormat").value
    };
    localStorage.setItem("qrSettings", JSON.stringify(settings));
    addToHistory(settings);
}

function loadSettings() {
    const urlSettings = getSettingsFromURL();
    const savedSettings = JSON.parse(localStorage.getItem("qrSettings")) || {};

    const settings = { ...savedSettings, ...urlSettings };

    document.getElementById("text").value = settings.text;
    document.getElementById("dotColor").value = settings.dotColor;
    document.getElementById("bgColor").value = settings.bgColor;
    document.getElementById("dotStyle").value = settings.dotStyle;
    document.getElementById("marginInput").value = settings.margin;
    document.getElementById("exportFormat").value = settings.format;

    updateQR();
}


window.addEventListener("DOMContentLoaded", () => {
    loadSettings();
});

function copyShareLink() {
    qrCode.getRawData("png").then(blob => {
        const file = new File([blob], "qr-code.png", { type: "image/png" });
        const fileURL = URL.createObjectURL(file);

        if (navigator.share) {
            navigator.share({
                title: "QR Code",
                text: "Voici mon QR Code !",
                files: [file]
            }).then(() => {
                document.getElementById("shareStatus").textContent = "✅ Partagé";
            }).catch(() => {
                document.getElementById("shareStatus").textContent = "❌ Échec du partage";
            });
        } else {
            navigator.clipboard.writeText(fileURL).then(() => {
                document.getElementById("shareStatus").textContent = "✅ Lien copié !";
            }).catch(() => {
                document.getElementById("shareStatus").textContent = "❌ Erreur de copie";
            });
        }

        // Nettoyage auto du blob au bout d'1 min
        setTimeout(() => URL.revokeObjectURL(fileURL), 60000);
    });
}

function updateFavicon(dotColor = "#000", bgColor = "#fff") {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 64, 64);

    ctx.fillStyle = dotColor;
    ctx.beginPath();
    ctx.arc(32, 32, 16, 0, 2 * Math.PI);
    ctx.fill();

    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
        favicon.href = canvas.toDataURL("image/png");
    } else {
        const newFavicon = document.createElement("link");
        newFavicon.rel = "icon";
        newFavicon.href = canvas.toDataURL("image/png");
        document.head.appendChild(newFavicon);
    }
}

function copySettingsLink() {
    const text = encodeURIComponent(document.getElementById("text").value);
    const dotColor = encodeURIComponent(document.getElementById("dotColor").value);
    const bgColor = encodeURIComponent(document.getElementById("bgColor").value);
    const dotStyle = document.getElementById("dotStyle").value;
    const margin = document.getElementById("marginInput").value;
    const format = document.getElementById("exportFormat").value;

    const url = `${window.location.origin}${window.location.pathname}?text=${text}&dotColor=${dotColor}&bgColor=${bgColor}&dotStyle=${dotStyle}&margin=${margin}&format=${format}`;

    navigator.clipboard.writeText(url).then(() => {
        alert("🔗 Lien copié dans le presse-papiers !");
    });
}

function addToHistory(settings) {
    let history = JSON.parse(localStorage.getItem("qrHistory")) || [];
    history.unshift(settings);
    history = history.slice(0, 10); // max 10 entrées
    localStorage.setItem("qrHistory", JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    const history = JSON.parse(localStorage.getItem("qrHistory")) || [];
    const list = document.getElementById("historyList");
    list.innerHTML = "";
    history.forEach((s, i) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `?text=${encodeURIComponent(s.text)}&dotColor=${s.dotColor}&bgColor=${s.bgColor}&dotStyle=${s.dotStyle}&margin=${s.margin}&format=${s.format}`;
        a.textContent = `${s.text}`;
        li.appendChild(a);
        list.appendChild(li);
    });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(() => console.log("✅ Service Worker enregistré"))
    .catch(err => console.error("❌ Erreur SW:", err));
}
