

/* back to top button*/

// Add scroll-to-top functionality
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' //Smooth scrolling to the top
    });
  });
  
  
  /*scroll indicator*/
  
  
  document.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);
    
    const indicator = document.getElementById("scroll-indicator");
    indicator.textContent = `${scrollPercent}`;
  });
  
  
  
  
  /*stagger*/
  
  
  function revealText() {
    const title = document.querySelector(".projecttitle"); // Adjusted class name to match your HTML
    const splitText = new SplitType(title, { types: 'chars' }); // Splits title into characters
    gsap.set(splitText.chars, { opacity: 0, y: 15 }); // Initially hides characters with offset
  
    gsap.to(splitText.chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.07, // Staggered animation for a flowing effect
        onComplete: () => {
            splitText.revert(); // Restores DOM to its original state
        }
    });
  }


  
  
  function revealDescription() {
    const descriptions = document.querySelectorAll(".descriptionbox1 p, .descriptionbox2 p, .descriptionbox3 p, .descriptionbox1 h2, .descriptionbox2 h2, .descriptionbox3 h2"); // Targets all <p> tags inside description boxes
    gsap.set(descriptions, { opacity: 0, y: -10 }); // Initially hides paragraphs with upward offset
  
    gsap.to(descriptions, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15 // how fast the animation is, configure on each
    });
  }
  
  
  
  // Function to trigger when an element scrolls into view
  function onScrollIntoView(element, callback) {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  callback();
                  observer.unobserve(entry.target); // Unobserve after the callback is triggered
              }
          });
      }, { threshold: 0.1 }); // Adjust threshold as needed
  
      observer.observe(element);
  }
  
  // Select the elements you want to observe
  const titleElement = document.querySelector(".projecttitle"); // Adjust the class name if necessary
  const descriptionElements = document.querySelectorAll(".descriptionbox1 p, .descriptionbox2 p, .descriptionbox3 p, .descriptionbox1 h2, .descriptionbox2 h2, .descriptionbox3 h2");
  
  // Trigger the reveal functions when these elements scroll into view
  onScrollIntoView(titleElement, revealText);
  descriptionElements.forEach(element => {
      onScrollIntoView(element, revealDescription);
  });
  