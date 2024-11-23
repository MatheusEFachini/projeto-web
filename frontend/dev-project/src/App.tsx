import { BrowserRouter, Routes, Route } from "react-router-dom";
import DesenvolvedorListPage from "./pages/Desenvolvedor/DesenvolvedorListPage";
import HomePage from "./pages/HomePage";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/ui/app-sidebar";
import NivelListPage from "./pages/Nivel/NivelListPage";
import { AlertDialogProvider } from "./components/ui/alert-dialog-provider";
import { Toaster } from "./components/ui/toaster";

export function App() {
  return (
    <AlertDialogProvider>
      <SidebarProvider>
        <AppSidebar />
        <BrowserRouter>
          <SidebarTrigger />
          <Toaster />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/desenvolvedores"
              element={<DesenvolvedorListPage />}
            />
            <Route path="/nivel" element={<NivelListPage />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </AlertDialogProvider>
  );
}
