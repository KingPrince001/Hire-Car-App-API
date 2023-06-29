--creating database (CarHireDB)  --😎 Prince 😜--
CREATE DATABASE CarHireDB;

--create table (vehicle_category)
CREATE TABLE vehicle_category (
  category_id INT IDENTITY(1,1) PRIMARY KEY,
  category_name VARCHAR(50),
  rate_range VARCHAR(50)
);

--Altering table(vehicle_category) so that it can accomondate the long data
ALTER TABLE vehicle_category
ALTER COLUMN rate_range VARCHAR(250);

--inserting 10 rows of data to table (vehicle_category)
INSERT INTO vehicle_category ( category_name, rate_range)
VALUES
  ( 'Economy', 'Daily: $35.99 - $49.99, Weekly: $189.99 - $279.99, Monthly: $649.99 - $899.99'),
  ( 'Compact', 'Daily: $39.99 - $54.99, Weekly: $209.99 - $309.99, Monthly: $699.99 - $999.99'),
  ( 'Midsize', 'Daily: $45.99 - $59.99, Weekly: $249.99 - $349.99, Monthly: $799.99 - $1099.99'),
  ( 'Full-size', 'Daily: $49.99 - $64.99, Weekly: $279.99 - $389.99, Monthly: $899.99 - $1299.99'),
  ( 'SUV', 'Daily: $55.99 - $74.99, Weekly: $329.99 - $459.99, Monthly: $1099.99 - $1599.99');


  INSERT INTO vehicle_category ( category_name, rate_range)
VALUES
  ( 'Luxury', 'Daily: $89.99 - $149.99, Weekly: $499.99 - $799.99, Monthly: $1799.99 - $2499.99'),
  ( 'Sports', 'Daily: $79.99 - $119.99, Weekly: $449.99 - $699.99, Monthly: $1599.99 - $2299.99'),
  ( 'Van', 'Daily: $59.99 - $89.99, Weekly: $349.99 - $499.99, Monthly: $1299.99 - $1899.99'),
  ( 'Truck', 'Daily: $69.99 - $99.99, Weekly: $399.99 - $599.99, Monthly: $1499.99 - $2199.99'),
  ( 'Sedan', 'Daily: $49.99 - $79.99, Weekly: $279.99 - $449.99, Monthly: $999.99 - $1499.99');

  --select all columns from table (vehicle_category)
  SELECT * FROM vehicle_category;

--create table (cars)
  CREATE TABLE cars (
    car_id INT IDENTITY(1,1) PRIMARY KEY,
    available BIT,
    make VARCHAR(255),
    model VARCHAR(255),
    year INT,
    size VARCHAR(50),
    mileage DECIMAL(10, 2),
    fuel_type VARCHAR(50),
    transmission_type VARCHAR(50),
    features VARCHAR(MAX),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES vehicle_category(category_id)
);

--inserting 10 rows of data to table (cars)
INSERT INTO cars (available, make, model, year, size, mileage, fuel_type, transmission_type, features, category_id)
VALUES 
    (1, 'Toyota', 'Camry', 2020, 'Medium', 5000.50, 'Petrol', 'Automatic', 'AC, Power Windows', 7),
    (1, 'Honda', 'Accord', 2019, 'Medium', 7000.25, 'Petrol', 'Automatic', 'Bluetooth, Backup Camera',8 ),
    (0, 'Ford', 'Mustang', 2022, 'Sport', 2500.75, 'Petrol', 'Manual', 'Leather Seats, Premium Sound System', 2),
    (1, 'Chevrolet', 'Cruze', 2018, 'Compact', 6000.80, 'Diesel', 'Automatic', 'GPS Navigation, Sunroof', 2),
    (1, 'BMW', 'X5', 2021, 'SUV', 3000.90, 'Petrol', 'Automatic', 'Keyless Entry, Adaptive Cruise Control', 3),
    (0, 'Mercedes-Benz', 'C-Class', 2020, 'Medium', 4000.35, 'Diesel', 'Automatic', 'Heated Seats, Lane Keep Assist', 3),
    (1, 'Audi', 'A4', 2019, 'Medium', 8000.20, 'Petrol', 'Automatic', 'Apple CarPlay, Android Auto', 4),
    (1, 'Volkswagen', 'Golf', 2017, 'Compact', 9000.15, 'Petrol', 'Manual', 'Parking Sensors, Alloy Wheels', 4),
    (0, 'Hyundai', 'Tucson', 2022, 'SUV', 3500.60, 'Petrol', 'Automatic', 'Blind Spot Detection, Rear Cross-Traffic Alert', 5),
    (1, 'Kia', 'Sportage', 2018, 'SUV', 5500.70, 'Diesel', 'Automatic', 'Dual-zone Climate Control, Power Tailgate', 5);

	 --select all columns from table (cars)
  SELECT * FROM cars;

  -- create table (promotions) 
