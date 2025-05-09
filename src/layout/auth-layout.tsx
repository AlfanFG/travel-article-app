import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Outlet />
    </div>
  );
}
