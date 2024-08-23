const User = require('../models/users');

module.exports = {
    List: async (req, res) => {
        const users = await User.find();

        // create swagger tags
        /**
         * @swagger
         * /users:
         *   get:
         *     tags:
         *       - Users
         *     description: Returns all users
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: An array of users
         *         schema:
         *           $ref: '#/definitions/User'
         *       500:
         *         description: Internal server error
         */
        res.status(200).send({
            error: false,
            data: users,
            details: await res.getModelListDetails(User),
            message: 'Users retrieved successfully'
        });
    },

    Create: async (req, res) => {
        const user = await User.create(req.body);

        // create swagger tags
        /**
         * @swagger
         * /users:
         *   post:
         *     tags:
         *       - Users
         *     description: Creates a new user
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: user
         *         description: User object
         *         in: body
         *         required: true
         *         schema:
         *           $ref: '#/definitions/User'
         *     responses:
         *       200:
         *         description: Successfully created
         *         schema:
         *           $ref: '#/definitions/User'
         *       500:
         *         description: Internal server error
         */
        res.status(200).send({
            error: false,
            data: user,
            details: await res.getModelListDetails(User),
            message: 'User created successfully'
        });
    },

    Read: async (req, res) => {
        const user = await User.findById(req.params.id);

        // create swagger tags
        /**
         * @swagger
         * /users/{id}:
         *   get:
         *     tags:
         *       - Users
         *     description: Returns a single user
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: id
         *         in: path
         *         description: ID of user to return
         *         required: true
         *         type: string
         *     responses:
         *       200:
         *         description: A single user
         *         schema:
         *           $ref: '#/definitions/User'
         *       500:
         *         description: Internal server error
         */
        res.status(200).send({
            error: false,
            data: user,
            details: await res.getModelListDetails(User),
            message: 'User retrieved successfully'
        });
    },

    Update: async (req, res) => {
        await User.findByIdAndUpdate(req.params.id, req.body);
        const user = await User.findById(req.params.id);

        // create swagger tags
        /**
         * @swagger
         * /users/{id}:
         *   put:
         *     tags:
         *       - Users
         *     description: Updates a single user
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: id
         *         in: path
         *         description: ID of user to update
         *         required: true
         *         type: string
         *       - name: user
         *         description: User object
         *         in: body
         *         required: true
         *         schema:
         *           $ref: '#/definitions/User'
         *     responses:
         *       200:
         *         description: Successfully updated
         *         schema:
         *           $ref: '#/definitions/User'
         *       500:
         *         description: Internal server error
         */
        res.status(200).send({
            error: false,
            data: user,
            details: await res.getModelListDetails(User),
            message: 'User updated successfully'
        });
    },

    Delete: async (req, res) => {
        await User.findByIdAndDelete(req.params.id);

        // create swagger tags
        /**
         * @swagger
         * /users/{id}:
         *   delete:
         *     tags:
         *       - Users
         *     description: Deletes a single user
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: id
         *         in: path
         *         description: ID of user to delete
         *         required: true
         *         type: string
         *     responses:
         *       200:
         *         description: Successfully deleted
         *       500:
         *         description: Internal server error
         */
        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User),
            message: 'User deleted successfully'
        });
    }
};