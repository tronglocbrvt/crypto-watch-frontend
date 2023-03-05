import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import CoinInfo from "../components/CoinInfo";
import { GetCurrentPrice } from "../config/api";

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinPage = () => {
  const [price, setPrice] = useState();

  const fetchPrice = async () => {
    const { data } = await axios.post(GetCurrentPrice);

    setPrice(data);
  };

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(() => {
        fetchPrice();
    }, 1000*60*60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
        fetchPrice();
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      color: "gold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "90%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));

  const classes = useStyles();

  if (!price) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src='https://d33wubrfki0l68.cloudfront.net/13ca0c32ffd56bcfaf861b9a8acb212d0f6482e3/d8df6/static/c3bcc8c47890ffd2a2c329972c73d0fd/e018d/ethereum-logo-portrait-black-gray.png'
          alt='Ethereum'
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="subtitle1" className={classes.description}>
            Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform. Among cryptocurrencies, ether is second only to bitcoin in market capitalization.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                color: "gold",
                fontFamily: "Montserrat",
              }}
            >
              ${" "}
              {numberWithCommas(
                price?.price.price
              )}
            </Typography>
          </span>
          <Typography variant="subtitle1" style={{
                fontFamily: "Montserrat",
              }}>
             (Refresh every 10 minutes)
          </Typography>
        </div>
      </div>
      <CoinInfo />
    </div>
  );
};

export default CoinPage;
