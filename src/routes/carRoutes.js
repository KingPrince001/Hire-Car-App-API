import { allCars} from '../controllers/carRoutesControllers.js';

const carRoutes = (app) => {
  // Car routes
  app.route('/cars')
  // all cars
    .get(allCars);
 
};

export default carRoutes;
