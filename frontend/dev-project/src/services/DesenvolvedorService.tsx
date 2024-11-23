import { Desenvolvedor } from "@/types/Desnvolvedor.d";
import axios,{AxiosPromise} from "axios";

export const fetchAll = ():AxiosPromise<Desenvolvedor[]> => {
    return axios.get(`api/desenvolvedores`)
} 

export const save = (data: Desenvolvedor):AxiosPromise<Desenvolvedor> =>
    data?.id ?
    axios.put(`api/desenvolvedores/${data.id}`,data) :
    axios.post(`api/desenvolvedores`,data);

export const remove = (data: Desenvolvedor):AxiosPromise =>
    axios.delete(`api/desenvolvedores/${data.id}`);
