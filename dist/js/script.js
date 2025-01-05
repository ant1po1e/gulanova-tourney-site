$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar-scrolled");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});

$("#staff-btn").click(function () {
    $(".section").addClass("hidden");
    $("#staff").removeClass("hidden");
});

$("#player-btn").click(function () {
    $(".section").addClass("hidden");
    $("#player").removeClass("hidden");
});

$("#mappool-btn").click(function () {
    $(".section").addClass("hidden");
    $("#mappool").removeClass("hidden");
});

$("#match-btn").click(function () {
    $(".section").addClass("hidden");
    $("#match").removeClass("hidden");
});

$("#challonge-btn").click(function () {
    $(".section").addClass("hidden");
    $("#challonge").removeClass("hidden");
});

$("#timeline-btn").click(function () {
    $(".section").addClass("hidden");
    $("#timeline").removeClass("hidden");
});

$("#procedure-btn").click(function () {
    $(".section").addClass("hidden");
    $("#procedure").removeClass("hidden");
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

