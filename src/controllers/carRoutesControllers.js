import sql from 'mssql';
import config from '../DataBase/config.js';

// Creating a connection pool
const pool = new sql.ConnectionPool(config.sql);

export const allCars = async (req, res) => {
  let connection;
  try {
    connection = await pool.connect();
    
    const result = await connection.request().query('SELECT * FROM cars');

    // Extract the car data from the result
    const cars = result.recordset.map((record) => ({
      car_id: record.car_id,
      available: record.available,
      make: record.make,
      model: record.model,
      year: record.year,
      size: record.size,
      mileage: record.mileage,
      fuel_type: record.fuel_type,
      transmission_type: record.transmission_type,
      features: record.features,
      category_id: record.category_id,
    }));

    res.status(200).json(cars);
  } catch (error) {
    console.error('Error occurred while fetching all cars:', error);
    res.status(500).json({ error: 'An error occurred while fetching all cars' });
  } finally {
    if (connection) {
      connection.close();
    }
  }
};

export const availableCars = async (req, res) => {
  let connection;
  try {
    const { make, model } = req.query;

    // Acquire a new connection from the pool
    connection = await pool.connect();

    let query = `SELECT * FROM cars WHERE available = 1`;

    if (make && model) {
      // Search by both make and model
      query += ` AND (make LIKE '%${make}%' OR model LIKE '%${model}%')`;
    } else if (make) {
      // Search by make only
      query += ` AND make LIKE '%${make}%'`;
    } else if (model) {
      // Search by model only
      query += ` AND model LIKE '%${model}%'`;
    }

    try {
      // Executing the dynamically generated query
      const result = await connection.request().query(query);

      res.status(200).json({ result });
    } catch (error) {
      // Logging the error details for debugging
      console.error('Error occurred while fetching available cars:', error);

      // Error message to the client
      res
        .status(500)
        .json({ error: 'An error occurred while fetching available cars' });
    } finally {
      // Release the connection back to the pool
      if (connection) {
        connection.close();
      }
    }
  } catch (error) {
    console.error('Error occurred in availableCars:', error);
    res.status(500).json({ error: 'An error occurred in availableCars' });
  }
};

