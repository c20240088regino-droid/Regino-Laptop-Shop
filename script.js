const darkModeToggle = document.querySelector("#darkModeToggle");

darkModeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    darkModeToggle.setAttribute("aria-pressed", String(isDark));
    darkModeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
});

const contactForm = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formNote.textContent = "This demo form isn't connected to a mailbox yet.";
});

if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const motionSettings = gsap.matchMedia();
    motionSettings.add("(prefers-reduced-motion: no-preference)", () => {
        // A smooth power ease makes the short intro feel calm rather than abrupt.
        const intro = gsap.timeline({
            defaults: { duration: 0.65, ease: "power3.out" }
        });

        intro
            .from(".hero .eyebrow", { y: 16, opacity: 0 })
            .from("#hero-title", { y: 28, opacity: 0 }, "-=0.35")
            .from(".hero-copy-wrap > p", { y: 18, opacity: 0 }, "-=0.35")
            .from(".hero-buttons .button", { y: 14, opacity: 0, stagger: 0.12 }, "-=0.35")
            .from(".hero-visual", { x: 24, scale: 0.97, opacity: 0 }, "-=0.8");

        const replayButton = document.querySelector("#replayBtn");
        const replayIntro = () => intro.restart();
        replayButton.addEventListener("click", replayIntro);

        document.querySelectorAll(".reveal").forEach((section) => {
            // Power easing keeps scroll reveals gentle and easy to follow.
            gsap.fromTo(section, { y: 28, opacity: 0 }, {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 84%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        gsap.to("#progressBar", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.25
            }
        });

        return () => replayButton.removeEventListener("click", replayIntro);
    });
}
