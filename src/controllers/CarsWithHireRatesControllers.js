import sql from 'mssql';
import config from '../DataBase/config.js';

// Creating a connection pool
const pool = new sql.ConnectionPool(config.sql);

// Function to fetch hire rates data
const fetchHireRatesData = async () => {
  let connection;
  try {
    connection = await pool.connect();

    // Query to fetch hire rates data
    const result = await connection.request().query('SELECT * FROM hire_rates');

    // Return the hire rates data
    return result.recordset;
  } catch (error) {
    console.error('Error occurred while fetching hire rates:', error);
    throw error;
  } finally {
    if (connection) {
      connection.close();
    }
  }
};

// Controller function to fetch cars
const fetchCarsData = async () => {
    let connection;
    try {
      connection = await pool.connect();
  
      // Query to fetch cars data
      const result = await connection.request().query('SELECT * FROM cars');
  
      // Return the cars data
      return result.recordset;
    } catch (error) {
      console.error('Error occurred while fetching cars:', error);
      throw error;
    } finally {
      if (connection) {
        connection.close();
      }
    }
  };
  

// Fetch and connect the data
const fetchData = async () => {
    try {
      const hireRatesData = await fetchHireRatesData();
      const carsData = await fetchCarsData();
  
      const hireRatesByCarId = {};
  
      // Group hire rates by car_id
      hireRatesData.forEach((hireRate) => {
        const carId = hireRate.car_id;
        if (!hireRatesByCarId[carId]) {
          hireRatesByCarId[carId] = [];
        }
        hireRatesByCarId[carId].push(hireRate);
      });
  
      // Add hire rates to cars data
      const carsWithHireRates = carsData.map((car) => {
        const carId = car.car_id;
        if (hireRatesByCarId[carId]) {
          return {
            ...car,
            hireRates: hireRatesByCarId[carId],
          };
        }
        return car;
      });
  
      return carsWithHireRates;
    } catch (error) {
      console.error('Error occurred while fetching and connecting data:', error);
      throw error;
    }
  };

  

export const result = async (req, res) => {
  try {
    const data = await fetchData(req, res);
    res.json(data);
  } catch (error) {
    console.error('Error occurred while fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
};
