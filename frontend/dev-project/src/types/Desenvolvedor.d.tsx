import { Sexo } from "@/enum/Sexo.d";
import { Nivel } from "./Nivel.d";

export type Desenvolvedor = {
    id?: number;
    nivel_id?: Nivel;
    nome?: string;
    sexo: Sexo;
    data_nascimento: Date;
    idade?:number;
    hobby?: string;
  };
  