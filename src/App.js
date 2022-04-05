import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import RepoList from "./RepoList";
import RepoDetail from "./RepoDetail";
import Layout from "antd/lib/layout";

function App() {
  return (
    <Layout className="min-h-screen">
      <Layout.Content className="p-4">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/:username/repos" element={<RepoList />} />
            <Route
              path="/users/:username/repos/:repo"
              element={<RepoDetail />}
            />
          </Routes>
        </Router>
      </Layout.Content>
    </Layout>
  );
}

export default App;
