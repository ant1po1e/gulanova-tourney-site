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