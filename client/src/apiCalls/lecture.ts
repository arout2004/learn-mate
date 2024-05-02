import axios from "axios";

const url = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "http://localhost:9000" : "https://learn-mate-server.vercel.app";

export const getLectures = async (id: string) => {
    const { data } = await axios.get(`${url}/api/lectures/${id}`);
    return data;
}

export const getLecture = async (id: string) => {
    const { data } = await axios.get(`${url}/api/lectures/get/${id}`);
    return data;
}

type addLectureType = {
    id: string;
    title: string;
    description: string;
}

export const addLecture = async ({ id, title, description }: addLectureType) => {
    const { data } = await axios.post(`${url}/api/lectures/${id}`, { title, description }, {
        headers: {
            "authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    });
    return data;
}

export const updateLecture = async ({ id, title, description }: addLectureType) => {
    const { data } = await axios.put(`${url}/api/lectures/${id}`, { title, description }, {
        headers: {
            "authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    });
    return data;
}

export const deleteLecture = async (id: string) => {
    const { data } = await axios.delete(`${url}/api/lectures/${id}`, {
        headers: {
            "authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    });
    return data;
}