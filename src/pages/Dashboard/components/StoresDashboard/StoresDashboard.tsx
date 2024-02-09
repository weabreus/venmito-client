import { useStoresDashboard } from "../../hooks";
import StoresBestSellerChart from "./components/StoresBestSellerChart";

const StoresDashboard = () => {
  const { storesDashboardData, storesBestSellerChartOptions } =
    useStoresDashboard();
  return (
    <section className="grid grid-cols-10 gap-2">
      {storesDashboardData && (
        <StoresBestSellerChart chartOptions={storesBestSellerChartOptions} />
      )}
    </section>
  );
};

export default StoresDashboard;
