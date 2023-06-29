import { registerUser, loginUser } from "../controllers/authRoutesControllers.js";


const authRoutes = (app) => {
    app.route('/auth/register')
    .post(registerUser)
    app.route('/auth/login')
    .post(loginUser)
}


export default authRoutes;