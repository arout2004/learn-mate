import axios from "axios";

const url = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "http://localhost:9000" : "https://learn-mate-zeta.vercel.app";

type sendOtpProps = {
    email: String;
}

export const sendOtp = async ({ email }: sendOtpProps) => {
    const { data } = await axios.post(`${url}/api/otp/send`, { email });
    return data;
}

type registerProps = {
    name: String;
    email: String;
    password: String;
    otp: number;
}

export const register = async ({ name, email, password, otp }: registerProps) => {
    const { data } = await axios.post(`${url}/api/auth/register`, { name, email, password, otp });
    return data;
}

type loginProps = {
    email: String;
    password: String;
}

export const login = async ({ email, password }: loginProps) => {
    const { data } = await axios.post(`${url}/api/auth/login`, { email, password });
    return data;
}

export const getProfile = async () => {
    const { data } = await axios.get(`${url}/api/auth/profile`, {
        headers: {
            "authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    });
    return data;
}

type updateProfilePropType = {
    name: String;
    email: String;
    dp: String | null;
}

export const updateProfile = async ({ name, email, dp }: updateProfilePropType) => {
    const { data } = await axios.put(`${url}/api/auth/profile`, { name, email, dp }, {
        headers: {
            "authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    });
    return data;
}

type updatePasswordPropType = {
    oldPassword: String;
    newPassword: String;
    confirmPassword: String;
}

export const updatePassword = async ({ oldPassword, newPassword, confirmPassword }: updatePasswordPropType) => {
    const { data } = await axios.put(`${url}/api/auth/change-password`, { oldPassword, newPassword, confirmPassword }, {
        headers: {
            "authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    });
    return data;
}

type resetPasswordPropType = {
    email: String;
    newPassword: String;
    confirmPassword: String;
    otp: number;
}

export const resetPassword = async ({ email, newPassword, confirmPassword, otp }: resetPasswordPropType) => {
    const { data } = await axios.put(`${url}/api/auth/reset-password`, { email, newPassword, confirmPassword, otp });
    return data;
}