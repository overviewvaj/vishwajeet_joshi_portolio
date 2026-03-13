const reveals = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");
const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("section[id]");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle) {

    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    })

}

navLinks.forEach(link => {

    link.addEventListener("click", () => {
        nav.classList.remove("open")
    })

})


const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible")

        }

    })

})

reveals.forEach(el => revealObserver.observe(el))


const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return

        const el = entry.target
        const target = Number(el.dataset.target)

        let current = 0

        const interval = setInterval(() => {

            current += Math.ceil(target / 40)

            if (current >= target) {

                current = target
                clearInterval(interval)

            }

            el.textContent = current

        }, 30)

    })

})

counters.forEach(c => counterObserver.observe(c))
