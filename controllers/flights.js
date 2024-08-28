const Flight = require('../models/flights');

module.exports = {

    List: async (req, res) => {
        const flights = await Flight.find();
        const data = await res.getModelList(User)
        // create swagger tags
        /**
         * @swagger
         * /flights:
         *   get:
         *     tags:
         *       - Flights
         *     description: Returns all flights
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: An array of flights
         *         schema:
         *           $ref: '#/definitions/Flight'
         *       500:
         *         description: Internal server error
         */
        res.status(200).send({
            error: false,
            data: flights,
            details: await res.getModelListDetails(Flight),
            message: 'Flights retrieved successfully'
        });
    },

    Create: async (req, res) => {
        const flight = await Flight.create(req.body);

        // create swagger tags
        /**
         * @swagger
         * /flights:
         *   post:
         *     tags:
         *       - Flights
         *     description: Creates a new flight
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: flight
         *         description: Flight object
         *         in: body
         *         required: true
         *         schema:
         *           $ref: '#/definitions/Flight'
         *     responses:
         *       200:
         *         description: Successfully created
         *         schema:
         *           $ref: '#/definitions/Flight'
         *       500:
         *         description: Internal server error
         */
        res.status(200).send({
            error: false,
            data: flight,
            message: 'Flight created successfully'
        });
    },

    Read: async (req, res) => {

        // create swagger tags
        /**
         * @swagger
         * /flights/{id}:
         *   get:
         *     tags:
         *       - Flights
         *     description: Returns a single flight
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: id
         *         description: Flight's id
         *         in: path
         *         required: true
         *         type: string
         *     responses:
         *       200:
         *         description: A single flight
         *         schema:
         *           $ref: '#/definitions/Flight'
         *       500:
         *         description: Internal server error
         */
        const flight = await Flight.findById(req.params.id);
        res.status(200).send({
            error: false,
            data: flight,
            message: 'Flight retrieved successfully'
        });
    },

    Update: async (req, res) => {
        const flight = await Flight.findByIdAndUpdate(req.params.id);

        // create swagger tags
        /**
         * @swagger
         * /flights/{id}:
         *   put:
         *     tags:
         *       - Flights
         *     description: Updates a single flight
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: id
         *         in: path
         *         description: ID of flight to update
         *         required: true
         *         type: string
         *       - name: flight
         *         in: body
         *         description: Flight object
         *         required: true
         *         schema:
         *           $ref: '#/definitions/Flight'
         *     responses:
         *       200:
         *         description: Successfully updated
         *         schema:
         *           $ref: '#/definitions/Flight'
         *       500:
         *         description: Internal server error
         */
        res.status(200).send({
            error: false,
            data: flight,
            message: 'Flight updated successfully'
        });
    },

    Delete: async (req, res) => {
        const flight = await Flight.findByIdAndDelete(req.params.id);

        // create swagger tags
        /**
         * @swagger
         * /flights/{id}:
         *   delete:
         *     tags:
         *       - Flights
         *     description: Deletes a single flight
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: id
         *         in: path
         *         description: ID of flight to delete
         *         required: true
         *         type: string
         *     responses:
         *       200:
         *         description: Successfully deleted
         *         schema:
         *           $ref: '#/definitions/Flight'
         *       500:
         *         description: Internal server error
         */
        res.status(200).send({
            error: false,
            data: flight,
            message: 'Flight deleted successfully'
        });
    }
}