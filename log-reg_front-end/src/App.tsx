import { Routes, Route } from "react-router-dom";
// import { NotFoundView } from './components/views/menu-views/NotFoundView'; todo
import { Menu } from "./Menu";
import { AdminPanel } from "./components/Authentication/Admin/AdminPanel";
import { Users } from "./components/UsersList/Users";
import { Reset } from "./components/Authentication/Reset/Reset";
import { BeLogin } from "./components/Authentication/Login/BeLogin";
import { UserPanel } from "./components/AfterLogin/UserPanel";
import { ToastContainer } from "react-toastify";
import { ResetEmail } from "./components/Authentication/Reset/ResetEmail";
import { LookEmail } from "./components/Authentication/Register/LookEmail";
import { MenuCrud } from "./components/AfterLogin/CRUD-question/MenuCrud/MenuCrud";
import { InsertMain } from "./components/AfterLogin/CRUD-question/InsertInTable/InsertMain";
import { Quiz } from "./components/AfterLogin/Quiz/Quiz";
import "./styles/style.css";
// import LogRocket from 'logrocket';   todo

export const App = () => {
  return (
    <>
      <ToastContainer limit={3} />
      <Routes>g
        <Route path="/" element={<Menu />} />
        <Route path="/quiz/:tableName" element={<Quiz />} />
        <Route path="/insert/:username/:tableName" element={<InsertMain />} />
        <Route path="/kliknij-link" element={<LookEmail />} />
        <Route path="/crud-question" element={<MenuCrud />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/after-login" element={<UserPanel />} />
        <Route path="/users" element={<Users />} />
        <Route path="/reset/:id/:token" element={<Reset />} />
        <Route path="/reset-email" element={<ResetEmail />} />
        <Route path="/be-login" element={<BeLogin />} />
      </Routes>
    </>
  );
};
