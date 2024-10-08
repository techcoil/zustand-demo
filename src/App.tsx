import { QueryClientProvider } from "@tanstack/react-query";
import { AppContent } from "./components/AppContent";
import { queryClient } from "./data/query-client";
import { AppProvider } from "./context/app";

type Props = Readonly<{
  formId: number;
}>;

function App({ formId }: Props) {
  return (
    <AppProvider value={{ formId }}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </AppProvider>
  );
}

export default App;
