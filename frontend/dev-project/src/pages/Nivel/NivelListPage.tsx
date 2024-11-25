
import { useAlert, useConfirm } from "@/components/ui/alert-dialog-provider";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { NivelTableComponent } from "./NIvelTableComponent";
import * as NivelService from "../../services/NivelService";
import { Nivel, columnsNivel } from "../../types/Nivel.d";
import NivelFormDialog from "./NivelFormDialog";

const NivelListPage = () => {
  const [open, setOpen] = useState(false);
  const [nivelSelecionado, setNivelSelecionado] = useState<Nivel>({});
  const [niveis, setNiveis] = useState<Nivel[]>([]);
  const confirm = useConfirm();
  const alert = useAlert();
  const { toast } = useToast();

  useEffect(() => {
    getNiveis();
  }, []);

  const getNiveis = () => {
    NivelService.fetchAll()
      .then((res) => {
        setNiveis(res?.data);
      })
      .catch((e) => {
        if (e.status !== 404)
          alert({
            title: "Erro ao buscar os Níveis",
            body: `${e.response?.data?.code ?? e.status} - ${
              e.response?.data?.cause ?? e.message
            }`,
          });
      });
  };

  const onRemove = async (nivel: Nivel) => {
    await confirm({
      title: `Deseja excluir o nível ${nivel.nivel}?`,
      body: "Essa ação não pode ser desfeita",
      actionButton: "Sim",
      cancelButton: "Não",
    }).then((res) => {
      if (res) {
        NivelService.remove(nivel)
          .then(() => {
            toast({
              title: "Sucesso",
              variant: "default",
              description: `Nível ${nivel.nivel} foi excluído`,
            });
            getNiveis();
          })
          .catch((e) => {
            alert({
              title: "Erro ao remover o Nível",
              body: `${e.response?.data?.code ?? e.status} - ${
                e.response?.data?.cause ?? e.message
              }`,
            });
          });
      }
    });
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
        <h1 className="text-3xl font-bold gap5">Níveis</h1>

        <NivelFormDialog
          nivel={nivelSelecionado}
          open={open}
          setOpen={updateListAfterSave}
        />

        <NivelTableComponent 
        columns={columnsNivel} 
        data={niveis} 
        onEdit={callFormDialog} 
        onDelete={onRemove}/>

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
