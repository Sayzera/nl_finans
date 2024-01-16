import { Separator } from "@/components/ui/separator";
import { selectActionName } from "@/redux/main-slice";
import { useSelector } from "react-redux";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function DataEntryDashboard({ children }: SettingsLayoutProps) {
  const actionName = useSelector(selectActionName);
  return (
    <>
      <div className=" space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">{actionName}</h2>
          <p className="text-muted-foreground">
            {actionName} işlemleri buradan yapabilirsiniz.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
