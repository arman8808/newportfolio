"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile, changePassword } from "./user.service";
import { useMutation } from "@tanstack/react-query";

export const useProfile = () =>
    useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
        retry: 1,
        refetchOnWindowFocus: false,
    });


export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }) => updateProfile(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
};



export const useChangePassword = () => {
    return useMutation({
        mutationFn: changePassword,
    });
};
