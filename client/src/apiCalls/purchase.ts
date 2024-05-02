import axios from "axios";

const url = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "http://localhost:9000" : "https://learn-mate-zeta.vercel.app";

export const getMyPurchases = async () => {
    const { data } = await axios.get(`${url}/api/purchases/`, {
        headers: {
            "authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    });
    return data;
}

export const getAllPurchases = async () => {
    const { data } = await axios.get(`${url}/api/purchases/all`, {
        headers: {
            "authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    });
    return data;
}

export const getPurchase = async (id: string) => {
    const { data } = await axios.get(`${url}/api/purchases/get/${id}`, {
        headers: {
            "authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    });
    return data;
}

export const purchaseCourse = async (id:string) => {
    const { data } = await axios.post(`${url}/api/purchases/${id}`, { }, {
        headers: {
            "authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    });
    return data;
}