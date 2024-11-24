"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Nivel } from "@/types/Nivel.d";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  nivel?: Nivel;
  onSave: (value:Nivel) => void;
};

const NivelForm: React.FC<Props> = (props) => {
  const validationSchema = z.object({
    id: z.any(),
    nivel: z.string().min(2, "Min.2 caracteres").max(50, "Max 50 caracteres"),
  });

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      id: props.nivel?.id ?? undefined,
      nivel: props.nivel?.nivel ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof validationSchema>) {
    props.onSave(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nivel"
          render={({ field }) => (
            <div className="grid items-center text-left gap-2">
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  );
};

export default NivelForm;
