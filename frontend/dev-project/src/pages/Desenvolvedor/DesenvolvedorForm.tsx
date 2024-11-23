"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getSexoSpec, Sexo } from "@/enum/Sexo.d";
import { cn } from "@/lib/utils";
import { Desenvolvedor } from "@/types/Desenvolvedor.d";
import { Nivel } from "@/types/Nivel.d";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  dev?: Desenvolvedor;
  onSave: () => void;
};

const DesenvolvedorForm: React.FC<Props> = (props) => {
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

  const validationSchema = z.object({
    id: z.any(),
    nome: z.string().min(2, "Min.2 caracteres"),
    nivel_id: z.any(),
    sexo: z.nativeEnum(Sexo),
    data_nascimento: z.string().date(),
    hobby: z.any(),
  });

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      id: props.dev?.id ?? undefined,
      nome: props.dev?.nome ?? "",
      nivel_id: props.dev?.nivel?.id ?? undefined,
      sexo: props.dev?.sexo ?? Sexo.NAO_IDENTIFICADO,
      data_nascimento: props.dev?.dataNascimento
        ? format(props.dev?.dataNascimento, "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd"),
      hobby: props.dev?.hobby ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof validationSchema>) {
    console.log(JSON.stringify(values) + " - SALVO");
    props.onSave();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <div className="grid items-center text-left gap-2">
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="nivel_id"
          render={({ field }) => (
            <div className="grid items-center text-left gap-2">
              <FormItem>
                <FormLabel>Nivel </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        variant="outline"
                        role="combobox"
                        type="button"
                        className={cn(
                          "w-[100%] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? listNivel.find((nivel) => nivel.id === field.value)
                              ?.nivel
                          : "Selecionar um Nivel(Opcional)"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Selecionar um nível..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>
                            NNenhum nível selecionado.
                          </CommandEmpty>
                          <CommandGroup>
                            {listNivel.map((nivel) => (
                              <CommandItem
                                value={nivel.nivel}
                                key={nivel.id}
                                onSelect={() => {
                                  form.setValue("nivel_id", nivel.id);
                                }}
                              >
                                {nivel.nivel}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    nivel.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="sexo"
          render={({ field }) => (
            <div className="grid items-center text-left gap-2">
              <FormItem>
                <FormLabel>Sexo</FormLabel>
                <FormControl>
                  <RadioGroup
                    id="sexo"
                    defaultValue={getSexoSpec(field.value).value}
                    onValueChange={field.onChange}
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value={Sexo.MASCULINO} />
                      </FormControl>
                      <FormLabel className="font-normal">Masculino</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value={Sexo.FEMININO} />
                      </FormControl>
                      <FormLabel className="font-normal">Feminino</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value={Sexo.NAO_IDENTIFICADO} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Não Identificado
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="data_nascimento"
          render={({ field }) => (
            <div className="grid items-center text-left gap-2">
              <FormItem>
                <FormLabel>Data de Nascimento</FormLabel>
                <FormControl>
                  <Input
                    className="grid items-center text-left gap-2"
                    type="date"
                    max={format(new Date(), "yyyy-MM-dd")}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  O valor deve ser até a data atual ou anterior
                </FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="hobby"
          render={({ field }) => (
            <div className="grid items-center text-left gap-2">
              <FormItem>
                <FormLabel>Hobby</FormLabel>
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

export default DesenvolvedorForm;
