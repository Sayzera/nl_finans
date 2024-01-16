import { selectActionName, setActionName } from "@/redux/main-slice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function MainNav() {
  const dispatch = useDispatch();
  const actionName = useSelector(selectActionName);
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
      <Link
        onClick={() => dispatch(setActionName("Günlük Gelir Gider"))}
        to="/admin/gunluk-gelir-gider"
        className={`flex h-7 items-center justify-center rounded-full px-4 text-center text-sm 
        transition-colors hover:text-primary  font-medium text-primary ${
          actionName == "Günlük Gelir Gider" ? "bg-muted" : ""
        }`}
      >
        Günlük Gelir Giderler
      </Link>
      <Link
        onClick={() => dispatch(setActionName("Aylık Gelir Gider"))}
        to="/admin/aylik-gelir-gider"
        className={`flex h-7 items-center justify-center rounded-full px-4 text-center text-sm 
        transition-colors hover:text-primary  font-medium text-primary ${
          actionName == "Aylık Gelir Gider" ? "bg-muted" : ""
        }`}
      >
        Aylık Gelir Giderler
      </Link>
      <Link
        onClick={() => dispatch(setActionName("Yüksek Giderler"))}
        to="/admin/yuksek-giderler"
        className={`flex h-7 items-center justify-center rounded-full px-4 text-center text-sm 
        transition-colors hover:text-primary  font-medium text-primary ${
          actionName == "Yüksek Giderler" ? "bg-muted" : ""
        }`}
      >
        Yüksek Giderler
      </Link>
      <Link
        onClick={() => dispatch(setActionName("Yüksek Gelirler"))}
        to="/admin/yuksek-gelir"
        className={`flex h-7 items-center justify-center rounded-full px-4 text-center text-sm 
        transition-colors hover:text-primary  font-medium text-primary ${
          actionName == "Yüksek Gelirler" ? "bg-muted" : ""
        }`}
      >
        Yüksek Gelirler
      </Link>
      <Link
        onClick={() => dispatch(setActionName("Banka İşlemleri"))}
        to="/admin/banka-islemleri"
        className={`flex h-7 items-center justify-center rounded-full px-4 text-center text-sm 
        transition-colors hover:text-primary  font-medium text-primary ${
          actionName == "Banka İşlemleri" ? "bg-muted" : ""
        }`}
      >
        Banka İşlemleri
      </Link>
    </nav>
  );
}
