function calcAngle() {
    let h = parseFloat(document.getElementById("height").value);
    let l = parseFloat(document.getElementById("length").value);
    let output = document.getElementById("output");

    if (!h || !l || l <= 0) {
        output.textContent = "Introduceți valori valide!";
        output.className = "result red";
        return;
    }

    if (h > l) {
        output.textContent = "Înălțimea nu poate fi mai mare decât lungimea!";
        output.className = "result red";
        return;
    }

    let angle = Math.asin(h / l) * 180 / Math.PI;
    let verdict = "";

    if (angle <= 5.7) {
        verdict = `Unghi: ${angle.toFixed(2)}° → ✅ Accesibil`;
        output.className = "result green";
    } else if (angle <= 15) {
        verdict = `Unghi: ${angle.toFixed(2)}° → ⚠️ Parțial accesibil`;
        output.className = "result yellow";
    } else {
        verdict = `Unghi: ${angle.toFixed(2)}° → ❌ Inaccesibil`;
        output.className = "result red";
    }

    output.textContent = verdict;
}