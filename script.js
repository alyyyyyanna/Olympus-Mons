(() => {
  "use strict";

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const list = document.getElementById("peak-list");
  const form = document.querySelector(".search-form");
  const input = document.getElementById("peak-search");
  if (!list || !form || !input) return;

  let peaks = [];

  function page(file) {
    if (!file) return "peaks-1.html";
    if (/^(https?:|peaks\/|\.\.\/)/.test(file)) return file;
    return "peaks/" + file.replace(/^\.\//, "");
  }

  function render(items) {
    list.replaceChildren();
    if (!items.length) {
      const empty = document.createElement("p");
      empty.className = "search-empty";
      empty.textContent = "No peaks match that search.";
      list.append(empty);
      return;
    }

    items.forEach((peak) => {
      const link = document.createElement("a");
      link.href = page(peak.file);
      const image = document.createElement("img");
      image.src = peak.image;
      image.alt = "Photo of " + peak.name;
      const name = document.createElement("span");
      name.textContent = peak.name;
      link.append(image, name);
      list.append(link);
    });
  }

  fetch("peaks.json")
    .then((response) => {
      if (!response.ok) throw new Error("peaks.json: " + response.status);
      return response.json();
    })
    .then((data) => {
      peaks = data.Peaks || data.peaks || [];
      render(peaks);
    })
    .catch(() => {
      const empty = document.createElement("p");
      empty.className = "search-empty";
      empty.textContent = "The peak list could not be loaded.";
      list.replaceChildren(empty);
    });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value.trim().toLowerCase();
    render(peaks.filter((peak) => !query || peak.name.toLowerCase().includes(query)));
  });
})();
