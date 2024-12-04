import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import "./styles.scss";

export default function BasicArea({ companies }) {
  const xLabels = Object.keys(companies[0].data).filter((item) => {
    if (
      item === "last_divident_per_share" ||
      item === "promoters_holding" ||
      item === "revenue_growth_qoq" ||
      item === "revenue_growth_yoy"
    ) {
      return item;
    }
  });

  const series = companies.map((company, index) => {
    return {
      label: company.name,
      data: xLabels.map((key) => company.data[key]),
      area: true,
      stack: "total",
    };
  });
  return (
    <div className="line-chart-wrapper">
      <h6>Key Matrics</h6>
      <LineChart
        xAxis={[
          {
            data: xLabels,
            scaleType: "band",
            label: "Growth Metrics",
          },
        ]}
        series={series}
        height={300}
      />
    </div>
  );
}
