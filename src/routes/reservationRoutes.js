import { createReservation, deleteBooking, getBookingManagement, getBookings, updateBooking } from "../controllers/reservationRoutesControllers.js";


const reservationRoutes = (app) => {
    app.route('/reserve')
    .post(createReservation);

    app.route('/bookingManagement')
    .get(getBookingManagement)

    app.route('/bookings/:customer_id')
    .get(getBookings)

    app.route('/bookings/delete/:booking_id')
    .delete(deleteBooking);

    app.route('/bookings/update/:booking_id')
    .put(updateBooking);

}



export default reservationRoutes;