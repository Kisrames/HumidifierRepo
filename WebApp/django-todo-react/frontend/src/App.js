// App.js
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./App.css";
//import rawdata from './mocktable.json'
var data2 = [];

// fetch('/mocktable')
//     .then(function(resp) {
//         return resp.json();
//     })
//     .then(function(data) {
//         data2 = data;
//     })

data2 = require("./mocktable.json");
// var data1 = [
//   {
//     "time": "10:01",
//     "api": 1,
//     "moisture": 80.2,
//     "CO2": 986,
//     "temperature": 26.1
//   },
//   {
//     "time": "10:02",
//     "api": 5,
//     "moisture": 72.3,
//     "CO2": 934,
//     "temperature": 17.2
//   },
//   {
//     "time": "10:03",
//     "api": 4,
//     "moisture": 87.7,
//     "CO2": 976,
//     "temperature": 13.6
//   },
//   {
//     "time": "10:04",
//     "api": 5,
//     "moisture": 93.2,
//     "CO2": 892,
//     "temperature": 23.8
//   },
//   {
//     "time": "10:05",
//     "api": 2,
//     "moisture": 85.2,
//     "CO2": 996,
//     "temperature": 22.1
//   },
//   {
//     "time": "10:06",
//     "api": 3,
//     "moisture": 98.9,
//     "CO2": 892,
//     "temperature": 12.6
//   },
//   {
//     "time": "10:07",
//     "api": 3,
//     "moisture": 72.9,
//     "CO2": 974,
//     "temperature": 27.8
//   },
//   {
//     "time": "10:08",
//     "api": 1,
//     "moisture": 68.4,
//     "CO2": 955,
//     "temperature": 19.6
//   }
//  ]

function App() {
  return (
    <div className="grid">
      <header id="header1">Humidifier WebApp</header>
      <main>
        <div id="chart1">
          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart
              width={500}
              height={300}
              data={data2}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="api"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="moisture" stroke="#82ca9d" />
              <Line type="monotone" dataKey="CO2" stroke="#808080" />
              <Line type="monotone" dataKey="temperature" stroke="#FF0000" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
      <footer id="footer1">Project of Kish, Timmy, James</footer>
    </div>
  );
}

export default App;
