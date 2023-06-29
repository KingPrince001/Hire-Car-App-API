import { availableCars } from '../controllers/carRoutesControllers.js';

const searchCarsByRoutes = (app) => {
  // available cars by make or model
  app.route('/searchCars/')
  .get(availableCars);
};

export default searchCarsByRoutes;
