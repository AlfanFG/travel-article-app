import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { Card } from "@/components/ui/card";

export default function MainLayout() {
  return (
    <Sidebar>
      {/* <Header /> */}
      <main className="w-full h-full">
        <Outlet />
      </main>
    </Sidebar>
  );
}
