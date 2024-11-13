const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}




/* -- Scroll Wheel and Arrow Key Functionality -- */

const handleScroll = (delta) => {
  const prevPercentage = parseFloat(track.dataset.percentage) || 0;
  const nextPercentage = Math.max(Math.min(prevPercentage + delta, 0), -100);

  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 600, fill: "forwards" });

  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 600, fill: "forwards" });
  }
};

// Scroll Wheel Event
window.addEventListener("wheel", (e) => {
  const delta = e.deltaY > 0 ? -4 : 4; // Adjust speed as needed
  handleScroll(delta);
});

// Arrow Key Event
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") handleScroll(-5); // Right arrow scrolls right
  if (e.key === "ArrowLeft") handleScroll(5);   // Left arrow scrolls left
  if (e.key === "ArrowUp") handleScroll(5); //Up arrow scrolls left
  if (e.key === "ArrowDown") handleScroll(-5); //Down arrow scrolls right
});




/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);





