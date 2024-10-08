import { useQuery } from "@tanstack/react-query";
import { useFormId } from "../context/app";

export type FormField = {
  id: string;
  label: string;
};

async function getFormFields(): Promise<FormField[]> {
  await new Promise((res) => setTimeout(res, 1000));

  return [
    {
      id: "first_name",
      label: "Form First Name",
    },
    {
      id: "last_name",
      label: "Form Last Name",
    },
    {
      id: "_ip",
      label: "Sender IP Address",
    },
    {
      id: "_date",
      label: "Send Date (Y-m-d)",
    },
  ];
}

export const useFormFields = () => {
  const formId = useFormId();
  return useQuery({
    queryKey: ["form-fields", `${formId}`],
    queryFn: getFormFields,
  });
};
