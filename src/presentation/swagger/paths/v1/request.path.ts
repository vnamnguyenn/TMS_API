/**
 * @swagger
 * /requests:
 *   get:
 *     summary: Get all requests
 *     description: Retrieve a list of all requests
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: pageSize
 *         in: query
 *         description: Page size
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - name: pageNumber
 *         in: query
 *         description: Page number
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
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: >
 *           Sort order:
 *            * `asc` - Ascending, from A to Z
 *
 *            * `desc` - Descending, from Z to A
 *       - name: status
 *         in: query
 *         description: Status
 *         schema:
 *           type: string
 *       - name: requestType
 *         in: query
 *         description: type of request
 *         schema:
 *           type: string
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
 *                      code:
 *                        type: integer
 *                 totalRecords:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ListRequest'
 *   post:
 *     summary: Create a new request
 *     tags: [Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRequest'
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
 * /requests/{id}:
 *   get:
 *     summary: Get a request by ID
 *     description: Retrieve a request by ID.
 *     tags: [Requests]
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
 *                    $ref: '#/components/schemas/GetRequestById'
 *   put:
 *     summary: Update a request by ID
 *     description: Update a request by ID.
 *     tags: [Requests]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the request to update.
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRequest'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   $ref: '#/components/schemas/ResponseStatus'
 * /requests/change-status:
 *   patch:
 *     summary: Update list request status
 *     description: Update list request status
 *     tags: [Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRequestStatus'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                     $ref: '#/components/schemas/ResponseStatus'
 * /requests/{id}/cancel:
 *   patch:
 *     summary: Cancel a request
 *     description: Cancel a request
 *     tags: [Requests]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the request to cancel.
 *         schema:
 *           type: string
 *           format: uuid
 *           required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 example: ""
 *                 required: true
 *               approverId:
 *                 type: string
 *                 format: uuid
 *                 example: ""
 *                 required: true
 *               comment:
 *                 type: string
 *                 example: ""
 *                 required: true
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                     $ref: '#/components/schemas/ResponseStatus'
 */
