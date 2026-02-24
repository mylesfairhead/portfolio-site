document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const frame = modal ? modal.querySelector(".frame") : null;

  function closeVideo() {
    if (frame) frame.innerHTML = "";
    if (modal) {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
  }

  function openVideo(embedUrl) {
    if (!modal) return;

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");

    if (frame) {
      frame.innerHTML = `
        <iframe
          src="${embedUrl}"
          width="100%" height="100%"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
      `;
    }

    document.body.style.overflow = "hidden";
  }

  // Always start closed (prevents “stuck open”)
  closeVideo();

  // One click handler for everything (very hard to break)
  document.addEventListener("click", (e) => {
    // Close via X
    if (e.target && (e.target.id === "close" || e.target.classList.contains("modal-close"))) {
      e.preventDefault();
      closeVideo();
      return;
    }

    // Close by clicking backdrop
    if (modal && e.target === modal) {
      closeVideo();
      return;
    }

    // Open via clicking a work
    const btn = e.target.closest?.(".work-btn[data-embed]");
    if (btn) {
      openVideo(btn.dataset.embed);
    }
  });

  // ESC closes
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.hidden) closeVideo();
  });
});

/* Background slideshow */

const backgrounds = [
  "images/backgrounds/bg1.png",
  "images/backgrounds/bg2.png",
  "images/backgrounds/bg3.png",
  "images/backgrounds/bg4.png",
  "images/backgrounds/bg5.png",
  "images/backgrounds/bg6.png",
  "images/backgrounds/bg7.png",
  "images/backgrounds/bg8.png",
  "images/backgrounds/bg9.png",
  "images/backgrounds/bg10.png",
  "images/backgrounds/bg11.png",
  "images/backgrounds/bg12.png",
  "images/backgrounds/bg13.png",
  "images/backgrounds/bg14.png",
];

let current = 0;
let showingBefore = true;

// Init (set both so first fade is clean)
document.body.style.setProperty("--bg-before", `url("${backgrounds[0]}")`);
document.body.style.setProperty("--bg-after", `url("${backgrounds[1]}")`);
document.body.style.setProperty("--before-opacity", "1");
document.body.style.setProperty("--after-opacity", "0");

function tick() {
  const next = (current + 1) % backgrounds.length;

  if (showingBefore) {
    document.body.style.setProperty("--bg-after", `url("${backgrounds[next]}")`);
    document.body.style.setProperty("--after-opacity", "1");
    document.body.style.setProperty("--before-opacity", "0");
  } else {
    document.body.style.setProperty("--bg-before", `url("${backgrounds[next]}")`);
    document.body.style.setProperty("--before-opacity", "1");
    document.body.style.setProperty("--after-opacity", "0");
  }

  // brief glitch burst
  document.documentElement.classList.add("bg-glitch");
  setTimeout(() => {
    document.documentElement.classList.remove("bg-glitch");
  }, 700);

  showingBefore = !showingBefore;
  current = next;
}

// 12 seconds per image
setInterval(tick, 12000);