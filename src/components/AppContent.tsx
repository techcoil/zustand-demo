import { useCurrentField } from "../store/form-map-store";
import { Dashboard } from "./Dashboard";
import { EditMapping } from "./EditMapping";

export function AppContent() {
  const currentField = useCurrentField();
  return currentField ? <EditMapping /> : <Dashboard />;
}
