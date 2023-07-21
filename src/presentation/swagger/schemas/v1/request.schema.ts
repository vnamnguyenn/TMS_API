/**
 * @swagger
 * components:
 *   schemas:
 *     CreateRequest:
 *       type: object
 *       required:
 *         - requestTypeId
 *         - requestReasonId
 *         - partialDayId
 *         - supervisor
 *         - approver
 *         - expectedDate
 *         - startDate
 *         - endDate
 *       properties:
 *         requestTypeId:
 *           type: string
 *           example: ""
 *           description: Type of request
 *         requestReasonId:
 *           type: string
 *           format: uuid
 *           example: ""
 *           description: Reason of request
 *         partialDayId:
 *           type: integer
 *           description: PartialDay of request
 *         supervisor:
 *           type: string
 *           example: ""
 *           description: Supervisor of request
 *         approver:
 *           type: string
 *           example: ""
 *           description: approver of request
 *         informTo:
 *           type: string
 *           example: ""
 *           description: approver of request
 *         detailReason:
 *           type: string
 *           example: ""
 *           description: detailReason of request
 *         expectedDate:
 *           type: string
 *           example: ""
 *           description: expectedDate of request
 *         startDate:
 *           type: string
 *           example: ""
 *           description: startDate of request
 *         endDate:
 *           type: string
 *           example: ""
 *           description: endDate of request
 *     UpdateRequest:
 *       type: object
 *       required:
 *         - requestTypeId
 *         - requestReasonId
 *         - partialDayId
 *         - startDate
 *         - endDate
 *       properties:
 *         requestTypeId:
 *           type: string
 *           example: ""
 *           description: Type of request
 *         requestReasonId:
 *           type: string
 *           format: uuid
 *           example: ""
 *           description: Reason of request
 *         partialDayId:
 *           type: integer
 *           description: PartialDay of request
 *         detailReason:
 *           type: string
 *           example: ""
 *           description: detailReason of request
 *         startDate:
 *           type: string
 *           example: ""
 *           description: startDate of request
 *         endDate:
 *           type: string
 *           example: ""
 *           description: endDate of request
 *     GetRequestById:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         requester:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *         approver:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *         supervisor:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *         partialDay:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *         requestType:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *         requestReason:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *         status:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *         createdDate:
 *           type: string
 *           format: date-time
 *         comment:
 *           type: string
 *         detailReason:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *     ListRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         approver:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *         supervisor:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *         partialDay:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *         requestType:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *         requestReason:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *         status:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *         createdDate:
 *           type: string
 *           format: date-time
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *     UpdateRequestStatus:
 *       type: object
 *       properties:
 *         ids:
 *           type: array
 *           description: requests ids
 *           items:
 *              type: string
 *              format: uuid
 *         status:
 *           type: string
 *           description: status id
 *           format: uuid
 */
