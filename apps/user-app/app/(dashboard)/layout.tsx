import { Sidebar } from "../../components/SidebarItem";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      {children}
    </div>
  );
}
