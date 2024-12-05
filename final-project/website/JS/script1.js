const track = document.getElementById("image-track");

//so GSAP sets the initial position correctly
gsap.set(track, { xPercent: -23 }); // Initial scroll position at -23%
track.dataset.percentage = -23; //starting value for the dataset

// Function to update the track's position
const updateTrackPosition = (nextPercentage) => {
  // Updating the dataset value and animate the track with GSAP
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

//wheel event listener with a controlled delta for smooth scrolling
window.addEventListener("wheel", (e) => {
  // Adjust the delta values (-2, 2) for scrolling speed
  handleScroll(e.deltaY > 0 ? -2 : 2);
});

//keydown event listener for arrow keys to control scrolling
window.addEventListener("keydown", (e) => {
  const delta = { ArrowRight: -7, ArrowLeft: 7, ArrowUp: 7, ArrowDown: -7 }[e.key];
  if (delta) handleScroll(delta);
});







// Prevent images from being dragged
document.querySelectorAll('.logolink').forEach(link => link.ondragstart = () => false);

//an initial call to `updateTrackPosition` to confirm the starting position
updateTrackPosition(-23);








/* prevent zoom */

document.addEventListener('wheel', function(e) {
  if (e.ctrlKey) {
    e.preventDefault(); // Prevents zooming with Ctrl + scroll
  }
}, { passive: false });

document.addEventListener('gesturestart', function(e) {
  e.preventDefault(); //Prevents pinch-to-zoom gestures
});

