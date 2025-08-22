// helpers.js
function getLocationMapLink(location, country) {
  if (!location && !country) return "#"; // fallback
  const query = encodeURIComponent(`${location || ""}, ${country || ""}`);
  return `https://www.google.com/maps?q=${query}`;
}

module.exports = { getLocationMapLink };
