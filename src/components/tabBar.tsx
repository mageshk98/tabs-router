import { useTabs } from "../hooks/useTabs";

export default function TabBar() {
  const { openTabs, activeTabId, openTab, closeTab } = useTabs();

  return (
    <div className="tabs-panel">
      {openTabs.map((tab) => (
        <div
          key={tab.fileId}
          className={`tab ${activeTabId === tab.fileId ? "active" : ""}`}
          onClick={() => openTab(tab.fileId, tab.name, tab.urlPath)}
          title={tab.name}
        >
          <span className="tabName">{tab.name}</span>
          <span
            style={{
              marginLeft: 8,
              color: "red",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.fileId);
            }}
          >
            ✕
          </span>
        </div>
      ))}
    </div>
  );
}
