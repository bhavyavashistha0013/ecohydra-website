/* =========================================================
   ECOHYDRA — JAVASCRIPT
   ========================================================= */


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuToggle.textContent = "✕";
    } else {
        menuToggle.textContent = "☰";
    }
});


/* Close mobile menu after clicking a link */

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";

    });

});


/* =========================================================
   SCROLL TO TOP BUTTON
   ========================================================= */

const scrollTopButton = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        scrollTopButton.classList.add("show");
    } else {
        scrollTopButton.classList.remove("show");
    }

});


scrollTopButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   SCROLL REVEAL ANIMATION
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".problem-card, .process-card, .serve-card, .service-card, .tech-feature"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================================================
   ANIMATED IMPACT NUMBERS
   ========================================================= */

const impactNumbers = document.querySelectorAll(
    ".impact-number strong"
);

const impactObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            const element = entry.target;

            const originalText = element.textContent.trim();

            let number = parseInt(
                originalText.replace(/[^0-9]/g, ""),
                10
            );

            if (isNaN(number)) {
                return;
            }

            let suffix = "";

            if (originalText.includes("+")) {
                suffix = "+";
            }

            if (originalText.includes("KL")) {
                suffix = " KL";
            }

            let current = 0;

            const duration = 1500;
            const steps = 60;
            const increment = number / steps;
            const intervalTime = duration / steps;

            const counter = setInterval(() => {

                current += increment;

                if (current >= number) {

                    current = number;

                    clearInterval(counter);

                }

                element.textContent =
                    Math.floor(current) + suffix;

            }, intervalTime);

            impactObserver.unobserve(element);

        });

    },
    {
        threshold: 0.5
    }
);


impactNumbers.forEach((number) => {

    impactObserver.observe(number);

});
/* =====================================
   COMMON FOOTER
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    fetch("./footer.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("footer.html not found");
            }
            return response.text();
        })
        .then(data => {

            const existingFooter = document.querySelector("footer");

            if (existingFooter) {
                existingFooter.outerHTML = data;
            } else {
                document.body.insertAdjacentHTML("beforeend", data);
            }

        })
        .catch(error => {
            console.error("Footer could not be loaded:", error);
        });

});