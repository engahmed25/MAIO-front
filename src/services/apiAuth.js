import axiosClient from "./axiosClient";

const backendURL = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL:", backendURL);
// patient signUp (this return JWT as user will directly login after signUp)
export async function patientSignUp(patientData) {
    try {
        const res = await axiosClient.post(
            `${backendURL}/api/auth/register/patient`,
            patientData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return res.data; //! here we take just a success message from the API
    } catch (error) {
        throw error;
    }
}

// Doctor SignUp (this doesn't return JWT as doctor needs admin approval first)
export async function doctorSignUp(doctorData) {
    try {
        const res = await axiosClient.post(
            `${backendURL}/api/auth/register/doctor`,
            doctorData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return res.data; //! here we take just a success message from the API
    } catch (error) {
        throw error;
    }
}

// Login (both patients and doctors)
export async function login(credentials) {
    try {
        // login expects JSON credentials (email/password) so send as JSON
        const res = await axiosClient.post(
            `${backendURL}/api/auth/login`,
            credentials
        );
        return res.data; //! here we take access Token and user from the API
    } catch (error) {
        throw error;
    }
}
export async function verifyEmailApi(credentials) {
    try {
        const res = await axiosClient.post(
            `${backendURL}/api/auth/forget-password`,
            credentials
        );
        return res.data;
    } catch (error) {
        throw error;
    }
}

// Submit Reset Password (with token and new password)
export async function submitResetPassword(data) {
    try {
        const res = await axiosClient.post(
            `${backendURL}/api/auth/submit-reset-password`,
            data
        );
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function logout(accessToken) {
    try {
        const res = await axiosClient.post(
            `${backendURL}/api/auth/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        console.log("Logout response:", accessToken, res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
}
async function signup(userData) {
    try {
        const response = await axiosClient.post("/users/register", userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export { signup };
