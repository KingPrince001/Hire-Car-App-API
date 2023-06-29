import sql from 'mssql';
import config from '../DataBase/config.js';

// Creating a connection pool
const pool = new sql.ConnectionPool(config.sql);

// Function to fetch insurance data
const fetchInsuranceData = async () => {
  let connection;
  try {
    connection = await pool.connect();

    // Query to fetch insurance data
    const result = await connection.request().query('SELECT * FROM insurance');

    // Return the insurance data
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
      const insuranceData = await fetchInsuranceData();
      const carsData = await fetchCarsData();
  
      const insuranceByCarId = {};
  
      // Group insurance by car_id
      insuranceData.forEach((insurance) => {
        const carId = insurance.car_id;
        if (!insuranceByCarId[carId]) {
          insuranceByCarId[carId] = [];
        }
        insuranceByCarId[carId].push(insurance);
      });
  
      // Add insurance to cars data
      const carsWithInsurance = carsData.map((car) => {
        const carId = car.car_id;
        if (insuranceByCarId[carId]) {
          return {
            ...car,
            insurance: insuranceByCarId[carId],
          };
        }
        return car;
      });
  
      return carsWithInsurance;
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
    res.status(500).json({ error: 'An error occurred while fetching insurance and car data' });
  }
};
