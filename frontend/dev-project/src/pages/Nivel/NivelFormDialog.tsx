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

type Props = {
  nivel?: Nivel;
  setOpen: (bool:boolean) => void;
  open: boolean;
};

const NivelFormDialog: React.FC<Props> = (props) => {

  const {toast} = useToast();

  const saveNivel = (nivel:Nivel) => {
    NivelService.save(nivel)
    .then(() => {
      toast({title:"Sucesso", variant:"default", description:`Nível ${nivel.nivel} foi salvo`})
      props.setOpen(false);
    }).catch(e => {
        alert({
          title:"Erro ao salvar o Nivel",
          body:`${e.status} - ${e.message}`,
        })
  })
  }

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Cadastro de Nível</DialogTitle>
        <DialogDescription>
          Preenchas os dados e aperte em "Salvar"
        </DialogDescription>
      </DialogHeader>
        <NivelForm nivel={props.nivel} onSave={saveNivel}/>
    </DialogContent>
  </Dialog>
  );
};

export default NivelFormDialog;
