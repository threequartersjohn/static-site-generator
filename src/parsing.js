const { getPathInObject } = require("./utils");

const replaceContextInHtml = (html, context, config) => {
    const result = html.replaceAll(/{{ .* }}/g, (match) => {
        const path = match.replace('{{ ', '').replace(' }}', '');
        let data;

        try {
            data = getPathInObject({context}, path);
        } catch (error) {
            if (!config.skipUnresolvedKeys) {
                throw error
            }

            console.warn(`⚠️ Path \'${path}\' not found in page context, skipping...`)

            return match;
        }

        return String(data);
    })

    return result;
}

module.exports = {
    replaceContextInHtml
}
