import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  MinusIcon,
} from "@heroicons/react/20/solid";
import { ProductsDashboardDataType } from "../../../hooks";
import { capitalizeString } from "../../../../../utils/generalUtils";

const ProductsPerformanceCards = ({
  productsDashboardData,
}: {
  productsDashboardData: ProductsDashboardDataType | undefined;
}) => {
  return (
    <div className="col-span-10">
      <div className="w-full">
        {productsDashboardData && (
          <ul
            role="list"
            className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
          >
            <li className="overflow-hidden rounded-xl border border-gray-200">
              <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6 text-rose-600">
                <ArrowTrendingDownIcon className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
                <div className="text-sm font-regular leading-6 text-gray-900">
                  Lowest sales:{" "}
                  <strong>{`${capitalizeString(
                    productsDashboardData.itemSales.find(
                      (el) =>
                        el.totalPrice ===
                        Math.min(
                          ...productsDashboardData.itemSales.map(
                            (el) => el.totalPrice
                          )
                        )
                    )?._id
                  )}`}</strong>
                </div>
              </div>
            </li>

            <li className="overflow-hidden rounded-xl border border-gray-200">
              <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6 text-yellow-600">
                <MinusIcon className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
                <div className="text-sm font-regular leading-6 text-gray-900">
                  Average sales: ${" "}
                  <strong>
                    {(
                      productsDashboardData.itemSales
                        .map((el) => el.totalPrice)
                        .reduce((acc, curr) => curr + acc, 0) /
                      productsDashboardData.itemSales.map((el) => el.totalPrice).length
                    ).toFixed(2)}
                  </strong>
                </div>
              </div>
            </li>

            <li className="overflow-hidden rounded-xl border border-gray-200">
              <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6 text-green-600">
                <ArrowTrendingUpIcon className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
                <div className="text-sm font-regular leading-6 text-gray-900">
                  Top sales:{" "}
                  <strong>{`${capitalizeString(
                    productsDashboardData.itemSales.find(
                      (el) =>
                        el.totalPrice ===
                        Math.max(
                          ...productsDashboardData.itemSales.map(
                            (el) => el.totalPrice
                          )
                        )
                    )?._id
                  )}`}</strong>
                </div>
              </div>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductsPerformanceCards;
