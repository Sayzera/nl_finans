import {
  Bar,
  BarChart,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { moneyFormat } from "@/lib/money-format";

interface OverviewProps {
  aylik_gelir_gider:
    | {
        ay: string;
        gelir: number;
        gider: number;
      }[]
    | undefined;
}

const CustomTooltip = ({ active, payload, label }) => {
  console.log(active, payload, label);
  if (active && payload && payload.length) {
    const gelir = payload[0].payload.gelir;
    const gider = payload[0].payload.gider;

    console.log(gelir, gider);

    return (
      <Card>
        <CardContent>
          <div className="py-2">
            <p className="font-bold">{`${label}`}</p>
          </div>
          <Separator className="mb-2" />

          <p>Gelir: {moneyFormat(gelir)}</p>
          <p>Gider: {moneyFormat(gider)}</p>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export function Overview({ aylik_gelir_gider }: OverviewProps) {
  const data = aylik_gelir_gider?.map((item) => {
    return {
      name: item.ay,
      gelir: item.gelir,
      gider: item.gider,
    };
  });
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tick={{
            fill: "#888888",
            width: 100,
          }}
          tickFormatter={(value) => `${moneyFormat(value)}`}
        />

        <Tooltip content={CustomTooltip} />
        <Legend />

        <Bar
          dataKey="gelir"
          fill="#6CE6E8"
          activeBar={<Rectangle fill="#004080" stroke="#6CE6E8" />}
        />
        <Bar
          dataKey="gider"
          fill="#CCCCCC" // Daha soluk bir kırmızı tonu
          activeBar={<Rectangle fill="#DDDDDD" stroke="#CCCCCC" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
