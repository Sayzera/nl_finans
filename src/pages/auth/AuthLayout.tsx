import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div>
      <div className="flex flex-col items-center  min-h-screen py-2 w-full ">
        <div className="container md:w-[640px] mx-auto px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
