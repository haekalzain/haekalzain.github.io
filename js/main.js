// ===========================
// Portfolio Website - main.js
// Author: Haekal Zainputra Salahuddin
// ===========================

document.addEventListener("DOMContentLoaded", () => {
    initTypingEffect();
    initSmoothScroll();
    initCounter();
    initScrollProgress();
    initRevealAnimation();
    initNavbarActive();

});

/* =========================================
   Smooth Scroll
========================================= */

function initSmoothScroll() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}

/* =========================================
   Animated Counter
========================================= */

function initCounter() {

    const counters = document.querySelectorAll(".counter-number");

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            let current = 0;

            const duration = 1800;

            const stepTime = 20;

            const increment = target / (duration / stepTime);

            function updateCounter() {

                current += increment;

                if (current >= target) {

                    current = target;

                    if (target >= 6) {
                        counter.textContent = target + "+";
                    } else {
                        counter.textContent = target;
                    }

                    return;
                }

                counter.textContent = Math.floor(current);

                requestAnimationFrame(updateCounter);

            }

            updateCounter();

            observer.unobserve(counter);

        });

    }, {
        threshold: 0.4
    });

    counters.forEach(counter => observer.observe(counter));

}

/* =========================================
   Scroll Progress
========================================= */

function initScrollProgress() {

    const progress = document.querySelector("progress-bar");

    if (!progress) return;

    window.addEventListener("scroll", () => {

        const totalHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progressHeight =
            (window.scrollY / totalHeight) * 100;

        progress.style.width = progressHeight + "%";

    });

}

/* =========================================
   Reveal Animation
========================================= */

function initRevealAnimation() {

    const sections = document.querySelectorAll(".reveal");

    if (!sections.length) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    }, {
        threshold: 0.15
    });

    sections.forEach(section => observer.observe(section));

}

/* =========================================
   Active Navbar
========================================= */

function initNavbarActive() {

    const sections = document.querySelectorAll("section");

    const navLinks = document.querySelectorAll(".nav-menu a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 150;

            if (pageYOffset >= top) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

}

/* =========================================
   Typing Effect
========================================= */

function initTypingEffect() {

    const element = document.getElementById("typing-text");

    if (!element) return;

    const words = [
        "Android Engineer",
        "Android Developer",
        "Kotlin Developer",
        "Java Developer",
        "Mobile Engineer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            element.textContent =
                currentWord.substring(0, charIndex++);

            if (charIndex > currentWord.length) {

                deleting = true;

                setTimeout(type, 1500);

                return;
            }

        } else {

            element.textContent =
                currentWord.substring(0, charIndex--);

            if (charIndex < 0) {

                deleting = false;

                wordIndex = (wordIndex + 1) % words.length;

            }

        }

        setTimeout(type, deleting ? 40 : 80);

    }

    type();

}