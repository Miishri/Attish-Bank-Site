import {AnimatePresence} from "framer-motion";
import {Route, Routes, useLocation} from "react-router-dom";
import Register from "./Register.jsx";
import Homepage from "./Homepage.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";

export default function Routers() {
    const location = useLocation()

    return (
        <AnimatePresence mode={"wait"}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Homepage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </AnimatePresence>
    )
}