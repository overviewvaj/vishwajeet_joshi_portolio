
const reveals = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");
const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("section[id]");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => nav.classList.remove("open"));
    });
}

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

reveals.forEach(item => revealObserver.observe(item));

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = Number(el.dataset.target);
        let current = 0;
        const duration = 1400;
        const stepTime = Math.max(20, Math.floor(duration / target));

        const timer = setInterval(() => {
            current += Math.ceil(target / 40);
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current;
        }, stepTime);

        observer.unobserve(el);
    });
}, {
    threshold: 0.6
});

counters.forEach(counter => counterObserver.observe(counter));

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
    });
}, {
    threshold: 0.45
});

sections.forEach(section => sectionObserver.observe(section));

window.addEventListener("scroll", () => {
    const topbar = document.querySelector(".topbar");
    if (!topbar) return;

    if (window.scrollY > 20) {
        topbar.style.boxShadow = "0 10px 24px rgba(0,0,0,0.18)";
    } else {
        topbar.style.boxShadow = "none";
    }
});