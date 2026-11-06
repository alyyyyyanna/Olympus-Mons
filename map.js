(() => {
  "use strict";

  const select = document.getElementById("peak-select");
  const cardName = document.querySelector(".peak-card .peak-name");
  const card = document.querySelector(".peak-card");
  const infoLink = document.querySelector(".info-link");

  const map = L.map("map").setView([10.3157, 123.8854], 9);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  const markers = [];

  function peakPage(file) {
    if (!file) return "peaks-1.html";
    if (/^(https?:|peaks\/|\.\.\/)/.test(file)) return file;
    return "peaks/" + file.replace(/^\.\//, "");
  }

  function showPhoto(peak) {
    if (!peak.image) return;
    let photo = card.querySelector("img.peak-art");
    if (!photo) {
      photo = document.createElement("img");
      photo.className = "peak-art";
      const placeholder = card.querySelector(".peak-art");
      if (placeholder) placeholder.replaceWith(photo);
      else card.insertBefore(photo, cardName);
    }
    photo.src = peak.image;
    photo.alt = "Photo of " + peak.name;
  }

  function showPeak(i, fly) {
    const p = markers[i].peak;
    const page = peakPage(p.file);
    select.value = String(i);
    cardName.textContent = p.name;
    card.href = page;
    card.setAttribute("aria-label", p.name);
    infoLink.href = page;
    infoLink.setAttribute("aria-label", "More information about " + p.name);
    showPhoto(p);
    if (fly) map.flyTo([p.lat, p.lng], 13);
    markers[i].marker.openPopup();
  }

  fetch("peaks.json")
    .then((r) => {
      if (!r.ok) throw new Error("peaks.json: " + r.status);
      return r.json();
    })
    .then((data) => {
      const peaks = data.Peaks || data.peaks || [];
      peaks.forEach((p, i) => {
        const marker = L.marker([p.lat, p.lng]).addTo(map);
        const page = peakPage(p.file);
        marker.bindPopup(
          `<strong>${p.name}</strong><br><a href="${page}">More information</a>`
        );
        marker.on("click", () => showPeak(i, false));
        markers.push({ peak: p, marker });

        const opt = document.createElement("option");
        opt.value = String(i);
        opt.textContent = p.name;
        select.appendChild(opt);
      });
      if (markers.length) {
        map.fitBounds(markers.map((m) => [m.peak.lat, m.peak.lng]), { padding: [30, 30] });
      }
    })
    .catch((err) => console.error("Could not load peaks:", err));

  select.addEventListener("change", () => {
    if (select.value !== "") showPeak(Number(select.value), true);
  });
})();