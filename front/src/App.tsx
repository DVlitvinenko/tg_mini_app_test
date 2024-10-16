import { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import Form from "./components/Form";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <>
      <div className=" pt-10">
        <Header />
        <Routes>
          <Route index Component={ProductList} />
          <Route path="/form" Component={Form} />
        </Routes>
      </div>
    </>
  );
}

export default App;
