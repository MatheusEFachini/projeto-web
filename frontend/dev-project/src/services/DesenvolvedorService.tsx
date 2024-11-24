import { Desenvolvedor } from "@/types/Desenvolvedor.d";
import axios,{AxiosPromise} from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:8080"
})

export const fetchAll = ():AxiosPromise<Desenvolvedor[]> => {
    return axiosInstance.get(`api/desenvolvedores`)
} 

export const save = (data: Desenvolvedor):AxiosPromise<Desenvolvedor> =>
    data?.id ?
    axiosInstance.put(`api/desenvolvedores/${data.id}`,data) :
    axiosInstance.post(`api/desenvolvedores`,data);

export const remove = (data: Desenvolvedor):AxiosPromise =>
    axiosInstance.delete(`api/desenvolvedores/${data.id}`);
