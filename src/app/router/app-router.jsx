import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "@/pages/landing";
import { ProfilePage } from "@/pages/profile";
import { ChatPage } from "@/pages/chat";
import { AuthPage } from "@/pages/auth";
import { NotFound } from "@/pages/not-found"
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
                    <Route path="/chat/:chat_id" element={<ChatPage/>}/>
                </Route>

                <Route path="/introduction" element={<LandingPage/>}/>
                <Route path="/introduce" element={<LandingPage/>}/>
                <Route path="/landing" element={<LandingPage/>}/>
                <Route path="/about" element={<LandingPage/>}/>
                <Route path="/main" element={<LandingPage/>}/>
                <Route path="/" element={<LandingPage/>}/>
                
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}
