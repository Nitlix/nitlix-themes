const { NextResponse } = require("next/server")

/**
 * Injects the theme into the request and response.
 * @param {*} request The request object.
 * @param {*} config Your theme configuration.
 * @param {*} response The response object.
 * @returns The new request, config, and response objects.
 */
function themeInjector(request, config={}, response=null){
    if (!response){
        response = NextResponse.next()
    }

    const {
        allowedThemes = ['light', 'dark', 'system'],
        defaultTheme = 'system',

        allowedStyles = ['light', 'dark'],
        defaultStyle = 'dark',

        themeCookie = 'theme',
        lastThemeCookie = 'last-theme',
        
        lastThemeHeaderSignal = 'x-last-theme',
        themeHeaderSignal = 'x-theme-signal',
    } = config;

    function setCookie(name, value){
        request.cookies.set(name, value);
        response.cookies.set(name, value);
    }

    const getCookie = (name) => request.cookies.get(name);

    function setHeader(name, value){
        response.headers.set(name, value);
        request.headers.set(name, value);
    }


    //====================
    // Theme setting
    //====================
    let theme = getCookie(themeCookie);
    if (theme) {
        theme = theme.value.toLowerCase();
    }

    if (!allowedThemes.includes(theme)) {
        theme = defaultTheme;
        setCookie(themeCookie, defaultTheme);
    }

    let lastTheme = getCookie(lastThemeCookie);
    if (lastTheme) {
        lastTheme = lastTheme.value.toLowerCase();
    }
    else {
        lastTheme = defaultStyle;
        setCookie(lastThemeCookie, defaultStyle);
    }

    if (allowedStyles.includes(lastTheme)) {
        setHeader(lastThemeHeaderSignal, defaultStyle);
    }
    
    setHeader(themeHeaderSignal, theme);


    return {
        request,
        config,
        response
    }
}

module.exports = themeInjector;