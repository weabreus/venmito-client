import {
  PromotionEffectiveness,
  PromotionGroup,
  PromotionGroupCustomer,
} from "../pages/Dashboard/hooks";

export const calculatePromotionEffectiveness = (
  promotionData: PromotionGroupCustomer[]
) => {
  return (
    promotionData.filter((customer) => customer.responded === "Yes").length /
    promotionData.length
  );
};

export const calculatePromotionYesCount = (
  promotionData: PromotionGroupCustomer[]
) => {
  return promotionData.filter((customer) => customer.responded === "Yes")
    .length;
};

export const calculatePromotionNoCount = (
  promotionData: PromotionGroupCustomer[]
) => {
  return promotionData.filter((customer) => customer.responded === "No").length;
};

export const calculateMostEffectivePromotion = (
  promotionGroup: PromotionGroup
) => {
  return Object.keys(promotionGroup).reduce<PromotionEffectiveness>(
    (acc, curr) => {
      const currentEffectiveness = calculatePromotionEffectiveness(
        promotionGroup[curr]
      );
      if (!acc.result || currentEffectiveness > acc.result) {
        return { name: curr, result: currentEffectiveness };
      }
      return acc;
    },
    { result: -Infinity } as PromotionEffectiveness
  );
};

export const calculateMostYesCountPromotion = (
  promotionGroup: PromotionGroup
) => {
  return Object.keys(promotionGroup).reduce<PromotionEffectiveness>(
    (acc, curr) => {
      const currentEffectiveness = calculatePromotionYesCount(
        promotionGroup[curr]
      );
      if (!acc.result || currentEffectiveness > acc.result) {
        return { name: curr, result: currentEffectiveness };
      }
      return acc;
    },
    { result: -Infinity } as PromotionEffectiveness
  );
};

export const calculateMostNoCountPromotion = (
  promotionGroup: PromotionGroup
) => {
  return Object.keys(promotionGroup).reduce<PromotionEffectiveness>(
    (acc, curr) => {
      const currentEffectiveness = calculatePromotionNoCount(
        promotionGroup[curr]
      );
      if (!acc.result || currentEffectiveness > acc.result) {
        return { name: curr, result: currentEffectiveness };
      }
      return acc;
    },
    { result: -Infinity } as PromotionEffectiveness
  );
};

export const calculateLeastEffectivePromotion = (
  promotionGroup: PromotionGroup
) => {
  return Object.keys(promotionGroup).reduce<PromotionEffectiveness>(
    (acc, curr) => {
      const currentEffectiveness = calculatePromotionEffectiveness(
        promotionGroup[curr]
      );
      if (!acc.result || currentEffectiveness < acc.result) {
        return { name: curr, result: currentEffectiveness };
      }
      return acc;
    },
    { result: Infinity } as PromotionEffectiveness
  );
};

export const calculateBiggestPromotion = (promotionGroup: PromotionGroup) => {
  return Object.keys(promotionGroup).reduce<PromotionEffectiveness>(
    (acc, curr) => {
      const currentEffectiveness = promotionGroup[curr].length;
      if (!acc.result || currentEffectiveness > acc.result) {
        return { name: curr, result: currentEffectiveness };
      }
      return acc;
    },
    { result: -Infinity } as PromotionEffectiveness
  );
};

export const calculateSmallestPromotion = (promotionGroup: PromotionGroup) => {
  return Object.keys(promotionGroup).reduce<PromotionEffectiveness>(
    (acc, curr) => {
      const currentEffectiveness = promotionGroup[curr].length;
      if (!acc.result || currentEffectiveness < acc.result) {
        return { name: curr, result: currentEffectiveness };
      }
      return acc;
    },
    { result: Infinity } as PromotionEffectiveness
  );
};

export const capitalizeString = (word: string | undefined) => {
  if (!word) return "";
  return word[0].toUpperCase() + word.substring(1);
};
