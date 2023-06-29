import cors from "cors"
import  express from "express";
import bodyParser from 'body-parser';
import config  from "./src/DataBase/config.js";
import carRoutes from './src/routes/carRoutes.js';
import authRoutes from "./src/routes/authRoutes.js";
import hireRateRoutes from "./src/routes/hireRateRoutes.js";
import reservationRoutes from "./src/routes/reservationRoutes.js";
import carsWithHireRates from "./src/routes/carWithHireRatesRoutes.js";
import carInsuranceRoutes from "./src/routes/carInsuranceRoutes.js";
import carPromotionsRoutes from "./src/routes/carPromotionsRoutes.js";
import carAdditionalChargesRoutes from "./src/routes/carAdditionalChargesRoutes.js";
import carReviewRoutes from "./src/routes/carReviewRoutes.js";
import searchCarsByRoutes from "./src/routes/searchCarsByRoutes.js";






const app = express();
app.use(
    cors({
      origin: 'http://localhost:5173',
    })
  );

  //middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// my routes
carRoutes(app);
authRoutes(app);
hireRateRoutes(app);
reservationRoutes(app);
carsWithHireRates(app);
carInsuranceRoutes(app);
carPromotionsRoutes(app);
carAdditionalChargesRoutes(app)
carReviewRoutes(app);
searchCarsByRoutes(app);


  

//testing my server
app.get('/', (req, res) => {
    res.send(
        'Hello 😎 CarHireAPI 😮 Prince;'
    )
});

app.listen(config.port || 5000 , () => {
    console.log("Server is 😊 running");
});