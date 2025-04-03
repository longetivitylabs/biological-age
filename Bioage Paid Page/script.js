document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth"
        });
      }
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    const quote = document.querySelector(".quote");
    const text = quote.textContent;
    quote.innerHTML = ""; // Clear text

    // Wrap each letter in a span
    text.split("").forEach((char) => {
        let span = document.createElement("span");
        span.textContent = char;
        span.classList.add("char");
        quote.appendChild(span);
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const chars = document.querySelectorAll(".char");
                    chars.forEach((char, i) => {
                        setTimeout(() => {
                            char.classList.add("visible");
                        }, i * 50);
                    });
                    observer.disconnect(); // Stop observing after animation
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% visible
    );

    observer.observe(quote);
});  