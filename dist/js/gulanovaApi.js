function callOsuApi(endpoint) {
    const accessToken = localStorage.getItem("access_token"); // Retrieve the access token from localStorage

    return fetch(`https://gulanova-auth.vercel.app/api/osuApi?endpoint=${encodeURIComponent(endpoint)}`, {
        method: 'GET', // or 'POST', 'PUT', etc. depending on the endpoint
        headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    });
}

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

        const login = document.getElementById('login');
        const logout = document.getElementById('logout');
        login.classList.add("hidden");
        logout.classList.remove("hidden");

        const username = document.getElementById('username');
        username.innerHTML = localStorage.getItem("username");
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
