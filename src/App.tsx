import { HashRouter, Route, Routes } from "react-router";
import "./App.css";
import SideBar from "./components/sidebar";
import TabBar from "./components/tabBar";
import { TabsProvider } from "./contexts/TabsContext";
import Home from "./pages/home";
import Blogs from "./pages/blogs";
import Blog from "./pages/blog";
import { Bird } from "lucide-react";

function AppContent() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "200px", borderRight: "1px solid #ccc" }}>
        <SideBar />
      </div>
      <div style={{ flex: 1 }}>
        <TabBar />
        <div style={{ height: "100%", padding: "20px" }}>
          <Routes>
            <Route
              path="/"
              element={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    flexDirection: "column",
                  }}
                >
                  <Bird
                    size={128}
                    color="#b32bc5"
                    strokeWidth={1.75}
                    absoluteStrokeWidth
                  />
                  Welcome! Select a page from the sidebar.
                </div>
              }
            />
            <Route path="home" element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/:trackId" element={<Blog />} />
            <Route path="analytics" element={<div>Analytics page</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <TabsProvider>
        <AppContent />
      </TabsProvider>
    </HashRouter>
  );
}

export default App;
