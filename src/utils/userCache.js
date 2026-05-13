export const saveUserCache = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const getUserCache = () => {
    const data = localStorage.getItem("user");

    if (!data) return null;

    return JSON.parse(data);
};

export const clearUserCache = () => {
    localStorage.removeItem("user");
};
