gsap.registerPlugin(ScrollTrigger);

const desktopNav = document.getElementById("desktop-nav");
let isSticky = false;

function handleStickyNav(scrollY) {
    if (scrollY > 50 && !isSticky) {
        isSticky = true;
        desktopNav.classList.add("sticky", "nav-blur");
        gsap.fromTo(
            desktopNav, {
                y: -50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            }
        );
    } else if (scrollY <= 50 && isSticky) {
        isSticky = false;
        gsap.to(desktopNav, {
            y: -20,
            opacity: 0,
            duration: 0.01,
            ease: "power2.in",
            onComplete: () => {
                desktopNav.classList.remove("sticky", "nav-blur");
                gsap.set(desktopNav, {
                    y: 0,
                    opacity: 1
                });
            }
        });
    }
}

// Initial check saat halaman di-load
window.addEventListener("load", () => {
    handleStickyNav(window.scrollY);
});

// Listen saat scroll
ScrollTrigger.create({
    start: 0,
    end: "bottom bottom",
    onUpdate: (self) => {
        handleStickyNav(self.scroll());
    }
});


document.getElementById('mobile-menu-toggle').addEventListener('click', function () {
    document.getElementById('mobile-menu').classList.add('active');
});

document.getElementById('mobile-menu-close').addEventListener('click', function () {
    document.getElementById('mobile-menu').classList.remove('active');
});

document.addEventListener("DOMContentLoaded", function () {
    const openModal = document.getElementById("open-modal");
    const closeModal = document.getElementById("close-modal");
    const userModal = document.getElementById("user-modal");

    openModal.addEventListener("click", function () {
        userModal.classList.remove("hidden");
        userModal.classList.add("flex");
    });

    closeModal.addEventListener("click", function () {
        userModal.classList.add("hidden");
        userModal.classList.remove("flex");
    });

    userModal.addEventListener("click", function (event) {
        if (event.target === userModal) {
            userModal.classList.remove("flex");
            userModal.classList.add("hidden");
        }
    });
});

const buttons = [{
        id: "#staff-btn",
        section: "#staff"
    },
    {
        id: "#player-btn",
        section: "#player"
    },
    {
        id: "#mappool-btn",
        section: "#mappool"
    },
    {
        id: "#match-btn",
        section: "#match"
    },
    {
        id: "#challonge-btn",
        section: "#challonge"
    },
    {
        id: "#timeline-btn",
        section: "#timeline"
    },
    {
        id: "#procedure-btn",
        section: "#procedure"
    }
];

buttons.forEach(button => {
    $(button.id).click(function () {
        $(".section").addClass("hidden");
        $(button.section).removeClass("hidden");
    });
});

const back2Top = document.querySelector('#backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 200) {
        back2Top.classList.remove('opacity-0');
        back2Top.classList.add('opacity-100');
    } else {
        back2Top.classList.add('opacity-0');
        back2Top.classList.remove('opacity-100');
    }
});

back2Top.addEventListener('click', (e) => {
    e.preventDefault();
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});