CREATE TABLE promotions (
  promotion_id INT IDENTITY(1,1) PRIMARY KEY,
  category_id INT,
  promotion_description VARCHAR(255),
  discount_percent DECIMAL(5, 2),
  FOREIGN KEY (category_id) REFERENCES Vehicle_Category(category_id)
);

-- inserting 10 rows of data to table (promotions)
INSERT INTO promotions (category_id, promotion_description, discount_percent)
VALUES
  (7, '10% off Economy cars', 10.00),
  (2, '15% off Compact cars', 15.00),
  (3, '20% off Midsize cars', 20.00),
  (11, '25% off Full-size cars', 25.00),
  (5, '30% off SUVs', 30.00),
  (6, 'Free upgrade to Compact', 0.00),
  (4, 'Special weekend rate for Full-size cars', 0.00),
  (10, 'Family discount on Midsize cars', 15.00),
  (9, 'Summer promotion: 20% off SUVs', 20.00),
  (8, 'Last-minute deal: Economy cars at 25% off', 25.00);

 	 --select all columns from table (promotions)
  SELECT * FROM promotions;

  --create table (additional_charges)
  CREATE TABLE additional_charges (
  charge_id INT IDENTITY(1,1) PRIMARY KEY,
  category_id INT,
  charge_type VARCHAR(50),
  charge_amount DECIMAL(10, 2),
  FOREIGN KEY (category_id) REFERENCES Vehicle_Category(category_id)
);

-- inserting 10 rows of data to table (additional_charges)
INSERT INTO additional_charges (category_id, charge_type, charge_amount)
VALUES
  (1, 'Mileage Charge', 0.25),
  (2, 'Insurance Fee', 15.00),
  (3, 'Fuel Surcharge', 10.00),
  (4, 'Late Return Penalty', 25.00),
  (5, 'Cleaning Fee', 20.00),
  (6, 'Additional Driver Fee', 10.00),
  (7, 'GPS Rental', 8.00),
  (8, 'Roadside Assistance', 5.00),
  (9, 'Child Safety Seat Rental', 12.00),
  (10, 'Toll Pass Service', 5.00);

   --select all columns from table (additional_charges)
  SELECT * FROM additional_charges;

   --create table (hire_rates)
CREATE TABLE hire_rates (
  hire_rates_id INT IDENTITY(1,1) PRIMARY KEY,
  daily_rate DECIMAL(10, 2),
  weekly_rate DECIMAL(10, 2),
  monthly_rate DECIMAL(10, 2),
  location VARCHAR(100),
  car_id INT,
  category_id INT,
  promotion_id INT,
  charge_id INT,
  FOREIGN KEY (car_id) REFERENCES cars(car_id),
  FOREIGN KEY (category_id) REFERENCES vehicle_category(category_id),
  FOREIGN KEY (promotion_id) REFERENCES promotions(promotion_id),
  FOREIGN KEY (charge_id) REFERENCES additional_charges(charge_id)
);

