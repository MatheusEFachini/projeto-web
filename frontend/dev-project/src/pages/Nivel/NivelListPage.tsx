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
import { useState } from "react";
import { useConfirm } from "@/components/ui/alert-dialog-provider";
import { useToast } from "@/hooks/use-toast";

const NivelListPage = () => {
  const [open, setOpen] = useState(false);
  const [nivelSelecionado, setNivelSelecionado] = useState<Nivel>({});
  const confirm = useConfirm();
  const {toast} = useToast();

  const listNivel: Array<Nivel> = [
    {
      id: 1,
      nivel: "Junior",
    },
    {
      id: 2,
      nivel: "Pleno",
    },
    {
      id: 3,
      nivel: "Senior",
    },
  ];

  const onRemove = async (nivel: Nivel) => {
    console.log("Remover nivel => " + nivel.nivel);
    await confirm({
      title:`Deseja excluir o nível ${nivel.nivel}?`,
      body:"Essa ação não pode ser desfeita",
      actionButton:"Sim",
      cancelButton:"Não"
    }).then(res => {
      if(res)
        toast({title:"Sucesso", variant:"default", description:`Nível ${nivel.nivel} foi excluído`})
    })
  };

  function callFormDialog(nivel?: Nivel) {
    setNivelSelecionado(nivel ?? {});
    setOpen(true);
  }

  return (
    <div className="p-6 w-full mx-auto">
      <div className="border rounded-lg p-2">
        <h1 className="text-3xl font-bold">Niveis</h1>

        <NivelFormDialog
          nivel={nivelSelecionado}
          open={open}
          setOpen={setOpen}
        />

        <Table>
          <TableHeader>
            <TableHead className="flex flex-row basis-3/4">Nível</TableHead>
            <TableHead className="w-[150px]">Ações</TableHead>
          </TableHeader>
          <TableBody>
            {listNivel.map((nivel) => (
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
