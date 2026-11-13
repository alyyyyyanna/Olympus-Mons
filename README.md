# Olympus Mons

A static site for Cebu peaks. Each summit has a photo, a short write-up, and a map pin so you can pick a trail before you go.

Open `index.html` in a browser. No install or build step is required. The home-page search loads `peaks.json`, so that list works when the folder is served over HTTP (a local server, or GitHub Pages). Opening the file directly can block that fetch.

The map and each peak page load [Leaflet](https://leafletjs.com/) and [OpenStreetMap](https://www.openstreetmap.org/) tiles, so those pages need a network connection.

## Pages

| Page | What it does |
| --- | --- |
| `index.html` | Home. Search peaks by name and jump to a detail page. |
| `peaks-1.html`, `peaks-2.html` | The full peak list, split across two pages. |
| `map.html` | All peaks on one map. Pick a peak to move the pin and open its page. |
| `about.html` | Why the site exists. |
| `peaks/*.html` | One page per peak: photo, description, and a map of that summit. |

Shared navigation on every page: home, map, peaks, about us.

## How a peak is stored

`peaks.json` is the list the home search and the map both read. One entry looks like this:

```json
{
  "name": "Osmeña Peak",
  "file": "Opeak.html",
  "lat": 9.821087,
  "lng": 123.443591,
  "image": "images/Opeak.jpg"
}
```

`file` is the page inside `peaks/`. `image` is the photo path from the site root. `lat` and `lng` are the pin on the map.

The 16 peaks are Osmeña, Sirao, Starbuks, Kandungaw, Mauyog, Naupa, Dalas-ag, Tagaytay, Ablayan, Mago, Tabon, Lanaya, Pangilatan, Alpaco, Licos, and Lantawan.

## Add a peak

1. Put the photo in `images/`.
2. Copy an existing file in `peaks/` and update the name, photo, description, and coordinates in that copy.
3. Add a matching object to the `Peaks` array in `peaks.json`.
4. Add a card for it on `peaks-1.html` or `peaks-2.html`.

Use relative paths (`images/Opeak.jpg`, `peaks/Opeak.html`). A path that starts with `/` breaks the site when it is hosted in a project subfolder.

## Files

- `style.css` is the shared look. `styles.css` only imports it for the home page. `peaks/style.css` imports it for the detail pages.
- `script.js` fills the home search from `peaks.json`.
- `map.js` draws the map on `map.html`.
- `images/` holds the logo and peak photos.
