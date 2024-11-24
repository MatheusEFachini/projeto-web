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
import { Desenvolvedor } from "../../types/Desenvolvedor.d";
import DesenvolvedorFormDialog from "./DesenvolvedorFormDialog";
import * as DesenvolvedorService from "../../services/DesenvolvedorService";
import { useToast } from "@/hooks/use-toast";

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
      if(e.status !== 404)
        alert({
          title:"Erro ao buscar os Desenvolvedores",
          body:`${e.response?.data?.code ?? e.status} - ${e.response?.data?.cause ?? e.message}`,
        })
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

        <Table>
          <TableHeader>
            <TableHead>Desenvolvedor</TableHead>
            <TableHead>Nível</TableHead>
            <TableHead>Sexo</TableHead>
            <TableHead>Data de Nascimento</TableHead>
            <TableHead>Hobby</TableHead>
            <TableHead>Ações</TableHead>
          </TableHeader>
          <TableBody>
            {desenvolvedores.map((dev) => (
              <TableRow key={dev.id}>
                <TableCell>{dev.nome}</TableCell>
                <TableCell>{dev.nivel_id?.nivel ?? "Nenhum"}</TableCell>
                <TableCell>{getSexoSpec(dev.sexo).descricao}</TableCell>
                <TableCell>{`${dev.data_nascimento} (${
                  dev.idade
                } Anos)`}</TableCell>
                <TableCell>{dev.hobby}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => callFormDialog(dev)}>
                        <UserPen />
                        <span>Editar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onRemove(dev)}>
                        <UserMinus />
                        <span>Remover</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

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
