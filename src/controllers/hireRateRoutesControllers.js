import sql from 'mssql';
import config from '../DataBase/config.js';


// Creating a connection pool
const pool = new sql.ConnectionPool(config.sql);

// getting hire rates available
// try-catch block to handle errors
export const getHireRates = async (req, res) => {
  let connection;
  try {
    connection = await pool.connect();
    
    // Query to fetch hire rates for different cars or car categories
    const result = await connection.request().query('SELECT * FROM hire_rates');
    
    // Process the result and send the response
    const hireRates = result.recordset;
    res.status(200).json({ hireRates });
  } catch (error) {
    // Logging the error details for debugging
    console.error('Error occurred while fetching hire rates:', error);
    
    // Error message to the client
    res.status(500).json({ error: 'An error occurred while fetching hire rates' });
  } finally {
    // Releasing the connection back to the pool
    if (connection) {
      connection.close();
    }
  }
};


// get available promotions
export const getPromotions = async (req, res) => {
  let connection;
  try {
    connection = await pool.connect();
    
    // Query to fetch active promotions or discounts
    const result = await connection.request().query('SELECT * FROM promotions');
    
    // Process the result and send the response
    const promotions = result.recordset;
    res.status(200).json({ promotions });
  } catch (error) {
    // Logging the error details for debugging
    console.error('Error occurred while fetching promotions:', error);
    
    // Error message to the client
    res.status(500).json({ error: 'An error occurred while fetching promotions' });
  } finally {
    // Releasing the connection back to the pool
    if (connection) {
    connection.close();
    }
  }
};


// getting additional charges
export const getAdditionalCharges = async (req, res) => {
  let connection;
  try {
    connection = await pool.connect();
    
    // Query to fetch additional charges information
    const result = await connection.request().query('SELECT * FROM additional_charges');
    
    // Process the result and send the response
    const additionalCharges = result.recordset;
    res.status(200).json({ additionalCharges });
  } catch (error) {
    // Logging the error details for debugging
    console.error('Error occurred while fetching additional charges:', error);
    
    // Error message to the client
    res.status(500).json({ error: 'An error occurred while fetching additional charges' });
  } finally {
    // Releasing the connection back to the pool
    if (connection) {
     await connection.close();
    }
  }
};




// Retrieve the daily rate
export const getDailyRate = async (req, res) => {
  let connection;
  try {
    const { car_id, hire_rates_id } = req.params;

    connection = await pool.connect();

    // Execute the query
    const query = `
      SELECT daily_rate
      FROM hire_rates
      WHERE car_id = @car_id AND hire_rates_id = @hire_rates_id
    `;
    const result = await connection.request()
      .input('car_id', sql.Int, car_id)
      .input('hire_rates_id', sql.Int, hire_rates_id)
      .query(query);

    // Check if a record was found
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    // Retrieve the daily rate from the result
    const { daily_rate } = result.recordset[0];

    // Return the daily rate as the response
    res.json({ daily_rate });
  } catch (error) {
    console.error('Error retrieving daily rate:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the daily rate' });
    console.log(error)
  } finally {
    // Releasing the connection back to the pool
    if (connection) {
      connection.close();
    }
  }
};
