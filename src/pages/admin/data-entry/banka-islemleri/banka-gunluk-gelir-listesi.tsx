import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { endPoints } from "@/config/end-point-list";
import { moneyFormat } from "@/lib/money-format";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

export function BankaGunlukGelirListesi() {
  const aylar = [
    { ay: "Ocak", id: 1 },
    { ay: "Şubat", id: 2 },
    { ay: "Mart", id: 3 },
    { ay: "Nisan", id: 4 },
    { ay: "Mayıs", id: 5 },
    { ay: "Haziran", id: 6 },
    { ay: "Temmuz", id: 7 },
    { ay: "Ağustos", id: 8 },
    { ay: "Eylül", id: 9 },
    { ay: "Ekim", id: 10 },
    { ay: "Kasım", id: 11 },
    { ay: "Aralık", id: 12 },
  ];

  const [list, setList] = useState([]);
  const getData = async function () {
    const { data } = await axios.get(
      endPoints.nil_banka_gunluk_gelir_listesi.get
    );
    console.log(data);
    setList(data);
  };

  useEffect(() => {
    getData();
  }, []);
  const deleteData = async function (id: number | string) {
    const { data } = await axios.post(
      endPoints.nil_banka_gunluk_gelir_gider_update.post,
      {
        type: 0,
        id,
      }
    );

    if (data.success === 1) {
      toast({
        title: "Başarılı",
        description: "İşlem başarıyla tamamlandı",
      });
    } else {
      toast({
        title: "Hata",
        description: "İşlem başarısız oldu",
      });
    }

    getData();
  };

  return (
    <Table>
      <TableCaption>Banka Günlük Gelir Listesi</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Banka Adı</TableHead>
          <TableHead>Tutar</TableHead>
          <TableHead>Tarih</TableHead>
          <TableHead>Açıklama</TableHead>
          <TableHead className="text-right">İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list?.data?.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.banka_adi}</TableCell>
            <TableCell>{moneyFormat(item.tutar)}</TableCell>
            <TableCell>{moment(item.tarih).format("YYYY-MM-DD")}</TableCell>
            <TableCell>{item.aciklama}</TableCell>
            <TableCell className="text-right">
              <Button variant="secondary" className="mr-2">
                Düzenle
              </Button>
              <Button variant={"danger"} onClick={() => deleteData(item.id)}>
                Sil
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Toplam</TableCell>
          <TableCell className="text-right">
            {moneyFormat(
              list?.data?.reduce((acc, item) => acc + parseInt(item.tutar), 0)
            )}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
