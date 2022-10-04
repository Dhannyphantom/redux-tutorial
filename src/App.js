import "./App.css";
import PostForm from "./logic/posts/PostForm";
import PostRender from "./logic/posts/PostRender";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import SinglePostPage from "./logic/posts/SinglePostPage";
import EditPostPage from "./logic/posts/EditPostPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostRender />} />
        <Route path="post">
          <Route index element={<PostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit">
            <Route path=":postId" element={<EditPostPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
