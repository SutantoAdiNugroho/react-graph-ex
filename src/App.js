import React, { useEffect } from "react";
import { Grid, Box, Select, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CanvasJs from "./src/chartjs/canvasjs.react";
import SweetAlert from "sweetalert2";

const CanvasJsChart = CanvasJs.CanvasJSChart;
const arrCategory = [
  [
    {
      category: "Transmission Expenses",
      target: 49,
      achv: 83,
    },
    {
      category: "Power Expenses",
      target: 51,
      achv: 56,
    },
    {
      category: "Radio Frequency Usage",
      target: 42,
      achv: 79,
    },
  ],
  [
    {
      category: "Transmission Expenses",
      target: 49,
      achv: 58,
    },
    {
      category: "Power Expenses",
      target: 51,
      achv: 84,
    },
    {
      category: "Radio Frequency Usage",
      target: 42,
      achv: 45,
    },
  ],
  [
    {
      category: "Transmission Expenses",
      target: 49,
      achv: 39,
    },
    {
      category: "Power Expenses",
      target: 51,
      achv: 52,
    },
    {
      category: "Radio Frequency Usage",
      target: 42,
      achv: 37,
    },
  ],
  [
    {
      category: "Transmission Expenses",
      target: 49,
      achv: 67,
    },
    {
      category: "Power Expenses",
      target: 51,
      achv: 66,
    },
    {
      category: "Radio Frequency Usage",
      target: 42,
      achv: 86,
    },
  ],
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  selectBox: {
    minWidth: 150,
  },
}));

function App() {
  const classes = useStyles();
  const [ctgry, setCtgry] = React.useState(0);
  const [month, setMonth] = React.useState(0);
  const [resChart, setResChart] = React.useState({});

  const getCompare = () => {
    const minus = resChart.achv - resChart.target;
    return minus;
  };

  const optionsGraph = {
    animationEnabled: true,
    exportFileName: resChart.category,
    exportEnabled: true,
    title: {
      text: resChart.category,
    },
    data: [
      {
        type: "column",
        dataPoints: [
          { label: "Target", y: resChart.target },
          { label: "Delta", y: getCompare() },
          { label: "Achievement", y: resChart.achv },
        ],
      },
    ],
  };

  useEffect(() => {
    setResChart(arrCategory[0][0]);
  }, []);

  const handleChange = (evt) => {
    console.log(evt.target);
    const name = evt.target.name;
    const val = evt.target.value;

    switch (name) {
      case "00":
        setCtgry(val);
        break;
      case "01":
        setMonth(val);
        break;
      default:
        break;
    }
  };

  const submitFilter = () => {
    if (month === "" || ctgry === "") {
      SweetAlert.fire({
        icon: "error",
        title: "Please select a specific Category and Month value",
      });
      return;
    }

    setResChart(arrCategory[month][ctgry]);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Box p={4} />
        <Grid container justify="center">
          <Grid item xs={12} sm={4}>
            <Grid container justify="center">
              <Select
                className={classes.selectBox}
                native
                value={ctgry}
                onChange={handleChange}
                name="00"
              >
                <option aria-label="None" value="" />
                <option value={0}>Transmission Expenses</option>
                <option value={1}>Power Expenses</option>
                <option value={2}>Radio Frequency Usage</option>
              </Select>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Grid container justify="center">
              <Select
                className={classes.selectBox}
                native
                value={month}
                onChange={handleChange}
                name="01"
              >
                <option aria-label="None" value="" />
                <option value={0}>2020-11</option>
                <option value={1}>2020-12</option>
                <option value={2}>2021-01</option>
                <option value={3}>2021-02</option>
              </Select>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid container justify="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => submitFilter()}
              >
                Filter
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box marginTop={5} />
            <CanvasJsChart options={optionsGraph} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
