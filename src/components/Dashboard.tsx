import { useEffect, useRef } from "react";
import { useServiceFields, useServices } from "../data/service-fields";
import { useFormMapStore } from "../store/form-map-store";

export function Dashboard() {
  const selectedService = useFormMapStore((state) => state.service);

  const { data: fields, isLoading: isLoadingFields } =
    useServiceFields(selectedService);
  const { data: services, isLoading: servicesLoading } = useServices();

  const setCurrentField = useFormMapStore((state) => state.setCurrentField);
  const setCurrentService = useFormMapStore((state) => state.selectService);
  const clearMappings = useRef(
    useFormMapStore((state) => state.clearMappings)
  ).current;
  const getServiceFieldMapping = useFormMapStore(
    (state) => state.getServiceFieldMapping
  );

  return (
    <div>
      <div className="bg-gray-400 p-4">
        {servicesLoading ? (
          <div>Loading Services...</div>
        ) : (
          <>
            Select a Service:{" "}
            <select
              defaultValue={selectedService || ""}
              onChange={(e) => setCurrentService(e.target.value)}
            >
              <option value=""></option>
              {services?.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      <div className="p-4 bg-gray-50">
        {isLoadingFields && <div>Loading...</div>}
        {fields && (
          <table className="table-auto bg-white border-collapse	border border-slate-500 ">
            <thead>
              <tr className="bg-gray-400">
                {["Service Field Name", "Mapping", "Edit"].map((header) => (
                  <th className="p-2 border" key={header}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fields?.map((field) => (
                <tr key={field.id}>
                  <td className="border p-2">{field.label} </td>
                  <td className="border p-2">
                    {getServiceFieldMapping(field.id)?.label || (
                      <span className="opacity-25">N/A</span>
                    )}
                  </td>
                  <td className="border p-2">
                    <button onClick={() => setCurrentField(field)}>✏️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
