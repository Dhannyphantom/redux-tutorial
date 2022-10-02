import "./App.css";
import PostForm from "./logic/posts/PostForm";
import PostRender from "./logic/posts/PostRender";

function App() {
  return (
    <div className="App">
      <PostForm />
      <PostRender />
    </div>
  );
}

export default App;
