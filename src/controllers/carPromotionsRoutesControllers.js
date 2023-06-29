import sql from 'mssql';
import config from '../DataBase/config.js';

// Creating a connection pool
const pool = new sql.ConnectionPool(config.sql);

// Function to fetch promotions data
const fetchPromotionsData = async () => {
  let connection;
  try {
    connection = await pool.connect();

    // Query to fetch promotions data
    const result = await connection.request().query('SELECT * FROM promotions');

    // Return the promotions data
    return result.recordset;
  } catch (error) {
    console.error('Error occurred while fetching promotions:', error);
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
    const promotionsData = await fetchPromotionsData();
    const vehicleCategoryData = await fetchVehicleCategoryData();

    const promotionsByCategoryId = {};

    // Group promotions by category_id
    promotionsData.forEach((promotion) => {
      const categoryId = promotion.category_id;
      if (!promotionsByCategoryId[categoryId]) {
        promotionsByCategoryId[categoryId] = [];
      }
      promotionsByCategoryId[categoryId].push(promotion);
    });

    // Add promotions to vehicle category data
    const vehicleCategoryWithPromotions = vehicleCategoryData.map((category) => {
      const categoryId = category.category_id;
      if (promotionsByCategoryId[categoryId]) {
        return {
          ...category,
          promotions: promotionsByCategoryId[categoryId],
        };
      }
      return category;
    });

    return vehicleCategoryWithPromotions;
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
    res.status(500).json({ error: 'An error occurred while fetching promotions and vehicle category connected data' });
  }
};
