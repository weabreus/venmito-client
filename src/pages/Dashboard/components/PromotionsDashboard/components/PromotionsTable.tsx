import { calculatePromotionEffectiveness } from "../../../../../utils/generalUtils";
import { PromotionGroup } from "../../../hooks";


const PromotionsTable = ({groupedPromotions} : {groupedPromotions: PromotionGroup}) => {
  
  return (
    <div className="mt-8 flow-root col-span-6">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Promotion
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center"
                  >
                    Count
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center"
                  >
                    Negative
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center"
                  >
                    Positive
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center"
                  >
                    Effectiveness (%)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {Object.keys(groupedPromotions)
                  .sort((a, b) =>
                    calculatePromotionEffectiveness(groupedPromotions[a]) < calculatePromotionEffectiveness(groupedPromotions[b])
                      ? 1
                      : -1
                  )
                  .map((key) => (
                    <tr key={`promotion-table-${key}`}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {key[0].toUpperCase() + key.substring(1)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                        {groupedPromotions[key].length}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                        {
                          groupedPromotions[key].filter(
                            (customer) => customer.responded === "No"
                          ).length
                        }
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                        {
                          groupedPromotions[key].filter(
                            (customer) => customer.responded === "Yes"
                          ).length
                        }
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                        {(
                          (groupedPromotions[key].filter(
                            (customer) => customer.responded === "Yes"
                          ).length /
                            groupedPromotions[key].length) *
                          100
                        ).toFixed(2)}{" "}
                        %
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionsTable;
