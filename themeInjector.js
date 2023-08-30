export default function(request, config={}, response=null){
    const {
        allowedThemes = ['light', 'dark', 'system'],
        defaultTheme = 'system',

        allowedStyles = ['light', 'dark'],
        defaultStyle = 'dark',

        themeCookie = 'theme',
        lastThemeCookie = 'last-theme',
        lastThemeHeaderSignal = 'x-last-theme',

        themeSignalCookie = 'x-theme-signal',
        themeSignalHeader = 'x-theme-signal',
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

    if (!allowedStyles.includes(lastTheme)) {
        lastTheme = defaultStyle;
        setHeader(lastThemeHeaderSignal, defaultStyle);
    }
    
    setHeader(themeSignalHeader, theme);
    setCookie(themeSignalCookie, theme);
}