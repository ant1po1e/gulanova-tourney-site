const CLIENT_ID = import.meta.env.VITE_OSU_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_OSU_REDIRECT_URI;

export const loginWithOsu = () => {
    const authUrl =
        `https://osu.ppy.sh/oauth/authorize` +
        `?client_id=${CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
        `&response_type=code` +
        `&scope=identify`;

    window.location.href = authUrl;
};

export const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    window.location.reload();
};

export const getStoredUser = () => {
    const user = localStorage.getItem("user");

    if (!user) return null;

    return JSON.parse(user);
};
