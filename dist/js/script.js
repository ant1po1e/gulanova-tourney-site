async function getUserRole() {
    const currentPath = window.location.pathname; // Mendapatkan path dari URL saat ini
    const jsonEndpoint = `${currentPath}/json/users-data.json`; // URL untuk JSON

    try {
        const response = await fetch(jsonEndpoint);
        if (!response.ok) {
            throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const userData = await response.json();
        const role = userData.role;

        // Tentukan role user
        let userRole = 'Visitor';
        if (role === 'player') {
            userRole = 'Player';
        } else if (role && role !== 'player') {
            userRole = 'Staff';
        }

        // Update UI dengan role pengguna
        const roleDisplay = document.querySelector('#user-dropdown .block');
        if (roleDisplay) {
            roleDisplay.textContent = `You are: ${userRole}`;
        }

        // Jika diperlukan, simpan role ke localStorage
        localStorage.setItem('user_role', userRole);
    } catch (error) {
        console.error('Error fetching user role:', error);
    }
}

window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // Extract the 'code' parameter from URL
    const accessToken = localStorage.getItem('access_token');

    if (code) {
        try {
            const response = await axios.get(`https://gulanova-auth.vercel.app/api/osuAuth?code=${code}`);
            if (response.data.access_token) {
                localStorage.setItem("access_token", response.data.access_token);
                window.location.href = '/'; // Redirect to clear the URL and reload with new token
            }
        } catch (error) {
            console.error('Error during OAuth token exchange:', error);
        }
    } else if (accessToken) {
        const avatar = document.getElementById('avatar');
        const cachedAvatarUrl = localStorage.getItem('avatar_url');

        try {
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

        // Update login/logout button visibility
        const login = document.getElementById('login');
        const logout = document.getElementById('logout');
        login.classList.add("hidden");
        logout.classList.remove("hidden");

        // Update username display
        const username = document.getElementById('username');
        username.innerHTML = localStorage.getItem("username");

        // Periksa role pengguna
        await getUserRole();
    } else {
        console.error('No access token or OAuth code found');
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
