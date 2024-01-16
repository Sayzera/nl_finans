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

export function AylikGelirGiderListesi() {
  const deleteData = async function (id: number | string) {
    const { data } = await axios.post(
      endPoints.nil_aylik_gelir_gider_update.post,
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
      endPoints.nil_aylik_gelir_gider_listesi.get
    );
    console.log(data);
    setList(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Table>
      <TableCaption>Aylık Gelir Gider Tablosu</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Gelir/Gider</TableHead>
          <TableHead>Yıl</TableHead>
          <TableHead>Ay</TableHead>
          <TableHead>Tutar</TableHead>
          <TableHead className="text-right">İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list?.data?.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">
              {item.gelir_gider_turu === 1 ? "Gelir" : "Gider"}
            </TableCell>
            <TableCell>{moment(item.tarih).format("YYYY")}</TableCell>
            <TableCell>
              {aylar.filter((ay) => ay.id == item.ay)[0].ay}
            </TableCell>
            <TableCell>{moneyFormat(item.tutar)}</TableCell>
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
