$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar-scrolled");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
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

async function fetchUserRole() {
    try {
        const loggedInUsername = localStorage.getItem("username");
        if (!loggedInUsername) {
            console.error("No logged-in username found.");
            return;
        }

        const pagePath = window.location.pathname;
        const jsonUrl = `${pagePath}/json/users-data.json`;

        const response = await fetch(jsonUrl);
        if (!response.ok) {
            throw new Error(`Error fetching JSON file: ${response.status}`);
        }

        const usersData = await response.json();
        const user = usersData.find(user => user.username === loggedInUsername);

        if (!user) {
            console.error("User not found in JSON.");
            return;
        }

        const userRole = user.role;
        const userRoleElement = document.getElementById("user-role");

        if (userRole === "player") {
            userRoleElement.textContent = "You are: PLAYER";
        } else if (userRole) {
            userRoleElement.textContent = "You are: STAFF";
        } else {
            userRoleElement.textContent = "You are: VISITOR";
        }
    } catch (error) {
        console.error("Error processing user role:", error);
    }
}

window.onload = async function () {
    await fetchUserRole();

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const accessToken = localStorage.getItem('access_token');
    const currentPath = window.location.pathname;

    if (code) {
        try {
            const response = await axios.get(`https://gulanova-auth.vercel.app/api/osuAuth?code=${code}`);
            if (response.data.access_token) {
                localStorage.setItem("access_token", response.data.access_token);
                window.location.href = currentPath;
            }
        } catch (error) {
            console.error('Error during OAuth token exchange:', error);
        }
    } else if (accessToken) {
        try {
            const avatar = document.getElementById('avatar');
            const cachedAvatarUrl = localStorage.getItem('avatar_url');
            if (cachedAvatarUrl) {
                avatar.src = cachedAvatarUrl;
            } else {
                const userData = await callOsuApi('/me/osu');
                avatar.src = userData.avatar_url;
                localStorage.setItem('avatar_url', userData.avatar_url);
                localStorage.setItem("username", userData.username);
            }
        } catch (err) {
            console.error('Error fetching user data:', err);
        }

        document.getElementById('login').classList.add("hidden");
        document.getElementById('logout').classList.remove("hidden");
        document.getElementById('username').innerHTML = localStorage.getItem("username");
    } else {
        console.error('No access token or OAuth code found');
    }
};

function testistwo() {
    console.log(callOsuApi('/me/osu'));
}

function deb() {
    const string = window.location.href;
    const part = string.match(/code=(.*$)/)[1];
    console.log(part);
}

