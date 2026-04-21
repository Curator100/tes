// Register Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .catch(() => {});
}

let deferredPrompt;

// Create top install banner
function showInstallBanner() {
  if (document.getElementById("install-banner")) return;

  const banner = document.createElement("div");
  banner.id = "install-banner";

  banner.innerHTML = `
    <span>Install this app on your phone</span>
    <button id="install-btn">Install</button>
  `;

  Object.assign(banner.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    background: "#000",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
    zIndex: "9999"
  });

  document.body.appendChild(banner);

  document.getElementById("install-btn").onclick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    deferredPrompt = null;
    banner.remove();
  };
}

// Trigger when install is available
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallBanner();
});

// Remove banner after install
window.addEventListener("appinstalled", () => {
  const banner = document.getElementById("install-banner");
  if (banner) banner.remove();
});
