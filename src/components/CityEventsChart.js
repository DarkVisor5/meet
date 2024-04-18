import { useState, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);

  // Funzione per ottenere i dati che verranno visualizzati nel grafico
  const getData = () => {
    if (!allLocations) return []; // Make sure allLocations is not undefined
    return allLocations.map(location => {
      const count = events.filter(event => event.location === location).length;
      const city = location.split(/, | - /)[0]; // Assuming the location format is "City, Country"
      return { city, count };
    });
  };

  // useEffect per aggiornare i dati quando cambiano allLocations o events
  useEffect(() => {
    setData(getData());
  }, [allLocations, events]); // Dipendenze per il recupero dei dati

  // Controllo per il rendering condizionale
  if (!data.length) {
    return <div>Loading chart data...</div>;
  }

  return (
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 60,
          left: -30,
        }}
      >
        <CartesianGrid />
        <XAxis
          type="category" dataKey="city" name="City"
          angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }}
        />
        <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Events" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export default CityEventsChart;
