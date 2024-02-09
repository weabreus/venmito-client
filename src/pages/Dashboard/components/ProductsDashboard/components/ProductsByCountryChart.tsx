import Chart from "react-apexcharts";

const ProductsByCountryChart = ({ chartOptions } : { chartOptions: ApexCharts.ApexOptions | undefined}) => {
  return (
    <div className=" col-span-10 overflow-hidden rounded-xl border border-gray-200 flow-root bg-white shadow sm:rounded-lg p-3">
      {chartOptions && <Chart
        options={chartOptions}
        type="bar"
        series={chartOptions.series}
      />}
    </div>
  )
}

export default ProductsByCountryChart