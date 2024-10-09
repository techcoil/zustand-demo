import { create } from "zustand";
import { FormField } from "../data/form-data";

type ValidationType =
  | {
      type: "number";
      min: number;
      max: number;
    }
  | {
      type: "email";
    }
  | {
      type: "text";
      regex?: string;
      min?: number;
      max?: number;
    };

export type ServiceField = {
  id: string;
  label: string;
  type: "text" | "number" | "email";
  validation: ValidationType;
  required: boolean;
};

type FormMapState = {
  currentField: ServiceField | null;
  service: string | null;
  mappings: Record<string, FormField | null>;
};

type FromMapActions = {
  selectService: (service: string) => void;
  setCurrentField: (field: ServiceField) => void;
  setMapping: (fieldId: string, field: FormField | null) => void;
  clearCurrentField: () => void;
  clearMappings: () => void;
};

export const useFormMapStore = create<FormMapState & FromMapActions>()(
  (set) => ({
    currentField: null,
    mappings: {},
    service: null,
    selectService: (service) => set({ service }),
    setMapping: (fieldId: string, formField: FormField | null) =>
      set((state) => ({
        mappings: {
          ...state.mappings,
          [fieldId]: formField,
        },
      })),

    clearCurrentField: () => set({ currentField: null }),
    clearMappings: () => set({ mappings: {} }),
    setCurrentField: (field) =>
      set({
        currentField: field,
      }),
  })
);

export const useCurrentField = () =>
  useFormMapStore((state) => state.currentField);

export const useSelectedService = () =>
  useFormMapStore((state) => state.service);

export const getServiceFieldMapping = (fieldId: string) =>
  useFormMapStore.getState().mappings[fieldId] ?? null;
