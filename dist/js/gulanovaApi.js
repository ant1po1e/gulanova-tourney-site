// Fungsi untuk memanggil API Osu
function callOsuApi(endpoint) {
    const accessToken = localStorage.getItem("access_token"); // Ambil token dari localStorage

    return fetch(`https://gulanova-auth.vercel.app/api/osuApi?endpoint=${encodeURIComponent(endpoint)}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    });
}

// Fungsi utama untuk dijalankan ketika halaman selesai dimuat
window.onload = async function () {
    // Ambil parameter URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // Parameter 'code' dari OAuth
    const accessToken = localStorage.getItem('access_token');

    // Elemen DOM yang akan di-update
    const avatar = document.getElementById('avatar');
    const login = document.getElementById('login');
    const logout = document.getElementById('logout');
    const usernameElement = document.getElementById('username');
    const userRoleElement = document.getElementById('role-display');

    // Dapatkan nama folder saat ini dari path URL
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment !== "");
    const currentFolder = pathSegments[0]; // Nama folder utama
    const usersDataFile = `/${currentFolder}/json/users-data.json`; // Path ke file JSON

    if (code) {
        // Tukar kode OAuth untuk access token
        try {
            const response = await axios.get(`https://gulanova-auth.vercel.app/api/osuAuth?code=${code}`);
            if (response.data.access_token) {
                localStorage.setItem("access_token", response.data.access_token);
                window.location.href = '/'; // Redirect untuk membersihkan URL
            }
        } catch (error) {
            console.error('Error during OAuth token exchange:', error);
        }
    } else if (accessToken) {
        // Jika token akses ada, fetch data pengguna
        try {
            const cachedAvatarUrl = localStorage.getItem('avatar_url');
            const cachedUsername = localStorage.getItem('username');
            const cachedRole = localStorage.getItem('role');

            if (cachedAvatarUrl && cachedUsername && cachedRole) {
                // Gunakan data cache jika tersedia
                updateUI(cachedUsername, cachedRole, cachedAvatarUrl);
            } else {
                // Fetch data pengguna dari API
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
        // Jika tidak ada token akses atau kode OAuth, ambil data dari file JSON lokal
        try {
            const response = await fetch(usersDataFile);
            if (!response.ok) {
                throw new Error(`Failed to fetch data from ${usersDataFile}: ${response.status}`);
            }
            const usersData = await response.json();

            // Update UI berdasarkan data JSON
            if (usersData && usersData.username) {
                updateUI(usersData.username, usersData.role, "https://a.ppy.sh/guest");
            }
        } catch (error) {
            console.error("Error fetching or processing JSON data:", error);
        }
    }

    // Fungsi untuk memperbarui UI berdasarkan data pengguna
    function updateUI(usernameValue, role, avatarUrl) {
        // Update avatar, username, dan role pengguna
        avatar.src = avatarUrl;
        usernameElement.innerHTML = usernameValue;

        // Tentukan role pengguna
        let roleDisplay = "Visitor";
        if (role === "player") {
            roleDisplay = "Player";
        } else if (role) {
            roleDisplay = "Staff";
        }
        userRoleElement.innerHTML = `You are: ${roleDisplay}`;

        // Tampilkan tombol logout dan sembunyikan tombol login
        login.classList.add("hidden");
        logout.classList.remove("hidden");
    }
};