-- inserting 10 rows of data to table (hire_rates)
INSERT INTO hire_rates (daily_rate, weekly_rate, monthly_rate, location, car_id, category_id, promotion_id, charge_id)
VALUES
  (45.99, 269.99, 999.99, 'Nairobi', 11, 3, 1, 2),
  (39.99, 229.99, 849.99, 'Mombasa', 12, 2, 3, 1),
  (55.99, 329.99, 1199.99, 'Kisumu', 3, 5, 2, 3),
  (49.99, 289.99, 1059.99, 'Nakuru', 4, 4, 4, 4),
  (59.99, 349.99, 1299.99, 'Eldoret', 5, 5, 7, 3),
  (42.99, 249.99, 899.99, 'Machakos', 6, 2, 8, 7),
  (47.99, 279.99, 1019.99, 'Nyeri', 7, 4, 9, 5),
  (51.99, 309.99, 1129.99, 'Kisii', 8, 3, 4, 9),
  (44.99, 259.99, 949.99, 'Nanyuki', 9, 2, 1, 6),
  (48.99, 289.99, 1059.99, 'Machakos', 10, 5, 2, 10);

  --select all columns from table (hire_rates)
  SELECT * FROM hire_rates;

   --create table (customer)
   CREATE TABLE customer (
    customer_id INT IDENTITY(1,1) PRIMARY KEY,
    first_name VARCHAR(25),
    last_name VARCHAR(25),
    email VARCHAR(50),
    password VARCHAR(150),
    phone_number VARCHAR(20),
    home_address VARCHAR(100),
    gender VARCHAR(10),
    national_id VARCHAR(20),
    drivers_license_id INT
);

-- inserting 10 rows of data to table (customers)
INSERT INTO customer (first_name, last_name, email, phone_number, home_address, gender, national_id, drivers_license_id)
VALUES
  ('John', 'Mwangi', 'johnmwangi@example.com', '0712345678', '123 Main St, Nairobi', 'Male', '12345678', 1234567),
  ('Jane', 'Wanjiku', 'janewanjiku@example.com', '0723456789', '456 Elm St, Mombasa', 'Female', '09876543', 2345678),
  ('Michael', 'Kamau', 'michaelkamau@example.com', '0734567890', '789 Oak St, Nakuru', 'Male', '55555555', 3456789),
  ('Emily', 'Auma', 'emilyauma@example.com', '0745678901', '321 Maple St, Kisumu', 'Female', '11111111', 4567890),
  ('David', 'Odhiambo', 'davidodhiambo@example.com', '0756789012', '555 Pine St, Eldoret', 'Male', '99999999', 5678901),
  ('Sarah', 'Njeri', 'sarahnjeri@example.com', '0767890123', '777 Cedar St, Thika', 'Female', '22222222', 6789012),
  ('Robert', 'Muthoni', 'robertmuthoni@example.com', '0778901234', '999 Spruce St, Naivasha', 'Male', '88888888', 7890123),
  ('Jennifer', 'Kariuki', 'jenniferkariuki@example.com', '0789012345', '444 Birch St, Machakos', 'Female', '33333333', 8901234),
  ('Christopher', 'Nyambura', 'christophernyambura@example.com', '0790123456', '222 Oak St, Kisii', 'Male', '77777777', 9012345),
  ('Jessica', 'Wairimu', 'jessicawairimu@example.com', '0711122334', '666 Walnut St, Nyeri', 'Female', '44444444', 1234567);

   
     --select all columns from table (customer)
  SELECT * FROM customer;

   --create table (hired_cars)
   CREATE TABLE hired_cars (
  hired_id INT IDENTITY(1,1) PRIMARY KEY,
  start_date DATE,
  end_date DATE,
  total_hire_amount DECIMAL(10, 2),
  car_id INT,
  customer_id INT,
  hire_rates_id INT,
  FOREIGN KEY (car_id) REFERENCES cars(car_id),
  FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
  FOREIGN KEY (hire_rates_id) REFERENCES hire_rates(hire_rates_id)
);


   -- inserting 10 rows of data to table (hired_cars)
 INSERT INTO hired_cars (start_date, end_date, total_hire_amount, car_id, customer_id, hire_rates_id)
