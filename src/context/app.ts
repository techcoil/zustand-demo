import { createContext, useContext } from "react";

type AppData = {
  formId: number;
};

export const appContext = createContext<AppData>({ formId: NaN });

export const AppProvider = appContext.Provider;

export const useFormId = () => {
  return useContext(appContext).formId;
};
