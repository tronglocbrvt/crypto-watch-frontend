import './App.css';
import { makeStyles } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import CoinPage from './pages/CoinDetailPage';
import Header from "./components/Header";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
    <div className={classes.App}>
      <Header />
      <Route path="/" component={CoinPage} exact />
    </div>
  </BrowserRouter>
  );
}

export default App;
