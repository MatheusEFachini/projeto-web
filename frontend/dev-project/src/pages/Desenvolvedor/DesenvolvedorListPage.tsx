import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";


import { useAlert, useConfirm } from "@/components/ui/alert-dialog-provider";
import { getSexoSpec, Sexo } from "@/enum/Sexo.d";
import { EllipsisVertical, PlusCircle, UserMinus, UserPen } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { columnsDesenvolvedor, Desenvolvedor } from "../../types/Desenvolvedor.d";
import DesenvolvedorFormDialog from "./DesenvolvedorFormDialog";
import * as DesenvolvedorService from "../../services/DesenvolvedorService";
import { useToast } from "@/hooks/use-toast";
import { DesenvolvedorTableComponent } from "./DesenvolvedorTableComponent";

const DesenvolvedorListPage = () => {
  const [open, setOpen] = useState(false);
  const [desenvolvedorSelecionado, setDesenvolvedorSelecionado] =
    useState<Desenvolvedor>({})
const [desenvolvedores, setDesenvolvedores] = useState<Desenvolvedor[]>([])

  const confirm = useConfirm();
  const alert = useAlert();
  const {toast} = useToast();

  useEffect(() => {
    getDesenvolvedores();
  },[]);

  const getDesenvolvedores = () => {
    DesenvolvedorService.fetchAll()
    .then(res => {
      setDesenvolvedores(res?.data);
    }).catch(e => {
      if(e.status == 404){
        setDesenvolvedores([])
      }else{
        alert({
          title:"Erro ao buscar os Desenvolvedores",
          body:`${e.response?.data?.code ?? e.status} - ${e.response?.data?.cause ?? e.message}`,
        })
      }
  })
  }

  const onRemove = async (dev: Desenvolvedor) => {
    await confirm({
      title:`Deseja excluir o desenvolvedor ${dev.nome}?`,
      body:"Essa ação não pode ser desfeita",
      actionButton:"Sim",
      cancelButton:"Não"
    }).then(res => {
      if(res){
        DesenvolvedorService.remove(dev)
        .then(() => {
          toast({title:"Sucesso", variant:"default", description:`Desenvolvedor ${dev.nome} foi excluído`})
          getDesenvolvedores();
        }).catch(e => {
          alert({
            title:"Erro ao remover os Níveis",
            body:`${e.response?.data?.code ?? e.status} - ${e.response?.data?.cause ?? e.message}`,
          })
        })
      }
    })
  }

  function callFormDialog(dev?: Desenvolvedor) {
    setDesenvolvedorSelecionado(dev ?? {});
    setOpen(true);
  }

  function updateListAfterSave(dialogOpen: boolean) {
    getDesenvolvedores();
    setOpen(dialogOpen);
  }

  return (
    <div className="p-6 w-full mx-auto">
      <div className="border rounded-lg p-2">
        <h1 className="text-3xl font-bold">Desenvolvedores</h1>

        <DesenvolvedorFormDialog
          dev={desenvolvedorSelecionado}
          open={open}
          setOpen={updateListAfterSave}
        />

        <DesenvolvedorTableComponent 
        columns={columnsDesenvolvedor} 
        data={desenvolvedores} 
        onEdit={callFormDialog} 
        onDelete={onRemove} />

        <div className="flex items-center justify-between">
          <Button onClick={() => callFormDialog()}>
            <PlusCircle className="w-4 h-4 mr-2" />
            <span>Novo Desenvolvedor</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesenvolvedorListPage;
