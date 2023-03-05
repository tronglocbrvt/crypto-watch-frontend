import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import SelectButton from "./SelectButton";
import { chartHours } from "../config/data";

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [hours, setHours] = useState(24);
  const [flag,setflag] = useState(false);

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles();

  const fetchHistoricData = async () => {
    const nums_hour = hours
    const { data } = await axios.post(HistoricalChart, {nums_hour});
    setflag(true);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    const interval = setInterval(() => {
        fetchHistoricData();
    }, 1000*60*60);
    return () => clearInterval(interval);
  }, [hours]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData | flag===false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin.price_chart[0]*1000);
                  return date.toISOString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin.price_chart[1]),
                    label: `Price (Past ${hours} hours) in USD`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartHours.map((hour) => (
                <SelectButton
                  key={hour.value}
                  onClick={() => {setHours(hour.value);
                    setflag(false);
                  }}
                  selected={hour.value === hours}
                >
                  {hour.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
