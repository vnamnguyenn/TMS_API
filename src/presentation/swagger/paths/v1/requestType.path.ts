/**
 * @swagger
 * /request-types:
 *   get:
 *     summary: Retrieve a list of type
 *     description: Get requests with filter and pagination
 *     tags: [RequestTypes]
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
 *       - name: isActive
 *         in: query
 *         schema:
 *           type: string
 *           enum: [true, false]
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
 *                       $ref: '#/components/schemas/RequestType'
 *   post:
 *     summary: Create a new type
 *     tags: [RequestTypes]
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
 *                    required: true
 *                 description:
 *                    type: string
 *                    example: ""
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
 * /request-types/{id}:
 *   get:
 *     summary: Get a type by ID
 *     description: Retrieve a type by ID.
 *     tags: [RequestTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the type to retrieve.
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
 *                    $ref: '#/components/schemas/RequestType'
 *   put:
 *     summary: Update a type by ID
 *     description: Update a type by ID.
 *     tags: [RequestTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the type to update.
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
 *     summary: Update a type by ID
 *     description: Update a type by ID.
 *     tags: [RequestTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the type to delete.
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
 *               type: object
 *               properties:
 *                 type:
 *                   $ref: '#/components/schemas/ResponseStatus'
 * /request-types/{id}/request-reasons:
 *   get:
 *     summary: Retrieve a list of reason by type ID
 *     description: Get request reasons by type ID
 *     tags: [RequestTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *           format: uuid
 *           required: true
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
 *                 data:
 *                    type: array
 *                    items:
 *                       type: object
 *                       properties:
 *                          id:
 *                            type: string
 *                            format: uuid
 *                          name:
 *                            type: string
 */
