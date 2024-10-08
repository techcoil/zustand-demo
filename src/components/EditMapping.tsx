import { useEffect } from "react";
import { useFormFields } from "../data/form-data";
import { useCurrentField, useFormMapStore } from "../store/form-map-store";

export function EditMapping() {
  const currentField = useCurrentField();
  const clearCurrentField = useFormMapStore((state) => state.clearCurrentField);
  const setMapping = useFormMapStore((state) => state.setMapping);

  const { data: fields, isLoading } = useFormFields();

  if (!currentField) {
    return null;
  }

  if (isLoading) {
    return <div>Loading Form Fields...</div>;
  }

  return (
    <div className="p-4 relative">
      <h3 className="mb-4">
        Select Form field for: <b>{currentField.label}</b>
      </h3>
      <div>
        <button onClick={clearCurrentField}>Cancel</button>
      </div>
      <div className="flex gap-2 flex-col max-w-64">
        {fields?.map((field) => (
          <button
            key={field.id}
            className="border p-2 hover:bg-gray-100"
            onClick={() => setMapping(currentField.id, field)}
          >
            {field.label}
          </button>
        ))}
      </div>
    </div>
  );
}
