const URI = "http://localhost:5000/api/v1";

const loginApi = async ({ email, password }) => {
    try {
        const res = await fetch(`${URI}/users/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        console.log(data);
        return data; // data.user gives the user object
    } catch (error) {
        console.log(error);
    }
};

// loginApi("one@gmail.com", "123456");

const registerApi = async ({ username, email, password, role }) => {
    try {
        const res = await fetch(`${URI}/users/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ username, email, password, role }),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("errors in api req => ", error);
    }
};

const logoutApi = async () => {
    try {
        const res = await fetch(`${URI}/users/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("errors in api req => ", error);
    }
};

const getCurrentLoggedInUser = async () => {
    try {
        const res = await fetch(`${URI}/users/getLoggedInUser`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error("Server response not ok");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error in server  response : ", error);
    }
};

const getProfile = async (user) => {
    try {
        const res = await fetch(`${URI}/users/${user}/profile`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error("Failed to load profile");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("errors in api req => ", error);
    }
};

const createProfile = async (user, formData) => {
    try {
        const res = await fetch(`${URI}/users/${user}/profile`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!res.ok) {
            throw {
                status: res.status,
                message: res.message,
            };
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("ERROR in  creating a user's profile : ", error);
    }
};

const updateProfile = async (user, updatedData) => {
    try {
        const res = await fetch(`${URI}/users/${user}/profile`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });
        if (!res.ok) {
            throw {
                status: res.status,
                message: res.message,
            };
        }
        return await res.json();
    } catch (error) {
        console.log("error while updating  the user profile : ", error);
    }
};

// registerApi("five", "five@gmail.com", "password", "9000012345");

export {
    loginApi,
    registerApi,
    logoutApi,
    getProfile,
    getCurrentLoggedInUser,
    createProfile,
    updateProfile,
};
