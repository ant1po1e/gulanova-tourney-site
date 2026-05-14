const CLIENT_ID = import.meta.env.VITE_OSU_CLIENT_ID;

export const loginWithOsu = () => {
    const authUrl =
        `https://osu.ppy.sh/oauth/authorize` +
        `?client_id=${CLIENT_ID}` +
        `&response_type=code` +
        `&scope=public+identify`;

    window.location.href = authUrl;
};

export const logout = async () => {
    try {
        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {
            await fetch(
                `https://gulanova-auth.vercel.app/api/osuApi?endpoint=${encodeURIComponent(
                    "/oauth/tokens/current",
                )}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
        }
    } catch (err) {
        console.error(err);
    }

    localStorage.clear();

    window.location.href = "/";
};
