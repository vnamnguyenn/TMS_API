/**
 * @swagger
 * /partial-days:
 *   get:
 *     summary: Retrieve a list of partial days
 *     description: Get requests with filter and pagination
 *     tags: [PartitalDays]
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
 *                       $ref: '#/components/schemas/PartialDay'
 *   post:
 *     summary: Create a new reason
 *     tags: [PartitalDays]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 id:
 *                    type: integer
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
 *                       type: nunber
 * /partial-days/{id}:
 *   get:
 *     summary: Get a partial day by ID
 *     description: Retrieve a partial day by ID.
 *     tags: [PartitalDays]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the partial day to retrieve.
 *         required: true
 *         schema:
 *           type: integer
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
 *                    $ref: '#/components/schemas/PartialDay'
 *   put:
 *     summary: Update a partial day by ID
 *     description: Update a partial day by ID.
 *     tags: [PartitalDays]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
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
 *     summary: Delete a partial day by ID
 *     description: Delete a partial day by ID.
 *     tags: [PartitalDays]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the partial day to delete.
 *         required: true
 *         schema:
 *           type: integer
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
 *     deprecated: true
 */
