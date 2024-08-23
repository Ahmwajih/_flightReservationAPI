const Reservation = require('../models/reservations');

module.exports = {
    List: async (req, res) => {
        const reservations = await Reservation.find();

        // create swagger tags
        /**
         * @swagger
         * /reservations:
         *   get:
         *     tags:
         *       - Reservations
         *     description: Returns all reservations
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: An array of reservations
         *         schema:
         *           $ref: '#/definitions/Reservation'
         *       500:
         *         description: Internal server error
         */
        res.status(200).send({
            error: false,
            data: reservations,
            details: await res.getModelListDetails(Reservation),
            message: 'Reservations retrieved successfully'
        });
    },

    Create: async (req, res) => {
        const reservation = await Reservation.create(req.body);

        // create swagger tags
        /**
         * @swagger
         * /reservations:
         *   post:
         *     tags:
         *       - Reservations
         *     description: Creates a new reservation
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: reservation
         *         description: Reservation object
         *         in: body
         *         required: true
         *         schema:
         *           $ref: '#/definitions/Reservation'
         *     responses:
         *       200:
         *         description: Successfully created
         *         schema:
         *           $ref: '#/definitions/Reservation'
         *       500:
         *         description: Internal server error
         */
        res.status(200).send({
            error: false,
            data: reservation,
            message: 'Reservation created successfully'
        });
    },

    Update: async (req, res) => {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id);

        // create swagger tags
        /**
         * @swagger
         * /reservations/{id}:
         *   put:
         *     tags:
         *       - Reservations
         *     description: Updates a single reservation
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: id
         *         in: path
         *         description: ID of reservation to update
         *         required: true
         *         type: string
         *       - name: reservation
         *         in: body
         *         description: Fields for the Reservation resource
         *         schema:
         *           $ref: '#/definitions/Reservation'
         *     responses:
         *       200:
         *         description: Successfully updated
         *         schema:
         *           $ref: '#/definitions/Reservation'
         *       500:
         *         description: Internal server error
         */
        res.status(200).send({
            error: false,
            data: reservation,
            message: 'Reservation updated successfully'
        });
    },

    Delete: async (req, res) => {
        await Reservation.findByIdAndDelete(req.params.id);

        // create swagger tags
        /**
         * @swagger
         * /reservations/{id}:
         *   delete:
         *     tags:
         *       - Reservations
         *     description: Deletes a single reservation
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: id
         *         in: path
         *         description: ID of reservation to delete
         *         required: true
         *         type: string
         *     responses:
         *       200:
         *         description: Successfully deleted
         *         schema:
         *           $ref: '#/definitions/Reservation'
         *       500:
         *         description: Internal server error
         */
        res.status(200).send({
            error: false,
            message: 'Reservation deleted successfully'
        });
    }
}