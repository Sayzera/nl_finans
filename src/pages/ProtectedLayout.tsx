import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { Link, Outlet } from "react-router-dom";

import { MainNav } from "@/components/dashboard/main-nav";

import { useNavigate } from "react-router-dom";
// import { Search } from "@/components/dashboard/search";
// import TeamSwitcher from "@/components/dashboard/team-switcher";
import { UserNav } from "@/components/dashboard/user-nav";
import niltekLogo from "@/assets/logo/niltek-logo.png";
import { Helmet } from "react-helmet";

export default function ProtectedLayout() {
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();
  React.useEffect(() => {
    const authState = onAuthStateChanged(auth, (fb_user) => {
      if (fb_user) {
        setUser(fb_user);
      } else {
        navigate("/auth/login");
      }
    });

    return authState;
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Niltek Finans</title>
      </Helmet>
      <>
        <div className=" flex-col md:flex">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              {/* <TeamSwitcher /> */}
              <div className="ml-4">
                <Link to="/admin/dashboard">
                  <img src={niltekLogo} alt="Niltek Logo" className="h-8" />
                </Link>
              </div>

              <MainNav />
              <div className="ml-auto flex items-center space-x-4">
                {/* <Search /> */}
                <UserNav />
              </div>
            </div>
          </div>

          {/* Main */}
          <Outlet />
          {/* Main End */}
        </div>
      </>
    </div>
  );
}
