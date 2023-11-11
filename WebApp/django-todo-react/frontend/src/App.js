// App.js
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Graph from './Graph';
import './App.css';

const App = () => {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    // Fetch the JSON data
    fetch('./mockable.json') // Update the path to the actual location of your JSON file
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);

  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <Graph data={jsonData.map(entry => ({ time: entry.time, value: entry.moisture }))} title="Moisture" />
        <Graph data={jsonData.map(entry => ({ time: entry.time, value: entry.CO2 }))} title="CO2 Level" />
        <Graph data={jsonData.map(entry => ({ time: entry.time, value: entry.temperature }))} title="Temperature" />
        {/* Add one more graph for another metric if needed */}
      </div>
    </div>
  );
};

export default App;
