function filterBody(fieldsToLeave) {
    return function (req, res, next) {
        for (const [key, value] of Object.entries(req.body)) {
            if (!fieldsToLeave.includes(key)) delete req.body[key];
        }

        next();
    };
}

module.exports = filterBody;
