import { useMutation, useQuery } from "@tanstack/react-query";
import { ServiceField, useFormMapStore } from "../store/form-map-store";

async function fetchServices() {
  console.log("Fetching Services");
  await new Promise((res) => setTimeout(res, 1000));
  return ["MOT", "MOF", "Gov Extra"];
}

async function fetchServiceFields(
  serviceName: string
): Promise<ServiceField[]> {
  console.log("Fetching Service Fields for ", serviceName);
  await new Promise((res) => setTimeout(res, 1000));
  return [
    {
      id: "first_name",
      label: `First Name ${serviceName}`,
      type: "text",
      validation: {
        type: "text",
        min: 1,
        max: 255,
      },
      required: true,
    },
    {
      id: "last_name",
      label: `Last Name ${serviceName}`,
      type: "text",
      validation: {
        type: "text",
        min: 1,
        max: 255,
      },
      required: true,
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      validation: {
        type: "email",
      },
      required: true,
    },
    {
      id: "phone",
      label: "Phone",
      type: "number",
      validation: {
        type: "text",
        regex: "^0(?:57\\d|23489)[1-9]\\d{6}$",
      },
      required: false,
    },
  ];
}

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: () => fetchServices(),
    staleTime: Infinity,
  });
};

export const useServiceFields = (service: string | null) => {
  return useQuery({
    queryKey: ["services", `${service}`, "fields"],
    queryFn: () =>
      service ? fetchServiceFields(service) : Promise.resolve([]),
    staleTime: Infinity,
    enabled: !!service,
  });
};

export function usePersistCurrentField(formId: number) {
  const mappings = useFormMapStore((state) => state.mappings);
  const currentService = useFormMapStore((state) => state.service);
  return useMutation({
    mutationKey: ["saveCurrentField"],
    mutationFn: async () => {
      console.log("making request");
      await new Promise((res) => setTimeout(res, 2000));
      console.log("Persisting Mapping", {
        formId,
        service: currentService,
        mappings,
      });
    },
  });
}
