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
        try {
            let userData;
            if (cachedAvatarUrl) {
                avatar.src = cachedAvatarUrl; // Use cached avatar
                userData = {
                    username: localStorage.getItem("username"),
                    userId: localStorage.getItem("user_id")
                };
            } else {
                userData = await callOsuApi('/me/osu'); // Await the API call
                avatar.src = userData.avatar_url; // Set the avatar src
                localStorage.setItem('avatar_url', userData.avatar_url); // Cache the avatar URL
                localStorage.setItem("username", userData.username);
                localStorage.setItem("user_id", userData.id);
            }

            // Determine user role from users-data.json
            const userRole = await determineUserRole(userData.username);
            
            // Display user role in the HTML
            const roleElement = document.getElementById('role');
            roleElement.innerHTML = `You are: ${userRole}`;

            // Update UI for logged-in user
            const usernameElement = document.getElementById('username');
            usernameElement.innerHTML = userData.username;

            // Show/hide login/logout buttons
            const login = document.getElementById('login');
            const logout = document.getElementById('logout');
            login.classList.add("hidden");
            logout.classList.remove("hidden");

        } catch (err) {
            console.error('Error fetching user data:', err);
        }

    } else {
        // If neither an access token nor code is present, handle login initiation here
        console.error('No access token or OAuth code found');
    }
};

// Function to determine user role based on JSON data
async function determineUserRole(username) {
    try {
        const response = await fetch('../../tournaments/**/users-data.json'); // Path to your users-data.json
        const usersData = await response.json();

        // Find the user in the JSON data
        const user = usersData.find(user => user.username === username);

        if (user) {
            // If user exists in JSON and has a role
            if (user.role.includes('player')) {
                return "Player";
            } else {
                return "Staff"; // If user has a role but is not just "player"
            }
        } else {
            // If user is not found in JSON
            return "Visitor";
        }
    } catch (error) {
        console.error('Error fetching users-data.json:', error);
        return "Visitor"; // Default to "Visitor" on error
    }
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
