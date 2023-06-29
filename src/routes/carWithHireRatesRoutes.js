import { result } from "../controllers/CarsWithHireRatesControllers.js";

const carsWithHireRates = (app) => {
    app.route ('/carsAndHireRates')
    .get(result)
}

export default carsWithHireRates;