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

type Props = {
  nivel?: Nivel;
  setOpen: (bool:boolean) => void;
  open: boolean;
};

const NivelFormDialog: React.FC<Props> = (props) => {
  const handleCloseDialog = () => {
    props.setOpen(false);
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
        <NivelForm nivel={props.nivel} onSave={handleCloseDialog}/>
    </DialogContent>
  </Dialog>
  );
};

export default NivelFormDialog;
