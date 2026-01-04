import axiosClient from "@lib/axiosClient";

/* ===================== PUBLIC ===================== */
export const getAboutData = () => {
    return axiosClient.get("/about");
};

/* ===================== ADMIN ===================== */
export const updateAboutData = (data) => {
    return axiosClient.put("/about", data);
};
