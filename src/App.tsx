import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./components/home";
import "./App.css";

function App() {
  const fruits = new QueryClient();

  return (
    <QueryClientProvider client={fruits}>
      <Home />
    </QueryClientProvider>
  );
}

export default App;
