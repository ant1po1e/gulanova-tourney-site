export const callOsuApi = async (endpoint) => {
    const accessToken = localStorage.getItem("access_token");

    const response = await fetch(
        `https://gulanova-auth.vercel.app/api/osuApi?endpoint=${encodeURIComponent(
            endpoint,
        )}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed fetching osu! API");
    }

    return response.json();
};
