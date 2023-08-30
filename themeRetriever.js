import { cookies } from "next/headers";

/**
 * Retrieves the theme from the cookies.
 * @param {*} config Your theme configuration.
 * @returns An object parseable into a theme provider.
 */
module.exports = function(config={}){
    const {
        lastThemeCookie = 'last-theme',
        themeCookie = 'theme'
    } = config;

    return {
        lastTheme: cookies.get(lastThemeCookie).value,
        theme: cookies.get(themeCookie).value,
        config
    }
}