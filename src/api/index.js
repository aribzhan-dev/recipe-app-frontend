const BASE_URL = "https://recipe-app-backend-g4d0.onrender.com/api";

const getToken = () => localStorage.getItem("token");

const buildHeaders = (withBody = false) => {
    const headers = {};
    const token = getToken();

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    if (withBody) {
        headers["Content-Type"] = "application/json";
    }

    return headers;
};

const handleResponse = async (response) => {
    const data = await response.json().catch(() => null);

    if (!response.ok) {
        const message = data?.message || `HTTP error ${response.status}`;
        throw new Error(message);
    }

    return data;
};

export const api = {
    get: (path) =>
        fetch(`${BASE_URL}${path}`, {
            headers: buildHeaders(),
        }).then(handleResponse),

    post: (path, body) =>
        fetch(`${BASE_URL}${path}`, {
            method: "POST",
            headers: buildHeaders(true),
            body: JSON.stringify(body),
        }).then(handleResponse),

    put: (path, body) =>
        fetch(`${BASE_URL}${path}`, {
            method: "PUT",
            headers: buildHeaders(true),
            body: JSON.stringify(body),
        }).then(handleResponse),

    delete: (path) =>
        fetch(`${BASE_URL}${path}`, {
            method: "DELETE",
            headers: buildHeaders(),
        }).then(handleResponse),
};
