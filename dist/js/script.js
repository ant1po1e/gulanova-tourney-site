const nav = document.getElementById("desktop-nav");

window.addEventListener("scroll", () => {
    const rect = nav.getBoundingClientRect();

    if (rect.top <= 0) {
        nav.classList.remove("backdrop-blur-none");
        nav.classList.add("backdrop-blur-md");
    } else {
        nav.classList.add("backdrop-blur-none");
        nav.classList.remove("backdrop-blur-md");
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