(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());
})();
//# sourceMappingURL=nutrition-consultation.js.map
