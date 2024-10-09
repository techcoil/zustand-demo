import { QueryClientProvider } from "@tanstack/react-query";
import { AppContent } from "./components/AppContent";
import { Header } from "./components/Header";
import { AppProvider } from "./context/app";
import { queryClient } from "./data/query-client";

type Props = Readonly<{
  formId: number;
}>;

function App({ formId }: Props) {
  return (
    <AppProvider value={{ formId }}>
      <QueryClientProvider client={queryClient}>
        <div>
          <Header />
          <AppContent />
        </div>
      </QueryClientProvider>
    </AppProvider>
  );
}

export default App;
