import axios from "axios";
import { useNavigate } from "react-router-dom";

type formValuesType = {
  peopleyml: File | null;
  peoplejson: File | null;
  transaction: File | null;
  transfer: File | null;
  promotion: File | null;
  [key: string]: File | null | undefined;
};

export const useAnalysisForm = () => {
  const navigate = useNavigate();
  const validateFiles = (values: formValuesType) => {
    const errors: { [key: string]: string } = {};
    const allowedExtensions = [".json", ".csv", ".yml", ".xml"];

    if (!values.peopleyml || values.peopleyml?.name.length === 0) {
      errors.people = "At least one people file is required.";
    }

    if (!values.peoplejson || values.peoplejson?.name.length === 0) {
      errors.people = "At least one people file is required.";
    }

    if (!values.transaction || values.transaction.name.length === 0) {
      errors.transaction = "At least one transaction file is required.";
    }

    if (!values.transfer || values.transfer.name.length === 0) {
      errors.transfer = "At least one transfer file is required.";
    }

    if (!values.promotion || values.promotion.name.length === 0) {
      errors.promotion = "At least one promotion file is required.";
    }

    Object.keys(values).forEach((key) => {
      const fileList = values[key as keyof formValuesType];
      const fileExtension = fileList?.name
        .split(".")
        .pop()
        ?.toLocaleLowerCase();

      if (!allowedExtensions.includes(`.${fileExtension}`)) {
        errors[
          key
        ] = `Invalid file type. Supported file types include ${allowedExtensions.join(
          ", "
        )}.`;
      }
    });

    return errors;
  };

  const handleSubmit = async (values: formValuesType) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
        // @ts-ignore
      formData.append(key, values[key]);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/form/create-new-analysis`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      if (response.status === 200) {
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formInitialValues: formValuesType = {
    peopleyml: null,
    peoplejson: null,
    transaction: null,
    transfer: null,
    promotion: null,
  };

  return { formInitialValues, validateFiles, handleSubmit };
};
