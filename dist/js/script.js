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
        avatar.parentElement.href = "/"
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
        login.classList.add("d-none");
        logout.classList.remove("d-none");

        // change username
        const username = document.getElementById('username');
        username.innerHTML = localStorage.getItem("username")


    } else {
        // If neither an access token nor code is present, handle login initiation here
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

$("#staff-btn").click(function () {
    $(".section").addClass("visually-hidden");
    $("#staffs").removeClass("visually-hidden"); 
});

$("#player-btn").click(function () {
    $(".section").addClass("visually-hidden"); 
    $("#players").removeClass("visually-hidden"); 
});

$("#mappool-btn").click(function () {
    $(".section").addClass("visually-hidden"); 
    $("#mappools").removeClass("visually-hidden"); 
});

$("#match-btn").click(function () {
    $(".section").addClass("visually-hidden");
    $("#matches").removeClass("visually-hidden"); 
});

function createProfileCard(username, userId, displayName, countryFlag, countryName) {
    var profileCard = `
        <a href="https://osu.ppy.sh/users/${username}" target="_blank"
            class="col-lg-2 col-md-2 col-sm-2 profile-card rounded">
            <img src="https://a.ppy.sh/${userId}" alt="${displayName}" class="profile rounded">
            <h5>${displayName}</h5>
            <small>
                <img class="flag-icon" src="https://flagcdn.com/32x24/${countryFlag}.png" alt="${countryName}">
            </small>
        </a>
    `;
    return profileCard;
}

$("#profile-host").append(createProfileCard("revv-", "12424909", "Revv-", "id", "Indonesia"));
$("#profile-host").append(createProfileCard("danar", "11184912", "danar", "id", "Indonesia"));
$("#profile-sponsor").append(createProfileCard("revv-", "12424909", "Revv-", "id", "Indonesia"));
$("#profile-sponsor").append(createProfileCard("danar", "11184912", "danar", "id", "Indonesia"));