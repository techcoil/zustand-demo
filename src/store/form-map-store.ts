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
  selectService: (service: string) => void;
  setCurrentField: (field: ServiceField) => void;
  mappings: Record<string, FormField>;
  getServiceFieldMapping: (fieldId: string) => FormField | null;
  setMapping: (fieldId: string, field: FormField) => void;
  clearCurrentField: () => void;
  clearMappings: () => void;
};

export const useFormMapStore = create<FormMapState>((set, get) => ({
  currentField: null,
  mappings: {},
  service: null,
  getServiceFieldMapping: (fieldId: string) => get().mappings[fieldId] ?? null,
  selectService: (service) => set({ service }),
  setMapping: (fieldId: string, formField: FormField) =>
    set((state) => {
      return {
        currentField: null,
        mappings: {
          ...state.mappings,
          [fieldId]: formField,
        },
      };
    }),
  clearCurrentField: () => set({ currentField: null }),
  clearMappings: () => set({ mappings: {} }),
  setCurrentField: (field) =>
    set({
      currentField: field,
    }),
}));

export const useCurrentField = () =>
  useFormMapStore((state) => state.currentField);

export const useSelectedService = () =>
  useFormMapStore((state) => state.service);
