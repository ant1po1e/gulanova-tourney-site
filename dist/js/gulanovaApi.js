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
