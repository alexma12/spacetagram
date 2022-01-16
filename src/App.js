import { ReactComponent as HeartIcon } from "./svg/heart-outline.svg";
import { ReactComponent as HomeIcon } from "./svg/home-outline.svg";
import { ReactComponent as NotificationIcon } from "./svg/notifications-outline.svg";
import logo from "./profilepic.jpg";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <div className="Navbar">
        <div className="Navbar-title"> Spacetgram </div>
        <div className="Navbar-buttons">
          <HomeIcon className="Navbar-button Navbar-button-filled" />
          <NotificationIcon className="Navbar-button" />
          <HeartIcon className="Navbar-button" />
          <img src={logo} className="Navbar-avatar" />
        </div>
      </div>
    </div>
  );
};

export default App;
