import { Formik, Form } from "formik";
import FileInput from "./components/FileInput";
import { useAnalysisForm } from "./hooks";

export default function AnalysisForm() {
  const { formInitialValues, validateFiles, handleSubmit } = useAnalysisForm();
  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <Formik
          initialValues={formInitialValues}
          validate={validateFiles}
          onSubmit={(values) => handleSubmit(values)}
        >
          {() => (
            <Form>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
                  <div>
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      New analysis form
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      This form requires the upload of customer, promotion,
                      transfer, and transaction data in the standard company
                      format from Venmito. <strong>Provide sample files</strong>
                    </p>
                  </div>

                  <div className="grid grid-cols-6 gap-6">
                    {/* People inputs */}
                    <div className="grid grid-cols-6 col-span-6 gap-2">
                      <div className="col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          People data (YAML)
                        </label>
                        <FileInput
                          name={"peopleyml"}
                          accept=".yml"
                        />
                      </div>
                      <div className="col-span-3 h-full">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          People data (JSON)
                        </label>
                        <FileInput
                          name={"peoplejson"}
                          accept=".json"
                        />
                      </div>
                    </div>

                    {/* Transactions inputs */}
                    <div className="mt-4 grid grid-cols-6 col-span-6">
                      <div className="col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Transaction data (XML)
                        </label>
                        <FileInput
                          name={"transaction"}
                          accept=".xml"
                        />
                      </div>
                    </div>

                    {/* Promotions inputs */}
                    <div className="mt-4 grid grid-cols-6 col-span-6">
                      <div className="col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Promotion data (CSV)
                        </label>
                        <FileInput
                          name={"promotion"}
                          accept=".csv"
                        />
                      </div>
                    </div>

                    {/* Transfer inputs */}
                    <div className="mt-4 grid grid-cols-6 col-span-6">
                      <div className="col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Transfer data (CSV)
                        </label>
                        <FileInput
                          name={"transfer"}
                          accept=".csv"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
