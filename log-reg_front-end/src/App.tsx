import { Routes, Route } from "react-router-dom";
// import { NotFoundView } from './components/views/menu-views/NotFoundView';
import { Menu } from "./Menu";
import { Login } from "./components/Authentication/Login/Login";
import { Regist } from "./components/Authentication/Register/Regist";
import { AdminPanel } from "./components/Authentication/Admin/AdminPanel";
import { UsersList } from "./components/UsersList/Users";
import { Reset } from "./components/Authentication/Reset/Reset";
import { BeLogin } from "./components/Authentication/Login/BeLogin";
import { CorrectLogin } from "./components/AfterLogin/CorrectLogin";
import { ToastContainer } from "react-toastify";
// import LogRocket from 'logrocket';   todo
export const App = () => {
  return (
    <><ToastContainer />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/after-login" element={<CorrectLogin />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/reset" element={<Reset/>} />
        <Route path="/be-login" element={<BeLogin/>} />
      </Routes>
    </>
  );
};
