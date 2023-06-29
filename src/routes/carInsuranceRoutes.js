import { result } from "../controllers/carInsuranceRoutesControllers.js"


const carInsuranceRoutes = (app) => {
    app.route ('/carInsurance')
    .get(result)
}


export default carInsuranceRoutes;