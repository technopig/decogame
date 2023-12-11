export const useGetUserInfo = () => {
    const { userEmail, userId, isAuth } = 
        JSON.parse(localStorage.getItem("auth")) || {};
    const token =
        localStorage.getItem("token") || {};
    return { userEmail, userId, isAuth, token };
}