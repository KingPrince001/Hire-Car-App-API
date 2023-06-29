import sql from 'mssql';
import config from '../DataBase/config.js';

// Creating a connection pool
const pool = new sql.ConnectionPool(config.sql);

// POST request to create a new reservation
export const createReservation = async (req, res) => {
  let connection;
  try {
    const {
      start_date,
      end_date,
      car_id,
      customer_id,
    } = req.body;

    connection = await pool.connect();

    // Check if there exists a booking for the specified car within the start date and end date
    const checkBookingQuery = `
      SELECT COUNT(*) AS bookingCount
      FROM bookings
      WHERE car_id = @car_id AND start_date <= @end_date AND end_date >= @start_date
    `;
    const checkBookingResult = await connection.request()
      .input('car_id', sql.Int, car_id)
      .input('start_date', sql.Date, start_date)
      .input('end_date', sql.Date, end_date)
      .query(checkBookingQuery);

    const bookingCount = checkBookingResult.recordset[0].bookingCount;

    if (bookingCount > 0) {
      return res.status(400).json({ error: 'There is already a booking for the specified car within the specified date range' });
    }

    // Insert the reservation data into the database
    const insertReservationQuery = `
      INSERT INTO bookings (start_date, end_date, car_id, customer_id)
      VALUES (@start_date, @end_date, @car_id, @customer_id)
    `;
    await connection.request()
      .input('start_date', sql.Date, start_date)
      .input('end_date', sql.Date, end_date)
      .input('car_id', sql.Int, car_id)
      .input('customer_id', sql.Int, customer_id)
      .query(insertReservationQuery);

    // Return success response
    res.status(200).json({ message: 'Reservation created successfully' });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'An error occurred while creating the reservation' });
  } finally {
    // Releasing the connection back to the pool
    if (connection) {
      connection.close();
    }
  }
};


// Fetching booking management data
// try-catch block to handle errors
export const getBookingManagement = async (req, res) => {
  let connection;
  try {
    connection = await pool.connect();

    // Query to fetch data from the booking_management table
    const result = await connection.request().query('SELECT * FROM booking_management');

    // Process the result and send the response
    const bookingData = result.recordset;
    res.status(200).json({ bookingData });
  } catch (error) {
    // Logging the error details for debugging
    console.error('Error occurred while fetching booking management data:', error);

    // Error message to the client
    res.status(500).json({ error: 'An error occurred while fetching booking management data' });
  } finally {
    // Releasing the connection back to the pool
    if (connection) {
      connection.close();
    }
  }
};

// display bookings depending on of a specific customer

export const getBookings = async (req, res) => {
  try {
    const { customer_id } = req.params;

    const pool = await sql.connect(config.sql);
    const request = new sql.Request(pool);

    const query = 'SELECT * FROM bookings WHERE customer_id = @customer_id';
    request.input('customer_id', sql.Int, customer_id);

    const result = await request.query(query);

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching bookings.' });
    console.error('An error occurred while fetching bookings:', error);
  } finally {
    sql.close();
  }
};

//delete a booking

export const deleteBooking = async (req, res) => {
  try {
    const { booking_id } = req.params;

    const pool = await sql.connect(config.sql);
    const request = new sql.Request(pool);
    // Delete the review from the database
    await request.input('booking_id', sql.Int, booking_id).query('DELETE FROM bookings WHERE booking_id = @booking_id');

    res.status(200).json({ message: 'Booking deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the booking.' });
    console.error('An error occurred while deleting the booking:', error);
    console.log(error)
  } finally {
    sql.close();
  }
};

//updating a booking

export const updateBooking = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const { car_id, start_date, end_date } = req.body;

    // Create a connection pool
    const pool = await sql.connect(config.sql);

    // Check for an existing booking
    const checkQuery = `
      SELECT *
      FROM bookings
      WHERE car_id = @car_id
        AND ((start_date >= @start_date AND start_date <= @end_date)
          OR (end_date >= @start_date AND end_date <= @end_date))
    `;

    const checkRequest = new sql.Request(pool);
    checkRequest.input('car_id', sql.Int, car_id);
    checkRequest.input('start_date', sql.Date, start_date);
    checkRequest.input('end_date', sql.Date, end_date);

    const existingBookings = await checkRequest.query(checkQuery);
    if (existingBookings.recordset.length > 0) {
      // There is an existing booking during the specified time period
      return res.status(400).json({ message: 'There is already a booking for the specified car during the selected time period' });
    }

    // No existing booking found, proceed with updating the booking
    const updateQuery = `
      UPDATE bookings
      SET car_id = @car_id, start_date = @start_date, end_date = @end_date
      WHERE customer_id = @customer_id
    `;

    const updateRequest = new sql.Request(pool);
    updateRequest.input('customer_id', sql.Int, customer_id);
    updateRequest.input('car_id', sql.Int, car_id);
    updateRequest.input('start_date', sql.Date, start_date);
    updateRequest.input('end_date', sql.Date, end_date);

    // Execute the update query
    await updateRequest.query(updateQuery);

    res.status(200).json({ message: 'Booking content updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the booking content' });
    console.error('An error occurred while updating the booking content:', error);
  } finally {
    // Close the connection pool
    sql.close();
  }
};
