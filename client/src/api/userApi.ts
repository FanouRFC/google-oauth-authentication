import { axiosInstance } from "./axiosConfig"

type userType = {
    email?: string,
    name?: string
}

export const userApi = {
    getAll : () => {return axiosInstance.get("/user")},
    getBySearch: (search: string)=>{return axiosInstance.get(`/user/${search}`)},
    add: (data: userType)=>{return axiosInstance.post("/user", data)},
    delete: (id: number)=>{return axiosInstance.delete(`/user/${id}`)},
    update: (id: number, data: userType)=>{return axiosInstance.patch(`/user/${id}`, data)}
}