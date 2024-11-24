"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Desenvolvedor } from "@/types/Desenvolvedor.d";
import * as DesenvolvedorService from "../../services/DesenvolvedorService";
import DesenvolvedorForm from "./DesenvolvedorForm";
import { useAlert } from "@/components/ui/alert-dialog-provider";


type Props = {
  dev?: Desenvolvedor;
  setOpen: (bool:boolean) => void;
  open: boolean;
};

const DesenvolvedorFormDialog: React.FC<Props> = (props) => {

  const alert = useAlert();
  const {toast} = useToast();

  const saveDesenvolvedor = (dev:Desenvolvedor) => {
    DesenvolvedorService.save(dev)
    .then(() => {
      toast({title:"Sucesso", variant:"default", description:`Desenvolvedor ${dev.nome} foi salvo`})
      props.setOpen(false);
    }).catch(e => {
        alert({
          title:"Erro ao salvar o Desenvolvedor",
          body:`${e.response?.data?.code ?? e.status} - ${e.response?.data?.cause ?? e.message}`,
        })
  })
  }

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Cadastro de Desenvolvedor</DialogTitle>
        <DialogDescription>
          Preencha os dados e aperte em "Salvar"
        </DialogDescription>
      </DialogHeader>
        <DesenvolvedorForm dev={props.dev} onSave={saveDesenvolvedor}/>
    </DialogContent>
  </Dialog>
  );
};

export default DesenvolvedorFormDialog;
