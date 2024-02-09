import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
    calculateBiggestPromotion,
  calculateLeastEffectivePromotion,
  calculateMostEffectivePromotion,
  calculateMostNoCountPromotion,
  calculateMostYesCountPromotion,
  calculateSmallestPromotion,
  capitalizeString,
} from "../../../../../utils/generalUtils";
import { PromotionGroup } from "../../../hooks";

const PromotionsTableRecommendations = ({
  groupedPromotions,
}: {
  groupedPromotions: PromotionGroup;
}) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 mt-8 flow-root col-span-4 bg-white shadow sm:rounded-lg">
      <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <InformationCircleIcon className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10 text-rose-600" />

        <div className="text-sm font-medium leading-6 text-gray-900">
          Key Insights
        </div>
      </div>
      <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Most effective promotion</dt>
          <dd className="font-medium text-gray-900">
            {capitalizeString(
              calculateMostEffectivePromotion(groupedPromotions).name
            )}
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Least effective promotion</dt>
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-gray-900">
              {capitalizeString(
                calculateLeastEffectivePromotion(groupedPromotions).name
              )}
            </div>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Biggest conversion</dt>
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-gray-900">
              {capitalizeString(
                calculateMostYesCountPromotion(groupedPromotions).name
              )}
            </div>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Biggest negative feedback</dt>
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-gray-900">
              {capitalizeString(calculateMostNoCountPromotion(groupedPromotions).name)}
            </div>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Biggest campaign</dt>
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-gray-900">
              {capitalizeString(calculateBiggestPromotion(groupedPromotions).name)}
            </div>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Smallest campaign</dt>
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-gray-900">
              {capitalizeString(calculateSmallestPromotion(groupedPromotions).name)}
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default PromotionsTableRecommendations;
