/**
 * @swagger
 * /request-reasons:
 *   get:
 *     summary: Retrieve a list of reason
 *     description: Get requests with filter and pagination
 *     tags: [RequestReasons]
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
 *                       $ref: '#/components/schemas/RequestReason'
 *   post:
 *     summary: Create a new reason
 *     tags: [RequestReasons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 requestTypeId:
 *                    type: string
 *                    example: ""
 *                    required: true
 *                 name:
 *                    type: string
 *                    example: ""
 *                    required: true
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
 * /request-reasons/{id}:
 *   get:
 *     summary: Get a reason by ID
 *     description: Retrieve a reason by ID.
 *     tags: [RequestReasons]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the reason to retrieve.
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
 *                    $ref: '#/components/schemas/RequestReason'
 *   put:
 *     summary: Update a reason by ID
 *     description: Update a reason by ID.
 *     tags: [RequestReasons]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - requestTypeId: id
 *         in: path
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
 *                    example: ""
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   $ref: '#/components/schemas/ResponseStatus'
 *   delete:
 *     summary: Delete a reason by ID
 *     description: Delete a reason by ID.
 *     tags: [RequestReasons]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the reason to delete.
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               status: object
 *               properties:
 *                 type:
 *                   $ref: '#/components/schemas/ResponseStatus'
 */
