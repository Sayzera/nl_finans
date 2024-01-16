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
import axios from "axios";
import { useEffect, useState } from "react";

export function BankaHesaplariListesi() {
  const [list, setList] = useState([]);
  const getData = async function () {
    const { data } = await axios.get(endPoints.nil_banka_hesaplari_listesi.get);
    console.log(data);
    setList(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteData = async function (id: number | string) {
    const { data } = await axios.post(
      endPoints.nil_update_banka_hesaplari.post,
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
      <TableCaption>Banka Hesapları</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Banka Adı</TableHead>
          <TableHead>IBAN</TableHead>
          <TableHead className="text-right">İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list?.data?.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.banka_adi}</TableCell>
            <TableCell>{item.iban}</TableCell>
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
    </Table>
  );
}
