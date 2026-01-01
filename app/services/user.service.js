// @app/services/user.service.js
import axiosClient from "@lib/axiosClient";

export const getProfile = () => {
    return axiosClient.get("/user/profile");
};

export const updateProfile = (id, payload) => {
    return axiosClient.patch(`/user/${id}`, payload);
};

export const changePassword = (payload) => {
    return axiosClient.post("/user/change-password", payload);
};
