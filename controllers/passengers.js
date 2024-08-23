const Passenger = require("../models/passengers");

module.exports = {

    List: async (req, res) => {
        const passengers = await Passenger.find();

        // create swagger tags
        /**
         * @swagger
         * /passengers:
         *   get:
         *     tags:
         *       - Passengers
         *     description: Returns all passengers
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: An array of passengers
         *         schema:
         *           $ref: '#/definitions/Passenger'
         *       500:
         *         description: Internal server error
         */
        res.status(200).send({
            error: false,
            data: passengers,
            details: await res.getModelListDetails(Passenger),
            message: 'Passengers retrieved successfully'
        });
    },

    Create: async (req, res) => {
        const passenger = await Passenger.create(req.body);

        // create swagger tags
        /**
         * @swagger
         * /passengers:
         *   post:
         *     tags:
         *       - Passengers
         *     description: Creates a new passenger
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: passenger
         *         description: Passenger object
         *         in: body
         *         required: true
         *         schema:
         *           $ref: '#/definitions/Passenger'
         *     responses:
         *       200:
         *         description: Successfully created
         *         schema:
         *           $ref: '#/definitions/Passenger'
         *       500:
         *         description: Internal server error
         */
        res.status(200).send({
            error: false,
            data: passenger,
            message: 'Passenger created successfully'
        });
    },

    Read: async (req, res) => {
        const passenger = await Passenger.findById(req.params.id);

        // create swagger tags
        /**
         * @swagger
         * /passengers/{id}:
         *   get:
         *     tags:
         *       - Passengers
         *     description: Returns a single passenger
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: id
         *         description: Passenger's id
         *         in: path
         *         required: true
         *         type: string
         *     responses:
         *       200:
         *         description: A single passenger
         *         schema:
         *           $ref: '#/definitions/Passenger'
         *       500:
         *         description: Internal server error
         */
        res.status(200).send({
            error: false,
            data: passenger,
            message: 'Passenger retrieved successfully'
        });
    },

    Update: async (req, res) => {

        const passenger = await Passenger.findByIdAndUpdate(req.params.id, req.body);

        // create swagger tags

        /**
         * @swagger
         * /passengers/{id}:
         *  put:
         *   tags:
         *    - Passengers
         *  description: Updates a single passenger
         * produces:
         * - application/json
         * parameters:
         *  - name: id
         *   in: path
         *  description: ID of passenger to update
         * required: true
         * type: string
         * - name: passenger
         *  
         * in: body
         * description: Passenger object
         * required: true
         * schema:
         * $ref: '#/definitions/Passenger'
         * responses:
         * 200:
         * description: Successfully updated
         * schema:
         * $ref: '#/definitions/Passenger'
         * 500:
         * description: Internal server error
         */ 
        res.status(200).send({
            error: false,
            data: passenger,
            message: 'Passenger updated successfully'
        });

    }