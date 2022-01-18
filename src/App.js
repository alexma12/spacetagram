import { ReactComponent as HeartIcon } from "./svg/heart-outline.svg";
import { ReactComponent as HomeIcon } from "./svg/home-outline.svg";
import { ReactComponent as NotificationIcon } from "./svg/notifications-outline.svg";
import CardComponent from "./CardComponent";
import useAxiosRequest from "./hooks/useAxiosRequest";
import logo from "./profilepic.jpg";
import "./App.scss";

const App = () => {
  const requestParams = {
    url: `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&count=5`,
    method: "GET",
  };
  const [response, error] = useAxiosRequest(requestParams);

  let cardComponents;
  if (error === null && response !== null) {
    cardComponents = response.data.map(
      ({ hdurl, copyright, explanation, title }) => (
        <CardComponent
          img={hdurl}
          title={title}
          copyright={copyright}
          explanation={explanation}
        />
      )
    );
  }
  console.log(response);
  return (
    <div className="App">
      <div className="Navbar">
        <div className="Navbar-title"> Spacestagram </div>
        <div className="Navbar-buttons">
          <HomeIcon className="Navbar-button Navbar-button-filled" />
          <NotificationIcon className="Navbar-button" />
          <HeartIcon className="Navbar-button" />
          <img src={logo} className="Navbar-avatar" alt="avatar" />
        </div>
      </div>
      <div className="CardComponent-box">{cardComponents}</div>
    </div>
  );
};

export default App;
