import { BarChart } from "@mui/x-charts/BarChart";
import "./styles.scss";

const CustomBarChart = ({ companies }) => {
  const xLabels = Object.keys(companies[0].data).filter((item) => {
    const labels = [
      "total_shares",
      "revenue",
      "pat",
      "ebitda",
      "fixed_assets",
      "liabilities",
    ];
    if (labels.includes(item)) {
      return item;
    }
  });

  const series = companies.map((company, index) => {
    return {
      label: company.name,
      data: xLabels.map((key) => company.data[key]),
      id: company.name,
      stack: "total",
      color: `hsl(${index * 90}, 70%, 60%)`,
    };
  });

  return (
    <div className="bar-chart-wrapper">
      <h6 className="graph-title">Key Matrics</h6>
      <BarChart
        height={400}
        borderRadius={4}
        className="bar-chart"
        grid={{ horizontal: true }}
        series={series}
        xAxis={[
          {
            data: xLabels,
            scaleType: "band",
            categoryGapRatio: 0.5,
            label: "Revenue Metrics",
          },
        ]}
        yAxis={[
          {
            valueFormatter: (value) => `${value / 1000000}M`,
          },
        ]}
        leftAxis={{ disableLine: true, disableTicks: true }}
        bottomAxis={{ disableTicks: true }}
      />
    </div>
  );
};

export default CustomBarChart;
