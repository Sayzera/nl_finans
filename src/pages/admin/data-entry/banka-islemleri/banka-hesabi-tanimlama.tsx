import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

import { useToast } from "@/components/ui/use-toast";
import DataEntryDashboard from "../data-entry-dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import axios from "axios";
import { endPoints } from "@/config/end-point-list";
import { BankaGunlukGelir } from "./banka-gunluk-gelir";
import { BankaHesaplariListesi } from "./banka-hesaplari-listesi";
import { BankaGunlukGelirListesi } from "./banka-gunluk-gelir-listesi";

const profileFormSchema = z.object({
  banka_hesabi_adi: z.string({
    required_error: "Bu alan zorunludur.",
  }),
  iban: z
    .string({
      required_error: "Bu alan zorunludur.",
    })
    .max(26, {
      message: "IBAN 26 karakterden uzun olamaz",
    }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.

export function BankaHesabiTanimlama() {
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(data: ProfileFormValues) {
    const response = await axios.post(
      endPoints.nil_banka_hesabi_tanimlama.post,
      {
        banka_hesabi_adi: data.banka_hesabi_adi,
        iban: data.iban,
        status: 1,
      }
    );

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
      banka_hesabi_adi: "",
      iban: "",
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
          <TabsTrigger value="overview">Banka Hesabı Tanımlama</TabsTrigger>
          <TabsTrigger value="banka-hesaplari">
            Banka Hesabı Listesi
          </TabsTrigger>
          <TabsTrigger value="banka-gunluk-gelir">
            Banka Günlük Gelir
          </TabsTrigger>
          <TabsTrigger value="banka-gunluk-gelir-listesi">
            Banka Günlük Gelir Listesi
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
                name="banka_hesabi_adi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banka Hesabı Adı</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Banka hesabı adı giriniz"
                        className="resize-none"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="iban"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IBAN</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="IBAN giriniz"
                        className="resize-none"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>

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
        <TabsContent
          value="gelir-gider-listesi"
          className="space-y-4"
        ></TabsContent>
        <TabsContent value="banka-hesaplari">
          <BankaHesaplariListesi />
        </TabsContent>
        <TabsContent value="banka-gunluk-gelir">
          <BankaGunlukGelir />
        </TabsContent>
        <TabsContent value="banka-gunluk-gelir-listesi">
          <BankaGunlukGelirListesi />
        </TabsContent>
      </Tabs>
    </DataEntryDashboard>
  );
}
