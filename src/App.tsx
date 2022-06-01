import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AppLayout from "./component/appLayout";
import HomeScreen from './screen/home';
import UserPosts from "./screen/userPosts";
import PostDetail from './screen/postDetail';
import NotFound from './screen/notFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/users/:userId/posts" element={<UserPosts />} />
            <Route path="/users/:userId/posts/:postId" element={<PostDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </AppLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
