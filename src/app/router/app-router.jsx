import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandigPage } from "../../pages/landing";
import { ProfilePage } from "../../pages/profile";
import { ChatPage } from "../../pages/chat";
import { LoginPage } from "../../pages/login";


export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Common Routes */}
                <Route path="/introduce" element={<LandigPage/>}/>
                <Route path="*" element={<LandigPage/>}/>
                {/* Unsigned Routes */}
                <Route path="/login" element={<LoginPage/>}/>
                {/* Protected Routes */}
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/chat" element={<ChatPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}
