"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import DataEntryDashboard from "../data-entry-dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import moment from "moment";
import axios from "axios";
import { endPoints } from "@/config/end-point-list";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AylikGelirGiderListesi } from "./table";

const profileFormSchema = z.object({
  ay: z.string({
    required_error: "Bu alan zorunludur.",
  }),
  type: z.enum(["0", "1"], {
    required_error: "Bu alan zorunludur.",
  }),
  tarih: z.date({
    required_error: "Bu alan zorunludur.",
  }),
  tutar: z.string({
    required_error: "Bu alan zorunludur.",
    invalid_type_error: "Bu alan sayısal olmalıdır.",
  }),
  aciklama: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type Aylar = {
  id: number;
  name: string;
};
// This can come from your database or API.

export function AylikGelirGider() {
  const { toast } = useToast();

  const aylar: Aylar[] = [
    { id: 1, name: "Ocak" },
    { id: 2, name: "Şubat" },
    { id: 3, name: "Mart" },
    { id: 4, name: "Nisan" },
    { id: 5, name: "Mayıs" },
    { id: 6, name: "Haziran" },
    { id: 7, name: "Temmuz" },
    { id: 8, name: "Ağustos" },
    { id: 9, name: "Eylül" },
    { id: 10, name: "Ekim" },
    { id: 11, name: "Kasım" },
    { id: 12, name: "Aralık" },
  ];

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(data: ProfileFormValues) {
    // date location tr

    const ay = aylar.find(
      (item: { id: number; name: string }) => item.name === data.ay
    );

    moment.locale("tr");
    data.tarih = moment(data.tarih).format("YYYY");

    const response = await axios.post(endPoints.nil_aylik_gelir_gider.post, {
      gelir_gider_turu: data.type,
      yil: data.tarih,
      ay: ay.id,
      tutar: data.tutar,
      aciklama: data.aciklama,
      status: 1,
    });

    if (response.data.success === 1) {
      toast({
        title: "Başarılı",
        description: "Gelir gider başarıyla eklendi.",
      });
    } else {
      toast({
        title: "Hata",
        description: "Gelir gider eklenirken hata oluştu.",
      });
    }

    // reset
    form.reset({
      type: "0",
      tarih: new Date(),
      tutar: null,
      ay: "Ocak",
      aciklama: "",
    });

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <DataEntryDashboard>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Aylık Gelir Gider Ekleme</TabsTrigger>
          <TabsTrigger value="gelir-gider-listesi">
            Aylık Gelir Gider Listesi
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4 ">
          <div className="border-b border-gray pb-3">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Veri Girişi
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Aşağıdaki formu doldurarak veri girişi yapabilirsiniz.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Gelir Gider Türü</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                        value={field.value}
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="1" />
                          </FormControl>
                          <FormLabel className="font-normal">Gelir</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="0" />
                          </FormControl>
                          <FormLabel className="font-normal">Gider</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tarih"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tarih</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              moment(field.value).format("DD.MM.YYYY")
                            ) : (
                              <span>Tarih seçiniz </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Veri girişinin yapıldığı tarihi seçiniz.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ay"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Aylar</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Ay Seçiniz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {aylar?.map((item) => (
                          <SelectItem key={item.id} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tutar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tutar</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Tutar giriniz"
                        className="resize-none"
                        onChange={field.onChange}
                        value={parseInt(field.value)}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="aciklama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Açıklama</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Açıklama giriniz"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Opsiyanal olarak açıklama girebilirsiniz.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                Kaydet
              </Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="gelir-gider-listesi" className="space-y-4">
          <AylikGelirGiderListesi />
        </TabsContent>
      </Tabs>
    </DataEntryDashboard>
  );
}
