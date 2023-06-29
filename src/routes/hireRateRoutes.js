import { getAdditionalCharges, getDailyRate, getHireRates, getPromotions } from "../controllers/hireRateRoutesControllers.js"; 


const hireRateRoutes = (app) => {
    // get hire rates
    app.route('/hireRates')
    .get(getHireRates)

    //get daily rates
    app.route('/dailyRates/:car_id/:hire_rates_id')
    .get(getDailyRate)

    // available promotions
    app.route('/promotions')
    .get(getPromotions)

    // additional charges that might appply
    app.route('/additionalCharges')
    .get(getAdditionalCharges);

}


export default hireRateRoutes;