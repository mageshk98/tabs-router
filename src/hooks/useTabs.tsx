import { useContext, createContext } from "react";
import { type TabsContextValue } from "../contexts/TabsContext";

export const TabsContext = createContext<TabsContextValue | undefined>(
  undefined
);

export const useTabs = (): TabsContextValue => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context;
};
