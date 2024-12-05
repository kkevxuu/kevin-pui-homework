const track = document.getElementById("image-track");

// Check if a saved position exists in localStorage
const savedPosition = localStorage.getItem('trackPosition');

// If a position exists, use it; otherwise, default to -23%
const initialPosition = savedPosition !== null ? parseFloat(savedPosition) : -23;

// Set the initial position with GSAP
gsap.set(track, { xPercent: initialPosition });
track.dataset.percentage = initialPosition;

// Function to update the track's position
const updateTrackPosition = (nextPercentage) => {
  // Store the current position in localStorage
  localStorage.setItem('trackPosition', nextPercentage);

  // Update the dataset value and animate the track with GSAP
  track.dataset.percentage = nextPercentage;
  gsap.to(track, { duration: 1.5, xPercent: nextPercentage, ease: "power3.out" });
  gsap.to(track.querySelectorAll(".image"), {
    duration: 1.5,
    objectPosition: `${100 + nextPercentage * 1}% center`, // Adjust parallax effect
    ease: "power3.out"
  });
};

// Scroll handler function
const handleScroll = (delta) => {
  // Calculate the next percentage and ensure it's within the defined limits (-23 to -77)
  const nextPercentage = Math.max(
    Math.min(parseFloat(track.dataset.percentage) + delta, -23), // Upper limit
    -77 // Lower limit
  );
  updateTrackPosition(nextPercentage);
};

// Wheel event listener with a controlled delta for smooth scrolling
window.addEventListener("wheel", (e) => {
  handleScroll(e.deltaY > 0 ? -2 : 2); // Adjust delta values for scrolling speed
});

// Keydown event listener for arrow keys to control scrolling
window.addEventListener("keydown", (e) => {
  const delta = { ArrowRight: -7, ArrowLeft: 7, ArrowUp: 7, ArrowDown: -7 }[e.key];
  if (delta) handleScroll(delta);
});

// Prevent images from being dragged
document.querySelectorAll('.logolink').forEach(link => link.ondragstart = () => false);

// Ensure the track starts at the saved or default position
updateTrackPosition(initialPosition);

// Prevent zoom
document.addEventListener('wheel', function(e) {
  if (e.ctrlKey) {
    e.preventDefault(); // Prevents zooming with Ctrl + scroll
  }
}, { passive: false });

document.addEventListener('gesturestart', function(e) {
  e.preventDefault(); // Prevents pinch-to-zoom gestures
});
