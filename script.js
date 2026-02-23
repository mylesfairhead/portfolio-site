const modal = document.getElementById("modal");
const frame = modal.querySelector(".frame");
const closeBtn = document.getElementById("close");

function openVideo(embedUrl){
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");

  frame.innerHTML = `
    <iframe
      src="${embedUrl}"
      width="100%" height="100%"
      frameborder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowfullscreen
    ></iframe>
  `;

  // prevent background scroll
  document.body.style.overflow = "hidden";
}

function closeVideo(){
  frame.innerHTML = "";
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeVideo);

modal.addEventListener("click", (e) => {
  // clicking the dark backdrop closes; clicking the frame doesn’t
  if (e.target === modal) closeVideo();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeVideo();
});

document.querySelectorAll(".work-btn[data-embed]").forEach(btn => {
  btn.addEventListener("click", () => openVideo(btn.dataset.embed));
});