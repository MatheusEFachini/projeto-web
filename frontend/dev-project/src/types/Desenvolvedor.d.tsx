import { Sexo } from "@/enum/Sexo.d";
import { Nivel } from "./Nivel.d";

export type Desenvolvedor = {
    id?: number;
    nivel?: Nivel;
    nome?: string;
    sexo: Sexo;
    dataNascimento: Date;
    idade?:number;
    hobby?: string;
  };
  