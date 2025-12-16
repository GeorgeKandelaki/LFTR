const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

/**
 * validateResourceParent
 *
 * Validates that a child document belongs to the parent document
 * specified in the request.
 *
 * This middleware is used to enforce parent–child relationships such as:
 *   - Exercise → Workout
 *   - Set → Exercise
 *
 * It does NOT perform ownership checks.
 * Ownership should be validated separately on the parent resource.
 *
 * Parameters:
 * - field:
 *   Name of the request field (req.params or req.body) containing
 *   the child document ID.
 *
 * - parentField:
 *   Name of the request field (req.params or req.body) containing
 *   the parent document ID.
 *
 * - localIdField:
 *   Name of the field on the child document that stores the parent ID.
 *
 * - LocalModel:
 *   Mongoose model of the child document.
 *
 * Validation flow:
 * 1. Resolve the child and parent IDs from the request.
 * 2. Fetch the child document from the database.
 * 3. Verify that the child document’s stored parent ID matches
 *    the parent ID provided in the request.
 *
 * If any step fails, the request is rejected.
 */
module.exports = function validateResourceParent(field, parentField, localIdField, LocalModel) {
    return catchAsync(async function (req, res, next) {
        let docId;
        let parentId;

        // 1. Get the ID of the child and parent documents
        if (req.params[field]) docId = req.params[field];
        else if (req.body[field]) docId = req.body[field];

        if (req.params[parentField]) parentId = req.params[parentField];
        else if (req.body[parentField]) parentId = req.body[parentField];

        if (!docId || !parentId) return next(new AppError("Owner Validation failed: Couldn't get the ID", 404));

        // 2. Query the child document
        const doc = await LocalModel.findById(docId);

        if (!doc) return next(new AppError("Owner Validation failed: No document with that ID"), 404);

        // 3. Ensure the child belongs to the requested parent
        if (doc[localIdField] != parentId) return next(new AppError("This resource doesn't belong to requestor"), 401);

        next();
    });
};
