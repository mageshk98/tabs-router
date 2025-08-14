import { useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { TabsContext } from "../hooks/useTabs";

type Tab = {
  fileId: string;
  name: string;
  urlPath: string;
};

type TabsContextValue = {
  openTabs: Tab[];
  activeTabId: string | null;
  openTab: (fileId: string, name: string, urlPath: string) => void;
  closeTab: (fileId: string) => void;
  setActiveTab: (fileId: string) => void;
  moveTab: (fromIndex: number, toIndex: number) => void;
};

export const TabsProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  // const location = useLocation();
  const [openTabs, setOpenTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const openTab = (fileId: string, name: string, urlPath: string) => {
    setOpenTabs((prev) => {
      const alreadyOpen = prev.find((tab) => tab.fileId === fileId);
      if (alreadyOpen) {
        setActiveTabId(fileId);
        return prev;
      }
      return [...prev, { fileId, name, urlPath }];
    });
    setActiveTabId(fileId);
    navigate(urlPath);
  };

  const closeTab = (fileId: string) => {
    setOpenTabs((prev) => {
      const filtered = prev.filter((tab) => tab.fileId !== fileId);
      if (fileId === activeTabId) {
        const nextActiveTab = filtered.length
          ? filtered[filtered.length - 1]
          : null;
        setActiveTabId(nextActiveTab ? nextActiveTab.fileId : null);
        navigate(nextActiveTab?.urlPath || "");
      }
      return filtered;
    });
  };

  const moveTab = (fromIndex: number, toIndex: number) => {
    setOpenTabs((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  };

  return (
    <TabsContext.Provider
      value={{
        openTabs,
        activeTabId,
        openTab,
        closeTab,
        setActiveTab: setActiveTabId,
        moveTab,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export type { Tab, TabsContextValue };
