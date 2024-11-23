"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Desenvolvedor } from "@/types/Desenvolvedor.d";
import DesenvolvedorForm from "./DesenvolvedorForm";


type Props = {
  dev?: Desenvolvedor;
  setOpen: (bool:boolean) => void;
  open: boolean;
};

const DesenvolvedorFormDialog: React.FC<Props> = (props) => {
  const handleCloseDialog = () => {
    props.setOpen(false);
  }

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Cadastro de Desenvolvedor</DialogTitle>
        <DialogDescription>
          Preenchas os dados e aperte em "Salvar"
        </DialogDescription>
      </DialogHeader>
        <DesenvolvedorForm dev={props.dev} onSave={handleCloseDialog}/>
    </DialogContent>
  </Dialog>
  );
};

export default DesenvolvedorFormDialog;
