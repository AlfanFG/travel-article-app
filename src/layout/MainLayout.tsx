import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

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
