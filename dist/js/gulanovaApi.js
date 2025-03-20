async function callOsuApi(endpoint) {
    const accessToken = localStorage.getItem("access_token");

    const response = await fetch(`https://gulanova-auth.vercel.app/api/osuApi?endpoint=${encodeURIComponent(endpoint)}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

async function fetchUserRole() {
    try {
        const loggedInUsername = localStorage.getItem("username_desktop");
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
        const userRoleElement = document.getElementById("user-role-desktop");

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

    try {
        const loggedInUsername = localStorage.getItem("username_mobile");
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
        const userRoleElement = document.getElementById("user-role-mobile");

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
            const avatar = document.getElementById('avatar_mobile');
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
        } finally
        {
            document.getElementById('login-desktop').classList.add("hidden");
            document.getElementById('logout-desktop').classList.remove("hidden");
            document.getElementById('username-desktop').innerHTML = localStorage.getItem("username");
        }

        try {
            const avatar = document.getElementById('avatar_desktop');
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
        } finally 
        {
            document.getElementById('login-mobile').classList.add("hidden");
            document.getElementById('logout-mobile').classList.remove("hidden");
            document.getElementById('username-mobile').innerHTML = localStorage.getItem("username");
        }
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