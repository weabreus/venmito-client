import { useProductsDashboard } from "../../hooks";
import ProductSalesChart from "./components/ProductSalesChart";
import ProductsByCountryCards from "./components/ProductsByCountryCards";
import ProductsByCountryChart from "./components/ProductsByCountryChart";
import ProductsPerformanceCards from "./components/ProductsPerformanceCards";

const ProductsDashboard = () => {
  const {
    productsDashboardData,
    productSalesChartOptions,
    productByCountryChartOptions,
  } = useProductsDashboard();
  return (
    <section className="grid grid-cols-10 gap-2">
      {productsDashboardData && (
        <>
          <ProductsPerformanceCards
            productsDashboardData={productsDashboardData}
          />
          <ProductSalesChart chartOptions={productSalesChartOptions} />
          <ProductsByCountryCards
            productsDashboardData={productsDashboardData}
          />
          <ProductsByCountryChart chartOptions={productByCountryChartOptions} />
        </>
      )}
    </section>
  );
};

export default ProductsDashboard;
