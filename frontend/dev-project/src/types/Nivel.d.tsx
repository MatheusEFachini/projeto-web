"use client"
 
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Nivel = {
    id?: number;
    nivel: string;
    quantidade_devs?: number;
  };
  

export const columnsNivel: ColumnDef<Nivel>[] = [
  {
    accessorKey:"nivel",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey:"quantidade_devs",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Qtd. Desenvolvedores
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  }
]