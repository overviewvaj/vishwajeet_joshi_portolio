const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });

}, { threshold: 0.2 });

reveals.forEach(el => observer.observe(el));

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    let target = +counter.dataset.target;

    let count = 0;

    const update = () => {

        count += Math.ceil(target / 60);

        if (count >= target) {
            counter.innerText = target;
            return;
        }

        counter.innerText = count;

        requestAnimationFrame(update);

    };

    update();

});