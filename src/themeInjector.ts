import { NextRequest, NextResponse } from "next/server";
import { Config, ThemeInjectorResult } from "./types";
import settings from "./settings";

/**
 * Injects the theme into the request and response.
 * @param {*} request The request object.
 * @param {*} config Your theme configuration.
 * @param {*} response The response object.
 * @returns The new request, config, and response objects.
 */
export default function(
    request: NextRequest, 
    config: Config={},
    response: NextResponse = NextResponse.next()
): ThemeInjectorResult {

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
        
        lastThemeHeaderSignal = settings.lastThemeHeaderSignal,
        themeHeaderSignal = settings.themeHeaderSignal,
    } = config;

    function setCookie(name: string, value: string){
        request.cookies.set(name, value);
        response.cookies.set(name, value);
    }

    function getCookie(name: string): {value: string} | undefined{
        return request.cookies.get(name);
    }

    function setHeader(name: string, value: string){
        response.headers.set(name, value);
        request.headers.set(name, value);
    }


    //====================
    // Theme setting
    //====================
    let theme: any = getCookie(themeCookie);
    if (theme) {
        theme = theme.value.toLowerCase();
    }

    if (!allowedThemes.includes(theme)) {
        theme = defaultTheme;
        setCookie(themeCookie, defaultTheme);
    }

    let lastTheme: any = getCookie(lastThemeCookie);
    if (lastTheme) {
        lastTheme = lastTheme.value.toLowerCase();
    }

    if (!allowedStyles.includes(lastTheme)) {
        lastTheme = defaultStyle;
        setCookie(lastThemeCookie, defaultStyle);
    }
    
    setHeader(lastThemeHeaderSignal, lastTheme);


    
    setHeader(themeHeaderSignal, theme);


    return {
        request,
        response
    }
}
