import { Nivel } from "@/types/Nivel.d";
import axios,{AxiosPromise} from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:8080"
})

export const fetchAll = ():AxiosPromise<Nivel[]> => {
    return axiosInstance.get(`api/niveis`)
} 

export const save = (data: Nivel):AxiosPromise<Nivel> =>
    data?.id ?
    axiosInstance.put(`api/niveis/${data.id}`,data) :
    axiosInstance.post(`api/niveis`,data);

export const remove = (data: Nivel):AxiosPromise =>
    axiosInstance.delete(`api/niveis/${data.id}`);
