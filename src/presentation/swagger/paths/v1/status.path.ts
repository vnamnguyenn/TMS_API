/**
 * @swagger
 * /status:
 *   get:
 *     summary: Retrieve a list of status
 *     description: Get requests with filter and pagination
 *     tags: [Status]
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
 *           enum: [createdDate, name]
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
 *                       $ref: '#/components/schemas/Status'
 *   post:
 *     summary: Create a new status
 *     tags: [Status]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 name:
 *                    type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   $ref: '#/components/schemas/ResponseStatus'
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *     deprecated: true
 * /status/{id}:
 *   put:
 *     summary: Update a status by ID
 *     description: Update a status by ID.
 *     tags: [Status]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the status to update.
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 name:
 *                    type: string
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   $ref: '#/components/schemas/ResponseStatus'
 *   get:
 *     summary: Get a status by ID
 *     description: Retrieve a status by ID.
 *     tags: [Status]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the request to retrieve.
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
 *                    $ref: '#/components/schemas/Status'
 */
