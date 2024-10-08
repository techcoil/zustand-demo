import { useCurrentField } from "../store/form-map-store";
import { EditMapping } from "./EditMapping";
import { Header } from "./Header";
import { Dashboard } from "./Dashboard";

export function AppContent() {
  const currentField = useCurrentField();

  return (
    <div>
      <Header />
      {currentField ? <EditMapping /> : <Dashboard />}
    </div>
  );
}
