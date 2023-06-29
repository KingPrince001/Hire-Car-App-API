import sql from "mssql";
import config from "../DataBase/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



//register user
export const registerUser = async (req, res) => {
  const { first_name, last_name, email, phone_number, home_address, gender, national_id, drivers_license_id, password } = req.body;
 const hashedPassword = bcrypt.hashSync(password, 10);
  console.log( hashedPassword);
  try {
    // Check if user already exists
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM customer WHERE email = @email");
    const user = result.recordset;
    if (user && user.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    } else {
      // If user does not exist, insert new user
      await pool
        .request()
        .input("first_name", sql.VarChar, first_name)
        .input("last_name", sql.VarChar, last_name)
        .input("email", sql.VarChar, email)
        .input("phone_number", sql.VarChar, phone_number)
        .input("home_address", sql.VarChar, home_address)
        .input("gender", sql.VarChar, gender)
        .input("national_id", sql.VarChar, national_id)
        .input("drivers_license_id", sql.VarChar, drivers_license_id)
        .input("password", sql.VarChar, hashedPassword)
        
        .query(
          "INSERT INTO customer (first_name, last_name, email, phone_number, home_address, gender, national_id, drivers_license_id, password) VALUES (@first_name, @last_name, @email, @phone_number, @home_address, @gender, @national_id, @drivers_license_id,  @password)"
        );
      res.status(200).json({ message: "User created successfully" });
    }
  } catch (error) {
    res.status(409).json(error.message);
    console.log(error)
  } finally {
    sql.close();
  }
};



//login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists with the provided email
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM customer WHERE email = @email");
    const user = result.recordset[0];
    console.log(user)
    if (!user) {
      return res.status(401).json({ error: "Register first" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = bcrypt.compareSync(password, user.password);
   
    console.log(isPasswordValid)
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });

    }


    // Generate a JSON Web Token (JWT) for authentication
    const token = jwt.sign({ email: user.email }, "your-secret-key");

    // Return the token as a response
    res.status(200).json({
      customerid: user.customer_id,
      firstname: user.first_name,
      lastname: user.last_name,
      homeaddress: user.home_address,
      phonenumber: user.phone_number,
      email: user.email,
      nationalid: user.national_id,
      driverslicenseid: user.drivers_license_id,
      gender: user.gender,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging in" });
  } finally {
    sql.close();
  }
};
