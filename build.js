#!/usr/bin/env node
const fs = require('node:fs/promises');
const { getConfig } = require('./src/config');
const { getContextData, getHtmlContent, resetDir } = require('./src/files');
const { replaceContextInHtml } = require('./src/parsing');

const defaultConfig = {
    layoutFileName: 'layout.html',
    contentFileName: 'index.html',
    siteDir: `${__dirname}/site`,
    outputDir: `${__dirname}/build`,
}

const main = async () => {
    console.log('🛠️  Building...')

    // Get configuration.
    const {outputDir, siteDir, ...config} = await getConfig(__dirname, defaultConfig);

    // Get context and set layout and content path in context. I think i'll have to do things like
    // parsing hrefs and srcs and such in the future to properly use layouts in nested pages, so this
    // is setting up that work in the future.
    const context = await getContextData(siteDir);
    context.layoutPath = [siteDir, config.layoutFileName].join('/');
    context.contentPath = [siteDir, config.contentFileName].join('/');

    const layout = await getHtmlContent(context.layoutPath);
    const content = await getHtmlContent(context.contentPath);

    const resolvedContent = replaceContextInHtml(content, context, config);
    const resolvedPage = replaceContextInHtml(layout, {...context, content: resolvedContent}, config);

    // Do file operations. First i reset the directory, then i copy everything
    // that isn't an app file to the output directory, then i write the html file.
    await resetDir(outputDir)

    const files = await fs.readdir(siteDir);

    files
        .filter(file => !['data.json', 'layout.html', 'index.html'].includes(file))
        .map(async file => {
        const stats = await fs.stat(`${siteDir}/${file}`)

        if (stats.isDirectory()) {
            return;
        }

        await fs.copyFile(`${siteDir}/${file}`, `${outputDir}/${file}`)
    })

    await fs.writeFile(`${outputDir}/index.html`, resolvedPage);

    console.log('✅ Build finished!')
}

(async () => await main())();
