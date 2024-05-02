import axios from "axios";

const url = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "http://localhost:9000" : "https://learn-mate-zeta.vercel.app";

export const getCourses = async (id: string | null) => {
    const uri = id ? `${url}/api/courses/${id}` : `${url}/api/courses/`;
    const { data } = await axios.get(uri);
    return data;
}

export const getCourse = async (id: string) => {
    const { data } = await axios.get(`${url}/api/courses/get/${id}`);
    return data;
}

type addCourseType = {
    id: string;
    name: string;
    description: string;
    mrp: number;
    salePrice: number;
    thumbnail: string;
}

export const addCourse = async ({id, name, description, mrp, salePrice, thumbnail}: addCourseType) => {
    const { data } = await axios.post(`${url}/api/courses/${id}`, { name, description, mrp, salePrice, thumbnail }, {
        headers: {
            "authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    });
    return data;
}

export const updateCourse = async ({id, name, description, mrp, salePrice, thumbnail}: addCourseType) => {
    const { data } = await axios.put(`${url}/api/courses/${id}`, { name, description, mrp, salePrice, thumbnail }, {
        headers: {
            "authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    });
    return data;
}

export const deleteCourse = async (id: string) => {
    const { data } = await axios.delete(`${url}/api/courses/${id}`, {
        headers: {
            "authorization": sessionStorage.getItem("ACCESS_TOKEN")
        }
    });
    return data;
}