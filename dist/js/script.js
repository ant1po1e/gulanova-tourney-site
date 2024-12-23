window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // Extract the 'code' parameter from URL
    const accessToken = localStorage.getItem('access_token');

    const avatar = document.getElementById('avatar');
    const login = document.getElementById('login');
    const logout = document.getElementById('logout');
    const username = document.getElementById('username');
    const userRoleElement = document.querySelector('#role-display'); 

    if (code) {
        // Exchange OAuth code for access token
        try {
            const response = await axios.get(`https://gulanova-auth.vercel.app/api/osuAuth?code=${code}`);
            if (response.data.access_token) {
                localStorage.setItem("access_token", response.data.access_token);
                window.location.href = '/'; // Redirect to clear the URL and reload
            }
        } catch (error) {
            console.error('Error during OAuth token exchange:', error);
        }
    } else if (accessToken) {
        // If access token exists, fetch user data
        try {
            const cachedAvatarUrl = localStorage.getItem('avatar_url');
            const cachedUsername = localStorage.getItem('username');
            const cachedRole = localStorage.getItem('role');

            if (cachedAvatarUrl && cachedUsername && cachedRole) {
                // Use cached data if available
                updateUI(cachedUsername, cachedRole, cachedAvatarUrl);
            } else {
                // Fetch fresh data
                const userData = await callOsuApi('/me/osu');
                const { username: fetchedUsername, role } = userData;

                avatar.src = userData.avatar_url;
                localStorage.setItem('avatar_url', userData.avatar_url);
                localStorage.setItem('username', fetchedUsername);
                localStorage.setItem('role', role);

                updateUI(fetchedUsername, role, userData.avatar_url);
            }
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    } else {
        console.error('No access token or OAuth code found');
    }

    function updateUI(usernameValue, role, avatarUrl) {
        avatar.src = avatarUrl;
        username.innerHTML = usernameValue;

        let roleDisplay = "VISITOR";
        if (role === "player") {
            roleDisplay = "PLAYER";
        } else if (role) {
            roleDisplay = "STAFF";
        }

        userRoleElement.innerHTML = `You are: ${roleDisplay}`;

        login.classList.add("hidden");
        logout.classList.remove("hidden");
    }
};

function testistwo() {
    console.log(callOsuApi('/me/osu'))

}

function deb() {
    var string = window.location.href
    part = string.match(/code=(.*$)/)[1];
    console.log(part)
}

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
