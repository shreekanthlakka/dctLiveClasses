const URI = "http://localhost:5000/api/v1";

const createJobApi = async (obj) => {
    try {
        const res = await fetch(`${URI}/jobs`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(obj),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("errors in api req => ", error);
    }
};

const editJobApi = async (id, obj) => {
    try {
        const res = await fetch(`${URI}/jobs/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(obj),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("errors in api req => ", error);
    }
};

const deleteJobApi = async (id) => {
    try {
        const res = await fetch(`${URI}/jobs/${id}`, {
            method: "DELETE",
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

const getSingleJobDetailsApi = async (id) => {
    try {
        const res = await fetch(`${URI}/jobs/${id}`, {
            method: "GET",
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

const getAllJobDetailsApi = async () => {
    try {
        const res = await fetch(`${URI}/jobs/myjobpostings`, {
            method: "GET",
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

const getAllJobDetailsOpenApi = async () => {
    try {
        const res = await fetch(`${URI}/jobs`, {
            method: "GET",
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

//get all applications belonging to particular Id

const getApplicationsByJobId = async (jobId) => {
    try {
        const res = await fetch(`${URI}/jobs/${jobId}/applications`, {
            method: "GET",
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

const getSingleApplicationByJobId = async (jobId, appId) => {
    try {
        const res = await fetch(`${URI}/jobs/${jobId}/applications/${appId}`, {
            method: "GET",
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

const updateApplicationByJobId = async (jobId, appId, newUpdatedObj) => {
    try {
        const res = await fetch(`${URI}/jobs/${jobId}/applications/${appId}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(newUpdatedObj),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("errors in api req => ", error);
    }
};

export {
    createJobApi,
    editJobApi,
    deleteJobApi,
    getSingleJobDetailsApi,
    getAllJobDetailsApi,
    getAllJobDetailsOpenApi,
    getApplicationsByJobId,
    getSingleApplicationByJobId,
    updateApplicationByJobId,
};
