window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // Extract the 'code' parameter from URL
    const accessToken = localStorage.getItem('access_token');

    if (code) {
        // Proses OAuth token exchange (sama seperti sebelumnya)
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
        const usernameElement = document.getElementById('username');
        const userRoleElement = document.querySelector('#user-dropdown li div');
        const login = document.getElementById('login');
        const logout = document.getElementById('logout');

        try {
            // Dapatkan path halaman saat ini
            const currentPath = window.location.pathname;
            
            // Fetch user data dari JSON sesuai path
            const response = await fetch(`${currentPath}json/users-data.json`);
            const userData = await response.json();

            // Set avatar
            const cachedAvatarUrl = localStorage.getItem('avatar_url');
            avatar.src = cachedAvatarUrl || (await callOsuApi('/me/osu')).avatar_url;
            
            // Set username
            usernameElement.innerHTML = userData.username;

            // Tentukan role pengguna
            let userRole = 'Visitor';
            if (userData.role === 'player') {
                userRole = 'Player';
            } else if (userData.role && userData.role !== 'player') {
                userRole = 'Staff';
            }

            // Update role di dropdown
            userRoleElement.textContent = `You are: ${userRole}`;

            // Tampilkan/sembunyikan tombol login/logout
            login.classList.add("hidden");
            logout.classList.remove("hidden");

        } catch (err) {
            console.error('Error fetching user data:', err);
            // Fallback ke visitor jika ada error
            usernameElement.innerHTML = 'Guest';
            userRoleElement.textContent = 'You are: Visitor';
        }
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
