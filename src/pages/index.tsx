import React from 'react';
import CovidData from '../components/CovidData';
import EstimatedSpendingChart from '../components/EstimatedSpendingChart';

const Home: React.FC = () => {
  return (
    <div>
      <CovidData />
      <EstimatedSpendingChart />
    </div>
  );
};

export default Home;
