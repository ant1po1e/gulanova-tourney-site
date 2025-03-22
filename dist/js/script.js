// Check Screen Size
function checkScreenSize() {
    return window.innerWidth >= 768;
}

// Smoother Header Navigation
document.addEventListener("DOMContentLoaded", function () {
    if (!checkScreenSize()) return;

    const header = document.querySelector("header");
    const nav = document.querySelector("nav");
    const content = document.getElementById("main-content");
    const headerOffset = header.offsetTop + header.offsetHeight;

    // Check If Scrolling Up or Down To Add Or Remove Class
    function handleScroll() {
        if (window.scrollY >= headerOffset) {
            nav.classList.add("header-fixed");
            content.classList.add("header-active");
        } else {
            nav.classList.remove("header-fixed");
            content.classList.remove("header-active");
        };
    };

    // Add Event Listener To Scroll Event To Check Header State
    window.addEventListener("scroll", handleScroll);

    // Handler If Screen Size Has Changed
    window.addEventListener("resize", function () {
        if (!checkScreenSize()) {
            window.removeEventListener("scroll", handleScroll);
        } else {
            window.addEventListener("scroll", handleScroll);
        }
    });
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
    });

    closeModal.addEventListener("click", function () {
        userModal.classList.add("hidden");
    });

    userModal.addEventListener("click", function (event) {
        if (event.target === userModal) {
            userModal.classList.add("hidden");
        }
    });
});

const buttons = [
    { id: "#staff-btn", section: "#staff" },
    { id: "#player-btn", section: "#player" },
    { id: "#mappool-btn", section: "#mappool" },
    { id: "#match-btn", section: "#match" },
    { id: "#challonge-btn", section: "#challonge" },
    { id: "#timeline-btn", section: "#timeline" },
    { id: "#procedure-btn", section: "#procedure" }
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
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
});

