const validateData = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            const errorMessages = error.issues.map(issue => ({
                message: `${issue.path} is ${issue.message}`
            }))

            res.status(400).json({ error: 'Invalid data', details: errorMessages });
        }
    }
}

module.exports = validateData;