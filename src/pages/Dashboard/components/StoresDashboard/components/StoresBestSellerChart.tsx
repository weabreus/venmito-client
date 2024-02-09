import Chart from "react-apexcharts";

const StoresBestSellerChart = ({ chartOptions } : { chartOptions: ApexCharts.ApexOptions | undefined}) => {
  return (
    <div className=" col-span-10 overflow-hidden rounded-xl border border-gray-200 flow-root bg-white shadow sm:rounded-lg p-3">
      {chartOptions && <Chart
        options={chartOptions}
        type="treemap"
        series={chartOptions.series}
        width={"100%"}
      />}
    </div>
  )
}

export default StoresBestSellerChart