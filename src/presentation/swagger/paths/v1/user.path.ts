/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Get requests with filter and pagination
 *     tags: [Users]
 *     parameters:
 *       - name: pageSize
 *         in: query
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - name: pageNumber
 *         in: query
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - name: sortExpression
 *         in: query
 *         schema:
 *           type: string
 *           enum: [createdDate]
 *       - name: sortDirection
 *         in: query
 *         description: >
 *           Sort order:
 *            * `asc` - Ascending, from A to Z
 *
 *            * `desc` - Descending, from Z to A
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: object
 *                    properties:
 *                      code:
 *                         type: integer
 *                 totalRecords:
 *                    type: integer
 *                 currentPage:
 *                    type: integer
 *                 totalPages:
 *                    type: integer
 *                 data:
 *                    type: array
 *                    items:
 *                       $ref: '#/components/schemas/User'
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a user by ID.
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       example: 200
 *                 data:
 *                    $ref: '#/components/schemas/User'
 */
