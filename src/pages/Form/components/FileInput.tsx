import { CheckIcon } from "@heroicons/react/20/solid";
import { useFormikContext } from "formik";
import { useState } from "react";

type FileInputPropsType = {
  name: string;
  accept?: string;
};
const FileInput = ({ name, accept = ".json,.yml,.csv,.xml" }: FileInputPropsType) => {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedFilename, setSelectedFilename] = useState<string>("");
  const { setFieldValue, errors, touched } = useFormikContext();
  return (
    <div className="h-full mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5">
      <div className="flex items-center gap-6 space-y-1 text-center">
        {isFileSelected ? (
          <div>
            {/* Display when a file is selected */}
            <CheckIcon
              className="mx-auto h-12 w-12 text-green-500"
              aria-hidden="true"
            />
            <p className="mt-1 text-sm text-gray-900">{selectedFilename}</p>
            {/* @ts-ignore */}
            {touched[name] && errors[name] && (<div style={{ color: "red" }}>{errors[name]}</div>)}
          </div>
        ) : (
          <>
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor={name}
                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id={name}
                  name={name}
                  type="file"
                  className="sr-only"
                  accept={accept}
                  onChange={(e) => {
                    if (e.currentTarget.files && e.currentTarget.files[0]) {
                      setFieldValue(name, e.currentTarget.files[0]);
                      setIsFileSelected(true);
                      setSelectedFilename(e.currentTarget.files[0].name);
                    } else {
                      setIsFileSelected(false);
                      setSelectedFilename("");
                    }
                  }}
                />
                {/* @ts-ignore */}
                {touched[name] && errors[name] && (<div style={{ color: "red" }}>{errors[name]}</div>
                )}
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FileInput;
