import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { PlusCircle, UserMinus, UserPen } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Nivel } from "../../types/Nivel.d";
import NivelFormDialog from "./NivelFormDialog";
import { useEffect, useState } from "react";
import { useAlert, useConfirm } from "@/components/ui/alert-dialog-provider";
import { useToast } from "@/hooks/use-toast";
import * as NivelService from "../../services/NivelService";

const NivelListPage = () => {
  const [open, setOpen] = useState(false);
  const [nivelSelecionado, setNivelSelecionado] = useState<Nivel>({});
  const [niveis, setNiveis] = useState<Nivel[]>([]);
  const confirm = useConfirm();
  const alert = useAlert();
  const {toast} = useToast();
  
  useEffect(() => {
    getNiveis();
  },[]);

  const getNiveis = () => {
    NivelService.fetchAll()
    .then(res => {
      setNiveis(res?.data);
    }).catch(e => {
      if(e.status !== 404)
        alert({
          title:"Erro ao buscar os Níveis",
          body:`${e.status} - ${e.message}`,
        })
  })
  }

  const onRemove = async (nivel: Nivel) => {
    await confirm({
      title:`Deseja excluir o nível ${nivel.nivel}?`,
      body:"Essa ação não pode ser desfeita",
      actionButton:"Sim",
      cancelButton:"Não"
    }).then(res => {
      if(res) {
        NivelService.remove(nivel)
        .then(() => {
          toast({title:"Sucesso", variant:"default", description:`Nível ${nivel.nivel} foi excluído`})
          getNiveis();
        }).catch(e => {
          alert({
            title:"Erro ao remover os Níveis",
            body:e.message,
          })
        })
      }
    })
  };

  function callFormDialog(nivel?: Nivel) {
    setNivelSelecionado(nivel ?? {});
    setOpen(true);
  }

  function updateListAfterSave(dialogOpen: boolean) {
    getNiveis();
    setOpen(dialogOpen);
  }

  return (
    <div className="p-6 w-full mx-auto">
      <div className="border rounded-lg p-2">
        <h1 className="text-3xl font-bold">Níveis</h1>

        <NivelFormDialog
          nivel={nivelSelecionado}
          open={open}
          setOpen={updateListAfterSave}
        />

        <Table>
          <TableHeader>
            <TableHead className="flex flex-row basis-3/4">Descrição</TableHead>
            <TableHead className="w-[150px]">Ações</TableHead>
          </TableHeader>
          <TableBody>
            {niveis.map((nivel) => (
              <TableRow key={nivel.id}>
                <TableCell>{nivel.nivel}</TableCell>
                <TableCell>
                  <Button
                    className="px-2 mx-2"
                    size="icon"
                    onClick={() => callFormDialog(nivel)}
                  >
                    <UserPen />
                  </Button>
                  <Button
                    className="px-2 mx-2"
                    size="icon"
                    variant={"destructive"}
                    onClick={() => onRemove(nivel)}
                  >
                    <UserMinus />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between">
          <Button onClick={() => callFormDialog()}>
            <PlusCircle className="w-4 h-4 mr-2" />
            <span>Novo Nivel</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NivelListPage;
