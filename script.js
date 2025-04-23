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

    // Wrap each word in a span instead of each letter
    text.split(" ").forEach((word) => {
        let span = document.createElement("span");
        span.textContent = word;
        span.classList.add("word");
        quote.appendChild(span);
        
        // Add space after each word (except the last one)
        quote.appendChild(document.createTextNode(" "));
    });
    
    // Animation can be added here if needed
    const words = document.querySelectorAll(".word");
    words.forEach((word, index) => {
        word.style.animationDelay = `${index * 0.1}s`;
    });
});
document.addEventListener('DOMContentLoaded', function() {
  // Create an Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start animation when the timeline is in view
        startAnimation();
        // Once the animation starts, we don't need to observe anymore
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 }); // Trigger when at least 20% of the element is visible
  
  // Start observing the timeline element
  const timeline = document.getElementById('timeline');
  observer.observe(timeline);
  
  function startAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineJoints = document.querySelectorAll('.timeline-joint');
    const timelineLine = document.querySelector('.timeline-line');
    
    // Calculate the total height of the timeline
    let totalHeight = 0;
    timelineItems.forEach((item, index) => {
      if (index < timelineItems.length - 1) {
        totalHeight += item.offsetHeight + 60; // height + margin-bottom
      } else {
        totalHeight += item.offsetHeight;
      }
    });
    
    // Animate the line to grow
    
    
    // Animate items one by one
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        // First show the item content
        item.classList.add('visible');
        
        // Then drop in the joint with a slight delay
        setTimeout(() => {
          timelineJoints[index].classList.add('visible');
        }, 200);
      }, 300 * index);
    });
  }
});

$(document).ready(function() {
  // Animate timeline progress
  setTimeout(function() {
      $("#timelineProgress").css("width", "100%");
  }, 500);
  
  // Day marker animation
  let currentDay = 1;
  const interval = setInterval(function() {
      currentDay++;
      if (currentDay <= 7) {
          $(".timeline-day").eq(currentDay-1).addClass("active");
      } else {
          clearInterval(interval);
          setTimeout(function() {
              $(".timeline-day").removeClass("active");
              $(".timeline-day").eq(0).addClass("active");
              currentDay = 1;
              $("#timelineProgress").css("width", "0");
              setTimeout(function() {
                  $("#timelineProgress").css("width", "100%");
                  animateDays();
              }, 500);
          }, 1000);
      }
  }, 800);
  
  function animateDays() {
      currentDay = 1;
      const interval = setInterval(function() {
          currentDay++;
          if (currentDay <= 7) {
              $(".timeline-day").eq(currentDay-1).addClass("active");
          } else {
              clearInterval(interval);
          }
      }, 800);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Create an Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start animation when the section is in view
        startAnimation();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 }); // Trigger when 20% is visible
  
  const timelineContainer = document.querySelector('.container');
  observer.observe(timelineContainer);

  function startAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineJoints = document.querySelectorAll('.timeline-joint');
    const timelineLine = document.querySelector('.timeline-line');

    let totalHeight = 0;
    timelineItems.forEach((item, index) => {
      if (index < timelineItems.length - 1) {
        totalHeight += item.offsetHeight + 60;
      } else {
        totalHeight += item.offsetHeight;
      }
    });

    timelineLine.style.height = `${totalHeight}px`;

    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible');
        setTimeout(() => {
          timelineJoints[index].classList.add('visible');
        }, 200);
      }, 400 * index);
    });
  }
});

//Quiz Start

document.addEventListener('DOMContentLoaded', function() {
  const mythCards = document.querySelectorAll('.myth-card');
  const questionContainer = document.getElementById('question-container');
  const resultContainer = document.getElementById('result-container');
  const currentQuestion = document.getElementById('current-question');
  const currentImage = document.getElementById('current-image');
  const radioOptions = document.querySelectorAll('input[name="answer"]');

  const correctColor = '#4caf50';
  const incorrectColor = '#f44336';

  const questionAnswers = {
    "Men and women age the same way.": "myth",
    "You start ageing before you're born.": "fact",
    "Your biological age can only move forward.": "myth",
    "Stress ages you faster than smoking.": "fact"
  };

  const questionExplanations = {
    "Men and women age the same way.": 
      "They don't. From heart disease risk to sleep quality, women age on an entirely different curve. Most research doesn't reflect that—because most of it never included them.",
    "You start ageing before you're born.":
      "Your biological baseline is shaped in the womb. A mother's stress, sleep, and nutrition can set the tone for how her child's body responds to stress decades later.",
    "Your biological age can only move forward.":
      "It doesn't have to. Studies show that improving sleep, reducing inflammation, and managing stress can reverse biological age markers in as little as 8 weeks.",
    "Stress ages you faster than smoking.":
      "Chronic stress shortens telomeres—protective caps on your DNA—faster than almost any lifestyle habit, including cigarettes. The damage is silent but measurable."
  };

  const normalize = str => str.trim().replace(/'/g, "'");

  if (mythCards.length > 0) {
    const firstCard = mythCards[0];
    currentQuestion.textContent = firstCard.querySelector('h3').textContent.trim();
    currentImage.src = firstCard.dataset.image;
    currentImage.alt = firstCard.querySelector('.card-image').alt;
  }

  mythCards.forEach(card => {
    card.addEventListener('click', function() {
      radioOptions.forEach(radio => radio.checked = false);
      resultContainer.classList.remove('show');
      resultContainer.innerHTML = '';

      const cardTitle = card.querySelector('h3').textContent.trim();
      currentQuestion.textContent = cardTitle;
      currentImage.src = card.dataset.image;
      currentImage.alt = card.querySelector('.card-image').alt;

      if (window.innerWidth < 992) {
        document.querySelector('.active-card').scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  radioOptions.forEach(radio => {
    radio.addEventListener('change', function() {
      const currentTitle = normalize(currentQuestion.textContent);
      const correctAnswer = questionAnswers[currentTitle];
      const userSelectedOption = this.value;
      const isCorrect = userSelectedOption === correctAnswer;
      const explanation = questionExplanations[currentTitle] || "";

      const feedbackMessage = isCorrect
        ? "Congratulations, that's correct!"
        : "Sorry, that's not correct.";

      resultContainer.innerHTML = `
        <div class="congrats" style="color: ${isCorrect ? correctColor : incorrectColor}; font-weight: bold;">
          ${feedbackMessage}
        </div>
        <p>${explanation}</p>
      `;
      resultContainer.classList.add('show');
    });
  });

  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('read-more')) {
      e.preventDefault();
    }
  });
});

//Quiz End

//Start pincode Available
let availablePincodes = [];
  
    // Load and transform pincodes from JSON
    fetch('pincodes.json')
      .then(response => response.json())
      .then(data => {
        // Extract the pincode numbers and convert to strings for comparison
        availablePincodes = data.map(entry => String(entry.Pincode));
      })
      .catch(error => {
        console.error("Error loading pincodes:", error);
      });
  
    function checkPincode() {
      const input = document.getElementById("pincodeInput").value.trim();
      const resultDiv = document.getElementById("result");
  
      if (availablePincodes.includes(input)) {
        resultDiv.innerHTML = `<span class="tick">✔</span><span class="available">Available</span>`;
      } else {
        resultDiv.innerHTML = `<span class="unavailable">Sorry, our services are currently unavailable at your pincode.</span>`;
      }
    }

//End Pincode Available