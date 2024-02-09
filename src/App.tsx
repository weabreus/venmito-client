import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";

import AnalysisForm from "./pages/Form/AnalysisForm";
import { AnalysisContext, useAnalysisContext } from "./context/AnalysisContext";

function App() {
  const analysisContextValue = useAnalysisContext();
  return (
    <>
      <AnalysisContext.Provider value={analysisContextValue}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/form" element={<AnalysisForm />} />
            </>
          </Route>
        </Routes>
      </AnalysisContext.Provider>
    </>
  );
}

export default App;
