
let measuring = false; // flag pentru a ști dacă măsurăm cu telefonul
let measureHandler = null; // handler-ul de eveniment

// Calcul pe baza H și L
function calcAngle() {
    stopMeasure(); // Oprire măsurare dacă era activă

    let h = parseFloat(document.getElementById("height").value);
    let l = parseFloat(document.getElementById("length").value);
    let output = document.getElementById("output");
    let iconContainer = document.getElementById("icon-container");

    if (!h || !l || l <= 0) {
        output.textContent = "Introduceți valori valide!";
        output.className = "result red";
        iconContainer.innerHTML = "";
        return;
    }

    if (h > l) {
        output.textContent = "Înălțimea nu poate fi mai mare decât lungimea!";
        output.className = "result red";
        iconContainer.innerHTML = "";
        return;
    }

    let angle = Math.asin(h / l) * 180 / Math.PI;
    showVerdict(angle);
}

// Pornire măsurare cu telefonul
function startMeasure() {
    stopMeasure(); // dacă era deja activ, resetăm

    // 🔹 Ștergem câmpurile de valori introduse manual
    document.getElementById("height").value = "";
    document.getElementById("length").value = "";

    let output = document.getElementById("output");

    // Detectăm dacă e mobil
    let isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);

    if (!isMobile) {
        output.textContent = "❌ Funcția de măsurare este disponibilă doar pe telefonul mobil.";
        output.className = "result red";
        return;
    }

    // Verificăm dacă browserul suportă DeviceOrientationEvent
    if (window.DeviceOrientationEvent) {
        measureHandler = function (event) {
            let beta = event.beta;
            if (beta !== null) {
                let angle = Math.abs(beta);
                showVerdict(angle);
            }
        };
        window.addEventListener("deviceorientation", measureHandler, true);
        measuring = true;
        output.textContent = "📱 Pune telefonul pe rampă pentru a măsura unghiul...";
        output.className = "result yellow";
    } else {
        output.textContent = "❌ Browserul nu suportă senzorii de orientare.";
        output.className = "result red";
    }
}

// Oprire măsurare
function stopMeasure() {
    if (measuring && measureHandler) {
        window.removeEventListener("deviceorientation", measureHandler, true);
        measuring = false;
        measureHandler = null;
    }
}

// Funcție comună pentru afișarea verdictului
function showVerdict(angle) {
    let output = document.getElementById("output");
    let verdict = "";

    if (angle <= 5.7) {
        verdict = `Unghi: ${angle.toFixed(2)}° → ✅ Accesibil / Accessible`;
        output.className = "result green";
    } else if (angle <= 15) {
        verdict = `Unghi: ${angle.toFixed(2)}° → ⚠️ Parțial accesibil / Partially accessible`;
        output.className = "result yellow";
    } else {
        verdict = `Unghi: ${angle.toFixed(2)}° → ❌ Inaccesibil / Inaccessible`;
        output.className = "result red";
    }

    output.textContent = verdict;

}
