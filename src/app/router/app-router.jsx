import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "../../pages/landing/index.js";
import { ProfilePage } from "../../pages/profile/index.js";
import { ChatPage } from "../../pages/chat/index.js";
import { LoginPage } from "../../pages/login/index.js";


export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Common Routes */}
                <Route path="/introduce" element={<LandingPage/>}/>
                <Route path="*" element={<LandingPage/>}/>
                {/* Unsigned Routes */}
                <Route path="/login" element={<LoginPage/>}/>
                {/* Protected Routes */}
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/chat" element={<ChatPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}
