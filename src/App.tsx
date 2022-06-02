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
import UserAlbums from './screen/userAlbums';
import AlbumDetail from './screen/albumDetail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/users/:userId/posts" element={<UserPosts />} />
            <Route path="/users/:userId/posts/:postId" element={<PostDetail />} />
            <Route path="/users/:userId/albums" element={<UserAlbums />} />
            <Route path="/users/:userId/albums/:albumId" element={<AlbumDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </AppLayout>
    </div>
    </BrowserRouter>
  );
}

export default App;
