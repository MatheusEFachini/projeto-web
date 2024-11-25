"use client"
 
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserMinus, UserPen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
 
interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  onEdit: (value:TData) => void;
  onDelete: (value:TData) => void;
}
 
export function CommonTableComponent<TData, TValue>({
  columns,
  data,
  onEdit,
  onDelete

}: Props<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state:{
      sorting:sorting
    }
  })

  return (
    <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => 
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                    return(
                        <TableHead key={header.id}>
                            {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header,header.getContext())}
                        </TableHead>
                    )
                })}
                <TableHead className="w-[150px]">Ações</TableHead>
              </TableRow>
            )}
            
          </TableHeader>
          <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    className="px-2 mx-2"
                    size="icon"
                    onClick={() => onEdit(row.original)}
                  >
                    <UserPen />
                  </Button>
                  <Button
                    className="px-2 mx-2"
                    size="icon"
                    variant={"destructive"}
                    onClick={() => onDelete(row.original)}
                  >
                    <UserMinus />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhum resultado encontrado.
              </TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
  )}