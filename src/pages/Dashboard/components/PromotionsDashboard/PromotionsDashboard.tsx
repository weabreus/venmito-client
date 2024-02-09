import { usePromotionsDashboard } from "../../hooks";
import PromotionsChart from "./components/PromotionsChart";
import PromotionsTable from "./components/PromotionsTable";
import PromotionsTableRecommendations from "./components/PromotionsTableRecommendations";

const PromotionsDashboard = () => {
  const { groupedPromotions, barChartOptions } = usePromotionsDashboard();
  return (
    <section className="grid grid-cols-10 gap-2">
      {groupedPromotions && (
        <>
          <PromotionsTable groupedPromotions={groupedPromotions} />
          <PromotionsTableRecommendations
            groupedPromotions={groupedPromotions}
          />
          <PromotionsChart chartOptions={barChartOptions} />
        </>
      )}
    </section>
  );
};

export default PromotionsDashboard;
