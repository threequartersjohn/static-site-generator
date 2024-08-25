const getPathInObject = (object, path) =>
    path.split('.').reduce((acc, key) => {
        if (!acc[key]) {
            throw new Error(`Path \'${path}\' was not found in object. Did you mean one of ${Object.keys(acc).join(' or ')}?`);
        }

        acc = acc[key];

        return acc;
    }, { ...object });


module.exports = {
    getPathInObject
}
