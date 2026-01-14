const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

/**
 * Authorization middleware
 * ------------------------
 * Validates that the currently authenticated user
 * is the owner of the requested resource.
 *
 * @param {String} docIdField - Field name containing the document ID (from params or body)
 * @param {Model} Model - Mongoose model of the resource being accessed
 *
 * Assumptions:
 * - req.user exists (authentication middleware already ran)
 * - The document has a `user` field referencing its owner
 */

module.exports = function validateResourceUser(docIdField, Model) {
    // Return middleware so we can pass arguments when registering the route
    return catchAsync(async function (req, res, next) {
        let docId;

        // 1. Extract document ID from request (params first, then body)
        if (req.params[docIdField]) docId = req.params[docIdField];
        else if (req.body[docIdField]) docId = req.body[docIdField];

        // 2. Fail early if no document ID is provided
        if (!docId) return next(new AppError("Owner Validation failed: Couldn't get the ID", 404));

        // 3. Fetch the document from the database
        const doc = await Model.findById(docId);

        // 4. Ensure the document exists
        if (!doc) return next(new AppError("Owner Validation failed: No document with that ID"), 404);

        // 5. Verify ownership (resource must belong to the authenticated user)
        if (doc?.user != req.user.id) return next(new AppError("This resource doesn't belong to requestor"), 401);

        // 6. Ownership verified, allow request to proceed
        next();
        console.log("---Ownership Verified!---");
    });
};
