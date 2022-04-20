import ContextProvider from "./Context/context";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <ContextProvider>
      <HomePage />
    </ContextProvider>
  );
}

export default App;
