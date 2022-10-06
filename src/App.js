import "./App.css";
import PostForm from "./logic/posts/PostForm";
import PostRender from "./logic/posts/PostRender";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import SinglePostPage from "./logic/posts/SinglePostPage";
import EditPostPage from "./logic/posts/EditPostPage";
import UsersList from "./logic/users/UsersList";
import UserPage from "./logic/users/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostRender />} />
        <Route path="post">
          <Route index element={<PostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostPage />} />
        </Route>

        <Route path="users">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

        {/*   CATCH ALL ROUTES   */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
