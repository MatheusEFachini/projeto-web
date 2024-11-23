import { Nivel } from "@/types/Nivel.d";
import axios,{AxiosPromise} from "axios";

export const fetchAll = ():AxiosPromise<Nivel[]> => {
    return axios.get(`api/niveis`)
} 

export const save = (data: Nivel):AxiosPromise<Nivel> =>
    data?.id ?
    axios.put(`api/niveis/${data.id}`,data) :
    axios.post(`api/niveis`,data);

export const remove = (data: Nivel):AxiosPromise =>
    axios.delete(`api/niveis/${data.id}`);
