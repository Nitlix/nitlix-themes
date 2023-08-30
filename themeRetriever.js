const { headers } = require("next/headers")

/**
 * Retrieves the theme from the headers.
 * @param {*} config Your theme configuration.
 * @returns An object parseable into a theme provider.
 */
function themeRetriever(config={}){
    const {
        lastThemeHeaderSignal = 'x-last-theme',
        themeHeaderSignal = 'x-theme-signal'
    } = config;

    return {
        lastTheme: headers().get(lastThemeHeaderSignal),
        theme: headers().get(themeHeaderSignal),
        config
    }
}

module.exports = themeRetriever;