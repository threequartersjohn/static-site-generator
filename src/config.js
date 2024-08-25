const fs = require('node:fs/promises');

// TODO: i need to add some kind of validation to this, and warn about unused keys
// TODO: also add support for argv overriding the file and the default config
const getConfig = async (configPath, defaultConfig) => {
    const configFile = await fs.readFile(`${configPath}/config.json`);

    const configFromFile = JSON.parse(configFile);

    return {...defaultConfig, ...configFromFile};
}

module.exports = {
    getConfig
};
