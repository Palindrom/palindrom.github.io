import Home from './pages/home';
import Docs from './pages/docs';

import SimpleReactRouter from 'simple-react-router';

class App extends SimpleReactRouter {
  routes(map) {
    map('/', Home);
    map('/docs', Docs);
  }
}

export default App;
