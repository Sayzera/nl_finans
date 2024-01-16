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

export function YuksekGiderlerListesi() {
  const [list, setList] = useState([]);
  const getData = async function () {
    const { data } = await axios.get(endPoints.nil_50bin_ustu_liste.get);
    console.log(data);
    setList(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteData = async function (id: number | string) {
    const { data } = await axios.post(
      endPoints.nil_ellibin_uzeri_giderler_update.post,
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
      <TableCaption>50.000 TL Üzeri Gider Listesi</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Tarih</TableHead>
          <TableHead>Adet</TableHead>
          <TableHead>Tutar</TableHead>
          <TableHead className="text-right">İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list?.data?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{moment(item.tarih).format("DD-MM-YYYY")}</TableCell>
            <TableCell>{item.adet}</TableCell>
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
          <TableCell colSpan={3}>Toplam</TableCell>
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
