import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "@/pages/landing/index.js";
import { ProfilePage } from "@/pages/profile/index.js";
import { ChatPage } from "@/pages/chat/index.js";
import { LoginPage } from "@/pages/login/index.js";
import { NotFound } from "../../pages/not-found/index.js"
import { ProtectedRoute, PublicOnlyRoute } from "./protected-router.jsx";


export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicOnlyRoute />}>
                    <Route path="/auth" element={<AuthPage/>}/>
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/chat" element={<ChatPage/>}/>
                </Route>

                <Route path="/introduce" element={<LandingPage/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}
