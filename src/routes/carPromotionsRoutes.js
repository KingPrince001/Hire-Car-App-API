import { result } from "../controllers/carPromotionsRoutesControllers.js";


const carPromotionsRoutes = (app) => {
    app.route('/carPromotions')
    .get(result);
}


export default carPromotionsRoutes;