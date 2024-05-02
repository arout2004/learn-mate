import axios from "axios";
import { getCookie } from "cookies-next";

const url = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "http://localhost:9000" : "";

export const getLectureContent = async (id: string) => {
    const { data } = await axios.get(`${url}/api/content/${id}`);
    return data;
}

export const getContent = async (id: string) => {
    const { data } = await axios.get(`${url}/api/content/get/${id}`);
    return data;
}

type addContentType = {
    id: string;
    contentText: string;
    youtubeLink: string;
}

export const addLecture = async ({ id, contentText, youtubeLink }: addContentType) => {
    const { data } = await axios.post(`${url}/api/content/${id}`, { contentText, youtubeLink }, {
        headers: {
            "authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    });
    return data;
}

export const updateLecture = async ({ id, contentText, youtubeLink }: addContentType) => {
    const { data } = await axios.put(`${url}/api/content/${id}`, { contentText, youtubeLink }, {
        headers: {
            "authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    });
    return data;
}

export const deleteContent = async (id: string) => {
    const { data } = await axios.delete(`${url}/api/content/${id}`, {
        headers: {
            "authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    });
    return data;
}