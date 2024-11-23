export enum Sexo {
    MASCULINO = "M",
    FEMININO = "F",
    NAO_IDENTIFICADO = "N"
}
interface SexoValues {
    key: number,
    value: string,
    descricao: string
}
export function getSexoSpec(sexo:Sexo):SexoValues {
    switch (sexo){
        case Sexo.MASCULINO:
        return {key:1,value:"M", descricao:"Masculino"};
        case Sexo.FEMININO:
        return {key:2,value:"F", descricao:"Feminino"}
        case Sexo.NAO_IDENTIFICADO:
        return {key:3,value:"N", descricao:"Não Identificado"}
    }
}