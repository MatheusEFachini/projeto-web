"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Nivel } from "@/types/Nivel.d";
import NivelForm from "./NivelForm";
import * as NivelService from "../../services/NivelService";
import { useToast } from "@/hooks/use-toast";
import { useAlert } from "@/components/ui/alert-dialog-provider";

type Props = {
  nivel?: Nivel;
  setOpen: (bool:boolean) => void;
  open: boolean;
};

const NivelFormDialog: React.FC<Props> = (props) => {

  const {toast} = useToast();
  const alert = useAlert();

  const saveNivel = (nivel:Nivel) => {
    NivelService.save(nivel)
    .then(() => {
      toast({title:"Sucesso", variant:"default", description:`Nível ${nivel.nivel} foi salvo`})
      props.setOpen(false);
    }).catch(e => {
        alert({
          title:"Erro ao salvar o Nivel",
          body:`${e.response?.data?.code ?? e.status} - ${e.response?.data?.cause ?? e.message}`,
        })
  })
  }

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Cadastro de Nível</DialogTitle>
        <DialogDescription>
          Preencha os dados e aperte em "Salvar"
        </DialogDescription>
      </DialogHeader>
        <NivelForm nivel={props.nivel} onSave={saveNivel}/>
    </DialogContent>
  </Dialog>
  );
};

export default NivelFormDialog;
