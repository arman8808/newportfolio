import axiosClient from "@lib/axiosClient";

/* ===================== PUBLIC ===================== */
export const getHeroData = () => {
    return axiosClient.get("/hero");
};

/* ===================== ADMIN ===================== */
export const updateHeroData = (data) => {
    return axiosClient.put("/hero", data);
};
