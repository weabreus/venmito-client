import { Popover } from "@headlessui/react";
import { ChartBarIcon, ChartPieIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  DocumentChartBarIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "../../utils/tailwindUtils";
import { Outlet, useNavigate } from "react-router-dom";
import { Context, useContext } from "react";
import {
  AnalysisContext,
  AnalysisContextType,
} from "../../context/AnalysisContext";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
  { name: "New Analysis", href: "/form", icon: DocumentChartBarIcon, current: false },
];

export default function Layout() {
  const navigate = useNavigate();
  const { analysisList, selectedAnalysis, setSelectedAnalysis } = useContext(
    AnalysisContext as Context<AnalysisContextType>
  );
  return (
    <>
      <div className="min-h-full">
 
        <Popover
          as="header"
          className={({ open }) =>
            classNames(
              open ? "fixed inset-0 z-40 overflow-y-auto" : "",
              "bg-white shadow-sm lg:static lg:overflow-y-visible"
            )
          }
        >
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                  <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                    <div className="flex  gap-2 flex-shrink-0 items-center">
                      <button onClick={() => navigate("/")}>
                        <ChartPieIcon className="block h-8 w-auto text-rose-600" />
                      </button>
                      <h1>Venmito</h1>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                    <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                      <div className="w-full">
                        <label htmlFor="analysis-select" className="sr-only">
                          Analysis Select
                        </label>
                        <div className="relative flex items-center ">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 py-6">
                            <ChartBarIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </div>
                          <select
                            id="analysis-select"
                            name="analysis-select"
                            className="appearance-none mt-2 block w-full rounded-md border-0 py-1.5 pl-10 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={selectedAnalysis?._id}
                            onChange={(e) =>
                              setSelectedAnalysis(
                                analysisList.find(
                                  (analysis) =>
                                    analysis._id === e.currentTarget.value
                                )
                              )
                            }
                          >
                            {analysisList.map((analysis) => {
                              const analysisDate = new Date(
                                Date.parse(analysis.date)
                              );
                              return (
                                <option
                                  key={analysis?._id}
                                  value={analysis?._id}
                                >
                                  Analysis ID: {analysis._id} Date:{" "}
                                  {`${analysisDate.getFullYear()}/${(
                                    analysisDate.getMonth() + 1
                                  )
                                    .toString()
                                    .padStart(2, "0")}/${analysisDate
                                    .getDate()
                                    .toString()
                                    .padStart(2, "0")}`}
                                </option>
                              );
                            })}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 py-6">
                            <ChevronDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                    {/* Mobile menu button */}
                    <Popover.Button className="relative -mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Popover.Button>
                  </div>
                  <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                    <button 
                    onClick={() => navigate("/form")}
                    className="ml-6 inline-flex items-center rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
                      New Analysis
                    </button>
                  </div>
                </div>
              </div>

              <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
                <div className="mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.href)}
                      aria-current={location.pathname === item.href ? "page" : undefined}
                      className={classNames(
                        location.pathname === item.href
                          ? "bg-gray-100 text-gray-900"
                          : "hover:bg-gray-50",
                        "block rounded-md py-2 px-3 text-base font-medium"
                      )}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4"></div>

                <div className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
                  <a
                    href="#"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700"
                  >
                    New Analysis
                  </a>
                </div>
              </Popover.Panel>
            </>
          )}
        </Popover>

        <div className="py-10">
          <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
            <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
              <nav
                aria-label="Sidebar"
                className="sticky top-4 divide-y divide-gray-300"
              >
                <div className="space-y-1 pb-8">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.href)}
                      className={classNames(
                        location.pathname === item.href
                          ? "bg-gray-200 text-gray-900"
                          : "text-gray-700 hover:bg-gray-50",
                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className={classNames(
                          location.pathname === item.href
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </button>
                  ))}
                </div>
              </nav>
            </div>
            <main className="lg:col-span-9 xl:col-span-10">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
