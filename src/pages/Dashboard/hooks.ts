import { Context, useContext, useEffect, useState } from "react";
import {
  AnalysisContext,
  AnalysisContextType,
} from "../../context/AnalysisContext";
import axios, { AxiosResponse } from "axios";
import _ from "lodash";

export interface PromotionEffectiveness {
  name?: string;
  result: number;
}

type PromotionDataType = {
  _id: number;
  analysis_id: string;
  email: string;
  name: string;
  promotions: {
    name: string;
    responded: "Yes" | "No";
  }[];
};

export type PromotionGroupCustomer = {
  _id: number;
  analysis_id: string;
  email: string;
  name: string;
  responded: "Yes" | "No";
};

export type PromotionGroup = {
  [key: string]: PromotionGroupCustomer[];
};

export const useDashboardPage = () => {
  const [selectedDashboard, setSelectedDashboard] = useState<
    "promotions" | "stores" | "products"
  >("promotions");

  return {
    selectedDashboard,
    setSelectedDashboard,
  };
};

export const usePromotionsDashboard = () => {
  const [groupedPromotions, setGroupedPromotions] = useState<PromotionGroup>();
  const [barChartOptions, setBarChartOptions] = useState<
    ApexCharts.ApexOptions | undefined
  >();
  const { selectedAnalysis } = useContext(
    AnalysisContext as Context<AnalysisContextType>
  );

  const getDashboardData = async () => {
    if (selectedAnalysis) {
      try {
        const response: AxiosResponse<PromotionDataType[]> = await axios.get(
          `${import.meta.env.VITE_API_URL}/analysis/promotions/${
            selectedAnalysis?._id
          }`
        );

        if (response.data) {
          const groupedPromotions = response.data.reduce<PromotionGroup>(
            (acc, item) => {
              item.promotions.forEach((promotion) => {
                if (!acc[promotion.name]) {
                  acc[promotion.name] = [];
                }
                acc[promotion.name].push({
                  _id: item._id,
                  analysis_id: item.analysis_id,
                  email: item.email,
                  name: item.name,
                  responded: promotion.responded,
                });
              });
              return acc;
            },
            {}
          );

          console.log(groupedPromotions);
          setGroupedPromotions(groupedPromotions);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getDashboardData();
  }, [selectedAnalysis]);

  useEffect(() => {
    // This will update the chart when the data is loaded
    if (groupedPromotions) {
      let options: ApexCharts.ApexOptions = {
        series: [
          {
            name: "No",
            data: Object.keys(groupedPromotions).map((key) => {
              return groupedPromotions[key].reduce(
                (acc, curr) => (curr.responded === "No" ? acc + 1 : acc),
                0
              );
            }),
          },
          {
            name: "Yes",
            data: Object.keys(groupedPromotions).map((key) => {
              return groupedPromotions[key].reduce(
                (acc, curr) => (curr.responded === "Yes" ? acc + 1 : acc),
                0
              );
            }),
          },
          {
            name: "Total",
            data: Object.keys(groupedPromotions).map((key) => {
              return groupedPromotions[key].length;
            }),
          },
        ],
        chart: {
          type: "bar",
          height: 600,
          toolbar: {
            show: false,
          },
        },

        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            borderRadius: 2,
            borderRadiusApplication: "end",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: Object.keys(groupedPromotions),
        },
        fill: {
          opacity: 1,
        },
      };

      setBarChartOptions(options);
    }
  }, [groupedPromotions]);
  return {
    groupedPromotions,
    setGroupedPromotions,
    barChartOptions,
  };
};

type ItemSalesType = {
  _id: string;
  count: number;
  totalPrice: number;
};

type PeopleTransactionType = {
  _id: string;
  name: string;
  first_name: string;
  surname: string;
  buyer_name: string;
  email: string;
  Android: boolean;
  Desktop: boolean;
  iPhone: boolean;
  transaction_id: string;
  store: string;
  item: string;
  price: number;
  city: "Guadalajara";
  country: "Mexico";
  transaction_date: "Mon, 22 Feb 2021 00:00:00 GMT";
};

type StoreSalesType = {
  _id: string;
  totalPrice: number;
  transactionCount: number;
};

export type ProductsDashboardDataType = {
  itemSales: ItemSalesType[];
  peopleTransactions: PeopleTransactionType[];
  storeSales: StoreSalesType[];
};

export const useProductsDashboard = () => {
  const { selectedAnalysis } = useContext(
    AnalysisContext as Context<AnalysisContextType>
  );
  const [productsDashboardData, setProductsDashboardData] =
    useState<ProductsDashboardDataType>();

  const [productSalesChartOptions, setProductSalesChartOptions] = useState<
    ApexCharts.ApexOptions | undefined
  >();
  const [productByCountryChartOptions, setProductByCountryChartOptions] =
    useState<ApexCharts.ApexOptions | undefined>();
  const getProductsDashboardData = async () => {
    try {
      const response: AxiosResponse<ProductsDashboardDataType> =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/analysis/stores/${
            selectedAnalysis?._id
          }`
        );

      if (response.data) {
        setProductsDashboardData(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProductsDashboardData();
  }, [selectedAnalysis]);

  useEffect(() => {
    if (productsDashboardData) {
      let options: ApexCharts.ApexOptions = {
        series: [
          {
            name: "Transactions",
            data: productsDashboardData.itemSales.map((el) => el.count),
          },
          {
            name: "Sales",
            data: productsDashboardData.itemSales.map((el) => el.totalPrice),
          },
        ],
        chart: {
          type: "bar",
          height: 600,
          toolbar: {
            show: false,
          },
        },

        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            borderRadius: 2,
            borderRadiusApplication: "end",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: productsDashboardData.itemSales.map((el) => el._id),
        },
        fill: {
          opacity: 1,
        },
      };
      const allProducts = _.uniq(
        _.map(productsDashboardData.peopleTransactions, "item")
      );

      let countryProcessedData = _.map(
        _.groupBy(productsDashboardData.peopleTransactions, "country"),
        (transactions, country) => {
          const totalSales = _.sumBy(transactions, "price");
          const productsWithZeroSales = _.fromPairs(
            allProducts.map((product) => [product, 0])
          );
          const salesPerProduct = _.chain(transactions)
            .groupBy("item")
            .mapValues((productTransactions) =>
              _.sumBy(productTransactions, "price")
            )
            .value();
          const products = _.defaults(salesPerProduct, productsWithZeroSales);
          return {
            country: country,
            totalSales: totalSales,
            products: products,
          };
        }
      );

      let optionsByCountry: ApexCharts.ApexOptions = {
        series: [
          {
            name: "Total Sales",
            data: countryProcessedData.map((el) => el.totalSales),
          },
        ],
        chart: {
          type: "bar",
          height: 2000,
          toolbar: {
            show: false,
          },
        },

        plotOptions: {
          bar: {
            horizontal: true,
            columnWidth: "100%",
            barHeight: "5",
            borderRadius: 2,
            borderRadiusApplication: "end",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: countryProcessedData.map((el) => el.country),
        },
        fill: {
          opacity: 1,
        },
      };

      countryProcessedData.forEach((country) => {
        Object.keys(country.products).forEach((key) => {
          if (optionsByCountry.series) {
            if (
              optionsByCountry.series?.findIndex(
                (series: any) => series.name === key
              ) === -1
            ) {
              optionsByCountry.series.push({ name: key, data: [] } as any);
            }

            optionsByCountry.series[
              optionsByCountry.series?.findIndex(
                (el: any) => el.name === key
              ) as number
              // @ts-ignore
            ].data.push(country.products[key]);
          }
        });
      });

      setProductSalesChartOptions(options);
      setProductByCountryChartOptions(optionsByCountry);
    }
  }, [productsDashboardData]);
  return {
    productsDashboardData,
    productSalesChartOptions,
    productByCountryChartOptions,
  };
};

export const useStoresDashboard = () => {
  const { selectedAnalysis } = useContext(
    AnalysisContext as Context<AnalysisContextType>
  );
  const [storesDashboardData, setStoresDashboardData] = useState<
    ProductsDashboardDataType | undefined
  >();
  const [storesBestSellerChartOptions, setStoresBestSellerChartOptions] =
    useState<ApexCharts.ApexOptions | undefined>();

  const getStoresDashboardData = async () => {
    try {
      const response: AxiosResponse<ProductsDashboardDataType> =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/analysis/stores/${
            selectedAnalysis?._id
          }`
        );

      if (response.data) {
        setStoresDashboardData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStoresDashboardData();
  }, [selectedAnalysis]);

  useEffect(() => {
    if (storesDashboardData) {
      const options = {
        series: [
          {
            data: storesDashboardData.storeSales.map((store) => ({
              x: store._id,
              y: store.totalPrice,
            })),
          },
        ],
        
        legend: {
          show: false,
        },
        chart: {
          
          width: "100%",
          height: 350,
          toolbar: {
            show: false
          }
        },
       
      };

      setStoresBestSellerChartOptions(options);
    }
  }, [storesDashboardData]);

  return {
    storesDashboardData,
    storesBestSellerChartOptions,
  };
};
