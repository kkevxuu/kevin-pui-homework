// PARALLAX TRACK

const track = document.getElementById("image-track");

// check saved position in localStorage

const savedPosition = localStorage.getItem("trackPosition");
const initialPosition = savedPosition !== null ? parseFloat(savedPosition) : -23;

// set the initial position with GSAP

gsap.set(track, { xPercent: initialPosition });
track.dataset.percentage = initialPosition;

// update the track's position

const updateTrackPosition = (nextPercentage) => {
  // store current position in localStorage
  localStorage.setItem("trackPosition", nextPercentage);
  track.dataset.percentage = nextPercentage;
  gsap.to(track, { duration: 1.5, xPercent: nextPercentage, ease: "power3.out" });
  gsap.to(track.querySelectorAll(".image"), {
    duration: 1.5,
    objectPosition: `${100 + nextPercentage * 1}% center`, // adjust parallax effect
    ease: "power3.out"
  });
};

// scrolling function

const handleScroll = (delta) => {
  const nextPercentage = Math.max(
    Math.min(parseFloat(track.dataset.percentage) + delta, -23), // upper limit
    -77 // lower limit
  );
  updateTrackPosition(nextPercentage);
};

// scrollwheel event listener

window.addEventListener("wheel", (e) => {
  handleScroll(e.deltaY > 0 ? -2 : 2); // adjust scrolling speed
});

// arrowkeys event listener

window.addEventListener("keydown", (e) => {
  const delta = { ArrowRight: -7, ArrowLeft: 7, ArrowUp: 7, ArrowDown: -7 }[e.key];
  if (delta) handleScroll(delta);
});

// update to ensure track starts at the saved or default position

updateTrackPosition(initialPosition);

// PAGE BEHAVIOR 

// to prevent images from being dragged

document.querySelectorAll(".logolink").forEach(link => link.ondragstart = () => false);

// prevent zoom

document.addEventListener("wheel", function(e) {
  if (e.ctrlKey) {
    e.preventDefault(); // for ctrl + scroll
  }
}, { passive: false });

document.addEventListener("gesturestart", function(e) {
  e.preventDefault(); // for pinch to zoom
});
