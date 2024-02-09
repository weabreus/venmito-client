import axios, { AxiosResponse } from "axios";
import { createContext, useEffect, useState } from "react";

type AnalysisType = {
  _id: string;
  date: string;
};

export type AnalysisContextType = {
  analysisList: AnalysisType[];
  setAnalysisList: React.Dispatch<React.SetStateAction<AnalysisType[]>>;
  getAnalysisList: () => Promise<void>;
  selectedAnalysis: AnalysisType | undefined;
  setSelectedAnalysis: React.Dispatch<React.SetStateAction<AnalysisType | undefined>>;
};

export const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const useAnalysisContext = () => {
  const [analysisList, setAnalysisList] = useState<AnalysisType[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisType | undefined>();

  const getAnalysisList = async () => {
    try {
      const response: AxiosResponse<AnalysisType[]> = await axios.get(
        `${import.meta.env.VITE_API_URL}/analysis`
      );
      if(response.data) {
        setAnalysisList(response.data);
        setSelectedAnalysis(response.data[0])
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAnalysisList();
  }, []);

  return {
    analysisList,
    setAnalysisList,
    getAnalysisList,
    selectedAnalysis,
    setSelectedAnalysis
  };
};
