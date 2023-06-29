import { result } from "../controllers/carReviewRoutesControllers.js"


const carReviewRoutes = (app) => {
    app.route ('/carReview')
    .get(result)
}


export default carReviewRoutes;