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
    initMobileMenu();
    initBackToTop();

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

                    if (target > 5) {
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

    const progress = document.getElementById("progress-bar");

    if (!progress) return;

    function updateProgress() {

        const totalHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progressWidth =
            (window.scrollY / totalHeight) * 100;

        progress.style.width = progressWidth + "%";

    }

    window.addEventListener("scroll", updateProgress);

    updateProgress();

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
                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    sections.forEach(section => observer.observe(section));

}

function initNavbarActive() {

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a");

    if (!sections.length || !navLinks.length) return;

    function updateActiveMenu() {

        const scrollPosition = window.scrollY + 180;

        let current = "";

        sections.forEach(section => {

            if (
                scrollPosition >= section.offsetTop &&
                scrollPosition <
                section.offsetTop + section.offsetHeight
            ) {

                current = section.id;

            }

        });

        navLinks.forEach(link => {

            const href = link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === "#" + current
            );

        });

    }

    window.addEventListener("scroll", updateActiveMenu);

    updateActiveMenu();

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

/* =========================================
   Mobile Navigation
========================================= */

function initMobileMenu() {

    const button = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".nav-menu");

    if (!button || !menu) return;

    button.addEventListener("click", () => {
        menu.classList.toggle("active");
        button.classList.toggle("active");
    });

    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
            button.classList.remove("active");
        });
    });

    // Reset menu saat kembali ke desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1024) {
            menu.classList.remove("active");
            button.classList.remove("active");
        }
    });

}

function initBackToTop(){

    const button=document.getElementById("back-to-top");

    if(!button)return;

    function toggle(){

        if(window.scrollY>300){

            button.classList.add("show");

        }else{

            button.classList.remove("show");

        }

    }

    window.addEventListener("scroll",toggle);

    button.addEventListener("click",()=>{

        window.scrollTo({

            top:0,
            behavior:"smooth"

        });

    });

    toggle();

}