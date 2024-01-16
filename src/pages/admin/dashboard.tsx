import axios from "axios";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";

import { CiBank } from "react-icons/ci";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { useEffect, useState } from "react";
import { endPoints } from "@/config/end-point-list";
import { ReportDataType } from "@/types/reportsType";
import { moneyFormat } from "@/lib/money-format";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectSearchDate } from "@/redux/main-slice";

export default function AdminDashboard() {
  const [reportsData, setReportsData] = useState<ReportDataType>();
  const searchDate = useSelector(selectSearchDate);

  async function getReposts(date: string) {
    const response = await axios.get(endPoints.nil_reports.get, {
      params: {
        date,
      },
    });
    // ReportDataType
    const data = response.data;

    setReportsData(data);
  }

  useEffect(() => {
    const date = moment().format("YYYY-MM-DD");
    getReposts(date);
  }, []);

  const filterDate = () => {
    const date = searchDate || moment().format("YYYY-MM-DD");
    getReposts(date);
  };

  return (
    <div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Niltek Yazılım
            </h2>
            <div>
              <p className="text-sm text-muted-foreground">
                Niltek Yazılım Finans Yönetici Özeti
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button onClick={filterDate}>Gönder</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analizler
            </TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Raporlar
            </TabsTrigger>
            <TabsTrigger value="notifications" disabled>
              Yapılan İşlemler
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Bankaların Toplamı
                  </CardTitle>
                  <CiBank className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {moneyFormat(
                      reportsData?.BANKALARIN_TOPLAM_TUTARLARI?.toplam_tutar ||
                        0
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Gelirler Toplamı
                  </CardTitle>
                  <GiReceiveMoney className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {moneyFormat(
                      reportsData?.GUNLUK_GELIR_TOPLAMI?.toplam_tutar || 0
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Giderler Toplamı
                  </CardTitle>
                  <GiPayMoney className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {moneyFormat(
                      reportsData?.GUNLUK_GIDER_TOPLAMI?.toplam_tutar || 0
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="h-[100%] p-0">
                  <div className="flex h-[100%] justify-center">
                    <div className="border-r border-gray pr-5">
                      <div className="flex flex-col justify-center h-[100%]">
                        <div className="text-sm font-medium ">
                          50.000 TL üstü giderler
                        </div>
                        <div className="text-medium font-bold ">
                          {reportsData?.BIN50USTUGIDER?.toplam_adet} adet işlem,{" "}
                          {moneyFormat(
                            reportsData?.BIN50USTUGIDER?.toplam_tutar || 0
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pl-5">
                      <div className="flex flex-col justify-center h-[100%]">
                        <div className="text-sm font-medium ">
                          30.000 TL üstü gelirler
                        </div>
                        <div className="text-medium font-bold">
                          {reportsData?.BIN30USTUGELIR?.toplam_adet} adet işlem,{" "}
                          {moneyFormat(
                            reportsData?.BIN30USTUGELIR?.toplam_tutar || 0
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Bankaların Nakit Durumları</CardTitle>
                  <CardDescription>
                    Bankaların günlük nakit durumları
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales
                    bankalarin_nakit_durumlari={
                      reportsData?.BANKA_NAKIT_DURUMLARI
                    }
                  />
                </CardContent>
              </Card>

              <Card className="col-span-5">
                <CardHeader>
                  <CardTitle>Gelir ve Giderlerin Aylık Trendi</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview
                    aylik_gelir_gider={reportsData?.AYLIK_GELIR_GIDER}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
