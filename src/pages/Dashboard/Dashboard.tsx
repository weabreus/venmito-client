import { classNames } from "../../utils/tailwindUtils";
import PromotionsDashboard from "./components/PromotionsDashboard/PromotionsDashboard";
import ProductsDashboard from "./components/ProductsDashboard/ProductsDashboard";
import { useDashboardPage } from "./hooks";
import StoresDashboard from "./components/StoresDashboard/StoresDashboard";

type TabType = {
  name: string;
  href: "promotions" | "stores" | "products";
};

const tabs: TabType[] = [
  { name: "Promotion Insights", href: "promotions" },
  { name: "Product Insights", href: "products" },
  { name: "Store Insights", href: "stores" },
];

const Dashboard = () => {
  const { selectedDashboard, setSelectedDashboard } = useDashboardPage();
  return (
    <>
      <div className="px-4 sm:px-0">
        <div className="sm:hidden">
          <label htmlFor="question-tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="question-tabs"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-rose-500"
            defaultValue={tabs.find((tab) => tab.href === selectedDashboard)?.name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav
            className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
            aria-label="Tabs"
          >
            {tabs.map((tab, tabIdx) => (
              <button
                key={tab.name}
                onClick={() => setSelectedDashboard(tab.href)}
               
                aria-current={selectedDashboard === tab.href ? "page" : undefined}
                className={classNames(
                  selectedDashboard === tab.href
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700",
                  tabIdx === 0 ? "rounded-l-lg" : "",
                  tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                  "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
                )}
              >
                <span>{tab.name}</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    selectedDashboard === tab.href ? "bg-rose-500" : "bg-transparent",
                    "absolute inset-x-0 bottom-0 h-0.5"
                  )}
                />
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="mt-4">
        {selectedDashboard === "promotions" && <PromotionsDashboard />}
        {selectedDashboard === "products" && <ProductsDashboard />}
        {selectedDashboard === "stores" && <StoresDashboard />}
        
      </div>
    </>
  );
};

export default Dashboard;
