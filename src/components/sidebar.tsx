import { ChartNoAxesCombined, Home, Rss } from "lucide-react";
import { useTabs } from "../hooks/useTabs";
import "./styles.css";
const files = [
  { id: "home", name: "Home", urlPath: "/home", icon: <Home /> },
  { id: "blogs", name: "Blogs", urlPath: "/blogs", icon: <Rss /> },
  {
    id: "analytics",
    name: "Analytics",
    urlPath: "/analytics",
    icon: <ChartNoAxesCombined />,
  },
];

export default function SideBar() {
  const { openTab } = useTabs();

  return (
    <div>
      <h3 className="title">SuperOps</h3>
      <nav>
        {files.map((file) => (
          <div
            key={file.id}
            className="nav-item"
            onClick={() => openTab(file.id, file.name, file.urlPath)}
          >
            <span>{file.icon}</span> {file.name}
          </div>
        ))}
      </nav>
    </div>
  );
}
