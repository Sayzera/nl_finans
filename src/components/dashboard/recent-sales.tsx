import { moneyFormat } from "@/lib/money-format";
import { BsBank2 } from "react-icons/bs";

type RecentSalesProps = {
  bankalarin_nakit_durumlari?: {
    banka_adi: string;
    toplam_tutar: number;
  }[];
};
export function RecentSales({ bankalarin_nakit_durumlari }: RecentSalesProps) {
  return (
    <div className="space-y-8">
      {bankalarin_nakit_durumlari?.map((item) => (
        <div className="flex items-center border-b border-gray pb-2">
          <BsBank2 className="h-5 w-5" />
          <div className="flex items-center gap-4 w-[100%] justify-between">
            <div className="ml-4 space-y-1">
              <p className="text-xl font-medium leading-none">
                {item.banka_adi}
              </p>
            </div>
            <div className=" font-medium">{moneyFormat(item.toplam_tutar)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
