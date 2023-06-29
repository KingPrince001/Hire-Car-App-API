import { result } from "../controllers/carAdditionalChargesRoutesControllers.js";


const carAdditionalChargesRoutes = (app) => {
    app.route('/carAdditionalCharges')
    .get(result);
}


export default carAdditionalChargesRoutes;