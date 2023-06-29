import sql from 'mssql';
import config from '../DataBase/config.js';

// Creating a connection pool
const pool = new sql.ConnectionPool(config.sql);

// Function to fetch additional charges data
const fetchAdditionalChargesData = async () => {
  let connection;
  try {
    connection = await pool.connect();

    // Query to fetch additional charges data
    const result = await connection.request().query('SELECT * FROM additional_charges');

    // Return the additional charges data
    return result.recordset;
  } catch (error) {
    console.error('Error occurred while fetching additional charges:', error);
    throw error;
  } finally {
    if (connection) {
      connection.close();
    }
  }
};

// Function to fetch vehicle category data
const fetchVehicleCategoryData = async () => {
  let connection;
  try {
    connection = await pool.connect();

    // Query to fetch vehicle category data
    const result = await connection.request().query('SELECT * FROM vehicle_category');

    // Return the vehicle category data
    return result.recordset;
  } catch (error) {
    console.error('Error occurred while fetching vehicle category:', error);
    throw error;
  } finally {
    if (connection) {
      connection.close();
    }
  }
};

// Function to fetch and connect the data
const fetchData = async () => {
  try {
    const additionalChargesData = await fetchAdditionalChargesData();
    const vehicleCategoryData = await fetchVehicleCategoryData();

    const chargesByCategoryId = {};

    // Group additional charges by category_id
    additionalChargesData.forEach((charge) => {
      const categoryId = charge.category_id;
      if (!chargesByCategoryId[categoryId]) {
        chargesByCategoryId[categoryId] = [];
      }
      chargesByCategoryId[categoryId].push(charge);
    });

    // Add additional charges to vehicle category data
    const vehicleCategoryWithCharges = vehicleCategoryData.map((category) => {
      const categoryId = category.category_id;
      if (chargesByCategoryId[categoryId]) {
        return {
          ...category,
          additionalCharges: chargesByCategoryId[categoryId],
        };
      }
      return category;
    });

    return vehicleCategoryWithCharges;
  } catch (error) {
    console.error('Error occurred while fetching and connecting data:', error);
    throw error;
  }
};

export const result = async (req, res) => {
  try {
    const data = await fetchData();

    res.json(data);
  } catch (error) {
    console.error('Error occurred while fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
};
