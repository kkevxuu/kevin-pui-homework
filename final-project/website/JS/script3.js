
  
  /*stagger*/
  
  
  function revealText() {
    const title = document.querySelector(".hello"); // Adjusted class name to match your HTML
    console.log(title);
    const splitText = new SplitType(title, { types: 'chars' }); // Splits title into characters
    gsap.set(splitText.chars, { opacity: 0, y: 15 }); // Initially hides characters with offset
  
    gsap.to(splitText.chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.02, // how fast the animation is 
        onComplete: () => {
            splitText.revert(); // Restores DOM to its original state
        }
    });
  }

  

  
  
function revealDescription() {
    const descriptions = document.querySelectorAll(".introductiontext1, .introductiontext2, .skills h3, .skills p, .activities h3, .activities p, .contact h3, .contact p"); // Targets all <p> tags inside description boxes
    gsap.set(descriptions, { opacity: 0, y: -10 }); // Initially hides paragraphs with upward offset
  
    gsap.to(descriptions, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1
    });
  }
  
  
  
  
// Trigger on page load
document.addEventListener("DOMContentLoaded", () => {
    revealText();
    revealDescription();
  });
 
  
 