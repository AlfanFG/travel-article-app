import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

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
