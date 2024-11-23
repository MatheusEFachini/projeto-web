import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";


import { useConfirm } from "@/components/ui/alert-dialog-provider";
import { getSexoSpec, Sexo } from "@/enum/Sexo.d";
import { EllipsisVertical, PlusCircle, UserMinus, UserPen } from "lucide-react";
import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";

const DesenvolvedorListPage = () => {
  const [open, setOpen] = useState(false);
  const [desenvolvedorSelecionado, setDesenvolvedorSelecionado] =
    useState<Desenvolvedor>({})
  const confirm = useConfirm();
  const {toast} = useToast();

  const listDesenvolvedor: Array<Desenvolvedor> = [
    {
      id: 1,
      nivel: { id: 1, nivel: "Junior" },
      nome: "Dev - 1",
      sexo: Sexo.MASCULINO,
      dataNascimento: new Date(1998, 4, 31),
      idade: 26,
      hobby: "Violão",
    },
    {
      id: 2,
      nivel: { id: 2, nivel: "Pleno" },
      nome: "Dev - 2",
      sexo: Sexo.FEMININO,
      dataNascimento: new Date(2001, 0, 12),
      idade: 23,
      hobby: "Games",
    },
    {
      id: 2,
      nivel: { id: 3, nivel: "Senior" },
      nome: "Dev - 3",
      sexo: Sexo.NAO_IDENTIFICADO,
      dataNascimento: new Date(1984, 4, 7),
      idade: 40,
      hobby: "Games",
    },
  ];

  const onRemove = async (dev: Desenvolvedor) => {
    console.log("Remover dev => " + dev.nome);
    await confirm({
      title:`Deseja excluir o desenvolvedor ${dev.nome}?`,
      body:"Essa ação não pode ser desfeita",
      actionButton:"Sim",
      cancelButton:"Não"
    }).then(res => {
      if(res)
        toast({title:"Sucesso", variant:"default", description:`Desenvolvedor ${dev.nome} foi excluído`})
    })
  }

  function callFormDialog(dev?: Desenvolvedor) {
    console.log("Editar dev => " + dev?.nome);
    setDesenvolvedorSelecionado(dev ?? {});
    setOpen(true);
  }

  return (
    <div className="p-6 w-full mx-auto">
      <div className="border rounded-lg p-2">
        <h1 className="text-3xl font-bold">Desenvolvedores</h1>

        <DesenvolvedorFormDialog
          dev={desenvolvedorSelecionado}
          open={open}
          setOpen={setOpen}
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
            {listDesenvolvedor.map((dev) => (
              <TableRow key={dev.id}>
                <TableCell>{dev.nome}</TableCell>
                <TableCell>{dev.nivel?.nivel}</TableCell>
                <TableCell>{getSexoSpec(dev.sexo).descricao}</TableCell>
                <TableCell>{`${dev.dataNascimento.toLocaleDateString()} (${
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
