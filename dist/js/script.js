window.onload = async function() {
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
        avatar.parentElement.href = "/"
        try {
            if (cachedAvatarUrl) {
                avatar.src = cachedAvatarUrl; // Use cached avatar
            } else {
                const userData = await callOsuApi('/me/osu'); // Await the API call
                avatar.src = userData.avatar_url; // Set the avatar src
                localStorage.setItem('avatar_url', userData.avatar_url); // Cache the avatar URL
            }
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    } else {
        // If neither an access token nor code is present, handle login initiation here
        console.error('No access token or OAuth code found');
    }
};

function testistwo(){
    console.log(callOsuApi('/me/osu'))
    
    }     
        

function deb(){
    var string = window.location.href
    part = string.match(/code=(.*$)/)[1];
    console.log(part)
}

$("#staff-btn").click(function () {
    $(".section").addClass("visually-hidden");  // Hide all sections
    $("#staffs").removeClass("visually-hidden"); // Show the staffs section
});

$("#player-btn").click(function () {
    $(".section").addClass("visually-hidden");  // Hide all sections
    $("#players").removeClass("visually-hidden"); // Show the players section
});

$("#mappool-btn").click(function () {
    $(".section").addClass("visually-hidden");  // Hide all sections
    $("#mappools").removeClass("visually-hidden"); // Show the mappools section
});

$("#match-btn").click(function () {
    $(".section").addClass("visually-hidden");  // Hide all sections
    $("#matches").removeClass("visually-hidden"); // Show the matches section
});


