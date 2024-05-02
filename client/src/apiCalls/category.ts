import axios from "axios";

const url = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "http://localhost:9000" : "https://learn-mate-server.vercel.app";

export const getAllCategories = async () => {
    const { data } = await axios.get(`${url}/api/categories/`);
    return data;
}

export const getCategory = async (id:string) => {
    const { data } = await axios.get(`${url}/api/categories/${id}`);
    return data;
}

export const addCategory = async (name:string) => {
    const { data } = await axios.post(`${url}/api/categories/`, { name }, {
        headers: {
            "authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    });
    return data;
}

type updateCategoryType = {
    id: string;
    name: string;
}

export const updateCategory = async ({id, name}:updateCategoryType) => {
    const { data } = await axios.put(`${url}/api/categories/${id}`, { name }, {
        headers: {
            "authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    });
    return data;
}

export const deleteCategory = async (id:string) => {
    const { data } = await axios.delete(`${url}/api/categories/${id}`, {
        headers: {
            "authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    });
    return data;
}