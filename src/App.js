import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Form from './components/pages/forum/form.js';
import Chat from './components/pages/chatbot/chat.js';
import Buy from './components/pages/buy/buy.js'; 
import Price from './components/pages/priceConfirm/price.js';
import Home from './components/pages/frontend3/page.js';
function App() {
  return (
      <Router>
          <Switch>
              <Route path="/price" exact component={Price} /> {my-app\src\components\pages\price confirm\price.js}
              <Route path="/forum" component={Form} /> {my-app\src\components\pages\forum\form.js}
              <Route path="/chat" component={Chat} /> {my-app\src\components\pages\chat bot\chat.js}
              <Route path="/buy" component={Buy} /> {my-app\src\components\pages\buy\buy.js}
              {/* Add other routes as needed */}
          </Switch>
      </Router>
  );
}

export default App;
