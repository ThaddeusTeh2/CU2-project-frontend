// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "sonner";

//routes
import Brand from "./pages/Brand";
import Car from "./pages/Car";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import List from "./pages/List";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Type from "./pages/Type";
import Explore from "./pages/Explore";

function App() {
  return (
    <div className="App">
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/type" element={<Type />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/list" element={<List />} />
            <Route path="/explore" element={<Explore />} />

            <Route path="/car" element={<Car />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
        <Toaster expand={true} richColors position="top-right" />
      </CookiesProvider>
    </div>
  );
}

export default App;
