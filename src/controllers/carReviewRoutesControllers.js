import sql from 'mssql';
import config from '../DataBase/config.js';

// Creating a connection pool
const pool = new sql.ConnectionPool(config.sql);

// Function to fetch ratings and reviews data
const fetchRatingsReviewsData = async () => {
  let connection;
  try {
    connection = await pool.connect();

    // Query to fetch ratings and reviews data
    const result = await connection.request().query('SELECT * FROM ratings_reviews');

    // Return the ratings and reviews data
    return result.recordset;
  } catch (error) {
    console.error('Error occurred while fetching ratings and reviews:', error);
    throw error;
  } finally {
    if (connection) {
      connection.close();
    }
  }
};

// Function to fetch car data
const fetchCarData = async () => {
  let connection;
  try {
    connection = await pool.connect();

    // Query to fetch car data
    const result = await connection.request().query('SELECT * FROM cars');

    // Return the car data
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

// Function to fetch and connect the data
const fetchData = async () => {
  let connection;
  try {
    connection = await pool.connect();

    const ratingsReviewsData = await fetchRatingsReviewsData();
    const carData = await fetchCarData();

    const reviewsByCarId = {};

    // Group ratings and reviews by car_id
    ratingsReviewsData.forEach((review) => {
      const carId = review.car_id;
      if (!reviewsByCarId[carId]) {
        reviewsByCarId[carId] = [];
      }
      reviewsByCarId[carId].push(review);
    });

    // Add ratings and reviews to car data
    const carsWithReviews = carData.map((car) => {
      const carId = car.car_id;
      if (reviewsByCarId[carId]) {
        return {
          ...car,
          ratingsReviews: reviewsByCarId[carId],
        };
      }
      return car;
    });

    return carsWithReviews;
  } catch (error) {
    console.error('Error occurred while fetching and connecting data:', error);
    throw error;
  } finally {
    if (connection) {
      connection.close();
    }
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
