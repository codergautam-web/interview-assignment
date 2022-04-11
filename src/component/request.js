import { API_URL } from "./api"


const headers = {
    "Content-type" : "application/json"
}

export const getUserList = async () => {
    const response = await fetch(`${API_URL}users`, {
        headers,
    });
    const data = await response.json();
    return data;
}