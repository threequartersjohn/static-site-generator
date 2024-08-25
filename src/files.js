const fs = require('node:fs/promises');
const { existsSync } = require('node:fs');

// TODO: this currently only gets context from the data file, maybe add support for having defaults in the layout file?
const getContextData = async (path) => {
    const contextFile = await fs.readFile(`${path}/data.json`, 'utf-8');

    const result = JSON.parse(contextFile);

    return result;
}

const getHtmlContent = async (path) => {
    const html = await fs.readFile(path, 'utf-8');

    return html;
}

const resetDir = async (path) => {
    if (existsSync(path)) {
        await fs.rm(path, { recursive: true, force: true })
    }

    await fs.mkdir(path);
}

module.exports = {
    getContextData,
    getHtmlContent,
    resetDir
}
