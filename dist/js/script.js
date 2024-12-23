window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // Extract the 'code' parameter from URL
    const accessToken = localStorage.getItem('access_token');

    if (code) {
        // If there is an OAuth code, prioritize exchanging it for a new token
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
        // If there is an access token and no OAuth code, proceed with fetching user data
        const avatar = document.getElementById('avatar');


        const cachedAvatarUrl = localStorage.getItem('avatar_url');
        // avatar.parentElement.href = "/"
        try {
            if (cachedAvatarUrl) {
                avatar.src = cachedAvatarUrl; // Use cached avatar
            } else {
                const userData = await callOsuApi('/me/osu'); // Await the API call
                avatar.src = userData.avatar_url; // Set the avatar src
                localStorage.setItem('avatar_url', userData.avatar_url); // Cache the avatar URL and everything else
                localStorage.setItem("username", userData.username)
            }
        } catch (err) {
            console.error('Error fetching user data:', err);
        }

        // disable enable login button
        const login = document.getElementById('login');
        const logout = document.getElementById('logout');
        login.classList.add("hidden");
        logout.classList.remove("hidden");

        // change username
        const username = document.getElementById('username');
        username.innerHTML = localStorage.getItem("username")


    } else {
        // If neither an access token nor code is present, handle login initiation here
        console.error('No access token or OAuth code found');
    }
};

window.onload = async function () {
    // Dapatkan path URL saat ini
    const currentPath = window.location.pathname;

    // Ekstrak nama folder dari path (misalnya, "gulanocup-empat")
    const pathSegments = currentPath.split('/').filter(segment => segment !== "");
    const currentFolder = pathSegments[0]; // Folder pertama dalam path

    // Path ke file JSON
    const usersDataFile = `/${currentFolder}/json/users-data.json`;

    try {
        // Fetch data dari file JSON
        const response = await fetch(usersDataFile);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${usersDataFile}: ${response.status}`);
        }
        const usersData = await response.json();

        // Proses data JSON
        console.log("Loaded users data:", usersData);

        // Contoh: Update UI berdasarkan data JSON
        const usernameElement = document.getElementById('username');
        const userRoleElement = document.getElementById('role-display');

        if (usersData && usersData.username) {
            usernameElement.innerHTML = usersData.username;

            // Tentukan role user
            let roleDisplay = "Visitor";
            if (usersData.role === "player") {
                roleDisplay = "Player";
            } else if (usersData.role) {
                roleDisplay = "Staff";
            }
            userRoleElement.innerHTML = `You are: ${roleDisplay}`;
        }
    } catch (error) {
        console.error("Error fetching or processing JSON data:", error);
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
