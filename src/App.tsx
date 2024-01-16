import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { fakeAuthProvider } from "./auth";
import { LoginPage } from "./pages/auth/login/loginPage";
import AuthLayout from "./pages/auth/AuthLayout";
import ProtectedLayout from "./pages/ProtectedLayout";
import AdminDashboard from "./pages/admin/dashboard";
import { store } from "./redux/store";
import { Toaster } from "@/components/ui/toaster";
import { GunlukGelirGiderler } from "./pages/admin/data-entry/gunluk-gelir-gider/gunluk-gelir-gider";
import { BankaHesabiTanimlama } from "./pages/admin/data-entry/banka-islemleri/banka-hesabi-tanimlama";
import { AylikGelirGider } from "./pages/admin/data-entry/aylik-islemler/aylik-gelir-gider";
import { YuksekGiderler } from "./pages/admin/data-entry/yuksek-giderler/yuksek-giderler";
import { YuksekGelir } from "./pages/admin/data-entry/yuksek-gelir/yuksek-gelir";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      // Our root route always provides the user, if logged in
      return { user: fakeAuthProvider.username };
    },
    Component: ProtectedLayout,
    children: [
      {
        path: "/",
        index: true,
        Component: AdminDashboard,
      },
      {
        index: true,
        path: "/admin/dashboard",
        Component: AdminDashboard,
      },
      {
        path: "/admin/gunluk-gelir-gider",
        Component: GunlukGelirGiderler,
      },
      {
        path: "/admin/banka-islemleri",
        Component: BankaHesabiTanimlama,
      },
      {
        path: "/admin/aylik-gelir-gider",
        Component: AylikGelirGider,
      },
      {
        path: "/admin/yuksek-giderler",
        Component: YuksekGiderler,
      },
      {
        path: "/admin/yuksek-gelir",
        Component: YuksekGelir,
      },
    ],
  },
  {
    path: "auth",
    id: "auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: LoginPage,
      },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <Toaster />
      <RouterProvider
        router={router}
        fallbackElement={<p>Initial Load...</p>}
      />
    </Provider>
  );
}
