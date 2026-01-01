"use client";

import { motion } from "framer-motion";
import { User, Mail, Lock, Shield, Save, Key, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useProfile, useUpdateProfile, useChangePassword } from "@app/services/user.queries";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const { data: userProfile, isLoading } = useProfile();
    const updateProfileMutation = useUpdateProfile();
    const changePasswordMutation = useChangePassword();

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        isTwoFactorEnabled: false,
    });

    const [originalUserInfo, setOriginalUserInfo] = useState(null);

    useEffect(() => {
        if (userProfile) {
            const initialData = {
                name: userProfile.name || "",
                email: userProfile.email || "",
                isTwoFactorEnabled: userProfile.isTwoFactorEnabled || false,
            };
            setUserInfo(initialData);
            setOriginalUserInfo(initialData);
        }
    }, [userProfile]);

    const isDirty = originalUserInfo && (
        userInfo.name !== originalUserInfo.name ||
        userInfo.isTwoFactorEnabled !== originalUserInfo.isTwoFactorEnabled
    );

    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: "",
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    // Validation for password change
    const isPasswordValid =
        passwords.current &&
        passwords.new &&
        passwords.confirm &&
        passwords.new.length >= 8 &&
        passwords.new === passwords.confirm;

    const handleInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleToggle2FA = () => {
        setUserInfo((prev) => ({ ...prev, isTwoFactorEnabled: !prev.isTwoFactorEnabled }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prev) => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSaveInfo = (e) => {
        e.preventDefault();

        if (!isDirty || !userInfo.name.trim()) return;

        updateProfileMutation.mutate(
            {
                id: userProfile?.id || userProfile?._id, // Assuming ID is available in profile data
                payload: {
                    name: userInfo.name,
                    isTwoFactorEnabled: userInfo.isTwoFactorEnabled
                }
            },
            {
                onSuccess: () => {
                    console.log("Profile updated successfully");
                    toast.success("Profile information updated!");
                    // Update original info to current to reset check
                    setOriginalUserInfo(userInfo);
                },
                onError: (error) => {
                    console.error("Failed to update profile", error);
                    toast.error("Failed to update profile. Please try again.");
                }
            }
        );
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();

        if (!isPasswordValid) return;

        changePasswordMutation.mutate(
            {
                currentPassword: passwords.current,
                newPassword: passwords.new,
                confirmPassword: passwords.confirm
            },
            {
                onSuccess: () => {
                    toast.success("Password updated successfully!");
                    setPasswords({ current: "", new: "", confirm: "" });
                },
                onError: (error) => {
                    console.error("Failed to update password", error);
                    const errorMessage = error?.message || "Failed to update password. Please check your current password.";
                    toast.error(errorMessage);
                }
            }
        );
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden"
            >
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
                    <p className="text-blue-100 text-lg">
                        Manage your account information and security settings
                    </p>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/10 to-transparent" />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <User className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Personal Information
                        </h2>
                    </div>

                    <form onSubmit={handleSaveInfo} className="space-y-6">
                        <div className="space-y-4">
                            {/* Name Field */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={userInfo.name}
                                        onChange={handleInfoChange}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Enter your name"
                                    />
                                </div>
                            </div>

                            {/* Email Field (Read Only) */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={userInfo.email}
                                        disabled
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">
                                    Email cannot be changed. Please contact support for assistance.
                                </p>
                            </div>

                            {/* 2FA Toggle */}
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg shadow-sm text-purple-600">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">
                                                Two-Factor Authentication
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                Add an extra layer of security
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleToggle2FA}
                                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${userInfo.isTwoFactorEnabled ? "bg-blue-600" : "bg-gray-200"
                                            }`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${userInfo.isTwoFactorEnabled
                                                ? "translate-x-5"
                                                : "translate-x-0"
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={!isDirty || !userInfo.name.trim() || updateProfileMutation.isLoading}
                                className={`flex items-center justify-center w-full px-4 py-2 rounded-lg font-medium transition-colors ${!isDirty || !userInfo.name.trim() || updateProfileMutation.isLoading
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    }`}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {updateProfileMutation.isLoading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Security Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <Key className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Change Password
                        </h2>
                    </div>

                    <form onSubmit={handleUpdatePassword} className="space-y-6">
                        <div className="space-y-4">
                            {/* Current Password */}
                            <div>
                                <label
                                    htmlFor="current"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Current Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type={showPasswords.current ? "text" : "password"}
                                        id="current"
                                        name="current"
                                        value={passwords.current}
                                        onChange={handlePasswordChange}
                                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                                        placeholder="Enter current password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility("current")}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                    >
                                        {showPasswords.current ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* New Password */}
                            <div>
                                <label
                                    htmlFor="new"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    New Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type={showPasswords.new ? "text" : "password"}
                                        id="new"
                                        name="new"
                                        value={passwords.new}
                                        onChange={handlePasswordChange}
                                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                                        placeholder="Enter new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility("new")}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                    >
                                        {showPasswords.new ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label
                                    htmlFor="confirm"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type={showPasswords.confirm ? "text" : "password"}
                                        id="confirm"
                                        name="confirm"
                                        value={passwords.confirm}
                                        onChange={handlePasswordChange}
                                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                                        placeholder="Confirm new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility("confirm")}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                    >
                                        {showPasswords.confirm ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={!isPasswordValid || changePasswordMutation.isLoading}
                                className={`flex items-center justify-center w-full px-4 py-2 rounded-lg font-medium transition-colors ${!isPasswordValid || changePasswordMutation.isLoading
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    }`}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {changePasswordMutation.isLoading ? "Updating..." : "Update Password"}
                            </button>
                        </div>

                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                            <p className="text-xs text-yellow-700">
                                <span className="font-bold">Note:</span> Changing your password will sign you out of all other active sessions securely.
                            </p>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
