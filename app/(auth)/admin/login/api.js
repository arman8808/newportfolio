import axiosClient from "@lib/axiosClient";

export function adminLogin(payload) {
  return axiosClient.post("/auth/login", payload);
}
export function adminLogout() {
  return axiosClient.post("/auth/logout");
}