VALUES
  ('2023-06-01', '2023-06-05', 499.99, 11, 12, 1),
  ('2023-06-02', '2023-06-08', 789.99, 12, 13, 2),
  ('2023-06-03', '2023-06-07', 599.99, 3, 20, 3),
  ('2023-06-04', '2023-06-06', 349.99, 4, 14, 4),
  ('2023-06-05', '2023-06-09', 899.99, 5, 15, 5),
  ('2023-06-06', '2023-06-10', 659.99, 6, 16, 1),
  ('2023-06-07', '2023-06-12', 949.99, 7, 17, 2),
  ('2023-06-08', '2023-06-14', 1099.99, 8,18, 3),
  ('2023-06-09', '2023-06-13', 849.99, 9, 19, 4),
  ('2023-06-10', '2023-06-16', 1199.99, 10, 21, 5);


     --select all columns from table (hired_cars)
  SELECT * FROM hired_cars;

  --create table (damage_report)
  CREATE TABLE damage_report (
    damage_report_id INT IDENTITY(1,1) PRIMARY KEY,
    car_id INT,
    report_date DATE,
    report_description VARCHAR(255),
    cost_estimate DECIMAL(10, 2),
    FOREIGN KEY (car_id) REFERENCES cars(car_id)
);

 -- inserting 10 rows of data to table (damage_report)
INSERT INTO damage_report (car_id, report_date, report_description, cost_estimate)
VALUES
  (11, '2023-05-01', 'Scratch on the rear bumper', 500.00),
  (12, '2023-05-02', 'Dent on the driver''s side door', 800.00),
  (3, '2023-05-03', 'Cracked windshield', 1000.00),
  (4, '2023-05-04', 'Key scratches on the hood', 400.00),
  (5, '2023-05-05', 'Broken side mirror', 600.00),
  (6, '2023-05-06', 'Paint chipping on the roof', 300.00),
  (7, '2023-05-07', 'Bumper damage from collision', 1500.00),
  (8, '2023-05-08', 'Broken taillight', 200.00),
  (9, '2023-05-09', 'Dent on the front fender', 700.00),
  (10, '2023-05-10', 'Scratches on the driver''s side door', 450.00);


   --select all columns from table (damage_report)
  SELECT * FROM damage_report;

  --create table (hired_cars_payment)
