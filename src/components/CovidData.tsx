import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CountryData {
  country: string;
  totalCases: number;
  totalDeaths: number;
}

const CovidData: React.FC = () => {
  const [data, setData] = useState<CountryData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make initial request
        const response = await axios.get('https://covid-19-data.p.rapidapi.com/country/code?format=json&code=it', {
          headers: {
            'x-rapidapi-key': '2f247ed036mshc1b1f8bd0921d5bp1d288ajsna855ec14b675',
            'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
          }
        });
        if (response.status === 202) {

          setLoading(false);
          setError('Data is being processed. Please try again later.');
        } else if (response.status === 200) {
          const fetchedData: CountryData[] = response.data.map((country: any) => ({
            country: country.country,
            totalCases: country.confirmed,
            totalDeaths: country.deaths
          }));
          setData(fetchedData);
          setLoading(false);
        } else {
          throw new Error(`API responded with status code ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching the data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Covid-19 Data</h1>
      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Total Cases</th>
              <th>Total Deaths</th>
            </tr>
          </thead>
          <tbody>
            {data.map((country, index) => (
              <tr key={index}>
                <td>{country.country}</td>
                <td>{country.totalCases}</td>
                <td>{country.totalDeaths}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CovidData;
