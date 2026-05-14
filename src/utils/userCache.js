export const saveUserCache = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const getUserCache = () => {
    const user = localStorage.getItem("user");

    if (!user) return null;

    return JSON.parse(user);
};

export const clearUserCache = () => {
    localStorage.removeItem("user");
};