CREATE TABLE hired_cars_payment (
    payment_id INT IDENTITY(1,1) PRIMARY KEY,
    hired_id INT,
    damage_report_id INT,
    customer_id INT,
    payment_amount DECIMAL(10, 2),
    payment_date DATE,
    payment_means VARCHAR(50),
    FOREIGN KEY (hired_id) REFERENCES hired_cars(hired_id),
    FOREIGN KEY (damage_report_id) REFERENCES damage_report(damage_report_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);


 -- inserting 10 rows of data to table (hired_cars_payment)
 INSERT INTO hired_cars_payment (hired_id, damage_report_id, customer_id, payment_amount, payment_date, payment_means)
VALUES
  (1, 1, 21, 100.00, '2023-06-01', 'M-Pesa'),
  (2, 2, 12, 150.00, '2023-06-02', 'Bank Transfer (KCB)'),
  (3, 3, 13, 200.00, '2023-06-03', 'Cash'),
  (4, 4, 14, 120.00, '2023-06-04', 'Bank Transfer (Equity)'),
  (5, 5, 15, 180.00, '2023-06-05', 'M-Pesa'),
  (6, 6, 16, 90.00, '2023-06-06', 'Cash'),
  (7, 7, 17, 140.00, '2023-06-07', 'Bank Transfer (Co-op Bank)'),
  (8, 8, 18, 160.00, '2023-06-08', 'M-Pesa'),
  (9, 9, 19, 110.00, '2023-06-09', 'Cash'),
  (10, 10, 20, 130.00, '2023-06-10', 'Bank Transfer (Absa)');



  --select all columns from table (hired_cars_payment)
  SELECT * FROM hired_cars_payment;


  --create table (booking_management)
  CREATE TABLE booking_management (
    booking_id INT IDENTITY(1,1) PRIMARY KEY,
    customer_id INT,
    car_id INT,
    hire_rates_id INT,
    start_date DATE,
    end_date DATE,
    number_of_days INT,
    total_cost DECIMAL(10, 2),
    booking_status VARCHAR(255),
    booking_actions VARCHAR(255),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (car_id) REFERENCES cars(car_id),
    FOREIGN KEY (hire_rates_id) REFERENCES hire_rates(hire_rates_id)
);

ALTER TABLE booking_management
DROP COLUMN booking_actions;


  -- inserting 10 rows of data to table (booking_management)
  INSERT INTO booking_management (customer_id, car_id, hire_rates_id, start_date, end_date, number_of_days, total_cost, booking_status)
VALUES
  (21, 3, 1, '2023-06-01', '2023-06-05', 5, 499.99, 'Approved'),
  (12, 7, 3, '2023-06-02', '2023-06-09', 7, 699.99, 'Pending'),
  (13, 5, 2, '2023-06-03', '2023-06-10', 7, 749.99, 'Canceled'),
  (14, 4, 4, '2023-06-05', '2023-06-08', 3, 299.99, 'Approved'),
  (15, 5, 1, '2023-06-07', '2023-06-11', 4, 399.99, 'Pending'),
  (16, 8, 2, '2023-06-10', '2023-06-16', 6, 599.99, 'Canceled'),
  (17, 4, 3, '2023-06-12', '2023-06-19', 7, 699.99, 'Approved'),
  (18, 3, 4, '2023-06-15', '2023-06-22', 7, 749.99, 'Pending'),
  (19, 9, 1, '2023-06-18', '2023-06-25', 7, 749.99, 'Canceled'),
  (20, 4, 2, '2023-06-20', '2023-06-26', 6, 599.99, 'Approved');


  --select all columns from table (booking_management)
  SELECT * FROM booking_management;


  --creatig table (ratings and reviews)
  CREATE TABLE ratings_reviews (
    review_id INT IDENTITY(1,1) PRIMARY KEY,
    car_id INT,
    customer_id INT,
    rating INT,
    review VARCHAR(255),
    date DATE,
    FOREIGN KEY (car_id) REFERENCES cars(car_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);
 
 -- inserting 10 rows of data to table (ratings and reviews)

INSERT INTO ratings_reviews (car_id, customer_id, rating, review, date)
VALUES
  (8, 21, 4, 'Great car! Smooth ride.', '2023-06-01'),
  (10, 12, 5, 'Excellent service and car condition.', '2023-06-02'),
  (3, 13, 3, 'Average experience. Could be better.', '2023-06-03'),
  (4, 14, 5, 'Highly recommended. Will rent again!', '2023-06-05'),
  (5, 15, 4, 'Good value for money.', '2023-06-07'),
  (7, 16, 2, 'Disappointing. Car had issues.', '2023-06-10'),
  (4, 17, 4, 'Very satisfied with the rental.', '2023-06-12'),
  (3, 18, 5, 'Outstanding service and vehicle.', '2023-06-15'),
  (12, 19, 3, 'Average experience. Could improve.', '2023-06-18'),
  (4, 20, 5, 'Excellent car and customer support.', '2023-06-20');

  --select all columns from table (ratings and reviews)
  SELECT * FROM ratings_reviews;

  --creatig table (insurance)

  CREATE TABLE insurance (
    insurance_id INT IDENTITY(1,1) PRIMARY KEY,
    insurance_company_name VARCHAR(255),
    coverage_type VARCHAR(255),
    premium_amount DECIMAL(10, 2),
    car_id INT,
    FOREIGN KEY (car_id) REFERENCES cars(car_id)
);
-- inserting 10 rows of data to table (insurance)

INSERT INTO insurance (insurance_company_name, coverage_type, premium_amount, car_id)
VALUES
  ('ABC Insurance', 'Comprehensive', 5000.00, 12),
  ('XYZ Insurance', 'Third Party', 3000.00, 11),
  ('PQR Insurance', 'Comprehensive', 5500.00, 3),
  ('LMN Insurance', 'Third Party', 3500.00, 4),
  ('DEF Insurance', 'Comprehensive', 5200.00, 5),
  ('UVW Insurance', 'Third Party', 2800.00, 6),
  ('GHI Insurance', 'Comprehensive', 4800.00, 7),
  ('JKL Insurance', 'Third Party', 3200.00, 8),
  ('MNO Insurance', 'Comprehensive', 5300.00, 9),
  ('RST Insurance', 'Third Party', 3300.00, 10);

  --select all columns from table (insurance)
  SELECT * FROM insurance;

  --creatig table (maintenance)

  CREATE TABLE maintenance (
    maintenance_id INT IDENTITY(1,1) PRIMARY KEY,
    car_id INT,
    maintenance_date DATE,
    maintenance_description VARCHAR(255),
    maintenance_cost DECIMAL(10, 2),
    FOREIGN KEY (car_id) REFERENCES cars(car_id)
);

-- inserting 10 rows of data to table (maintenance)

INSERT INTO maintenance (car_id, maintenance_date, maintenance_description, maintenance_cost)
VALUES
  (7, '2023-06-01', 'Oil Change', 50.00),
  (8, '2023-06-02', 'Tire Rotation', 30.00),
  (3, '2023-06-03', 'Brake Pad Replacement', 100.00),
  (4, '2023-06-04', 'Spark Plug Replacement', 40.00),
  (5, '2023-06-05', 'Battery Replacement', 80.00),
  (9, '2023-06-06', 'Air Filter Replacement', 20.00),
  (3, '2023-06-07', 'Wheel Alignment', 70.00),
  (10, '2023-06-08', 'Coolant Flush', 60.00),
  (4, '2023-06-09', 'Transmission Fluid Change', 90.00),
  (5, '2023-06-10', 'Headlight Bulb Replacement', 10.00);


 --select all columns from table (maintenance)
  SELECT * FROM maintenance;


   --creatig table (profit/loss)

   CREATE TABLE profit_loss (
    record_id INT IDENTITY(1,1) PRIMARY KEY,
    car_id INT,
    maintenance_id INT,
    date DATE,
    description VARCHAR(255),
    amount DECIMAL(10, 2),
    FOREIGN KEY (car_id) REFERENCES cars(car_id),
    FOREIGN KEY (maintenance_id) REFERENCES maintenance(maintenance_id)
);
-- inserting 10 rows of data to table (maintenance)

INSERT INTO profit_loss (car_id, maintenance_id, date, description, amount)
VALUES
  (11, 11, '2023-01-01', 'Positive feedback - increased revenue', 500.00),
  (12, 12, '2023-02-05', 'Loss due to unexpected expenses', -200.00),
  (3, 13, '2023-03-10', 'Positive feedback - cost-saving measures', 350.00),
  (4,14, '2023-04-15', 'Loss due to equipment malfunction', -300.00),
  (5, 15, '2023-05-20', 'Positive feedback - high customer satisfaction', 600.00),
  (6, 16, '2023-06-25', 'Loss due to accident repair', -400.00),
  (7, 17, '2023-07-30', 'Positive feedback - efficient maintenance', 450.00),
  (8, 18, '2023-08-05', 'Loss due to inventory loss', -150.00),
  (9, 9, '2023-09-10', 'Positive feedback - successful upgrades', 550.00),
  (10, 10, '2023-10-15', 'Loss due to delayed repairs', -250.00);


  --select all columns from table (maintenance)

  SELECT * FROM profit_loss;


                  --END-- 😎 Prince ✌--