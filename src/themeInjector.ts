import { NextRequest, NextResponse } from "next/server";
import { Config, ThemeInjectorResult } from "./types";
import configParser from "./configParser";

/**
 * Injects the theme into the request and response.
 * @param {*} request The request object.
 * @param {*} config Your theme configuration.
 * @param {*} response The response object.
 * @returns The new request, config, and response objects.
 */
export default function (
    request: NextRequest,
    config: Config = {},
    response: NextResponse = NextResponse.next()
): ThemeInjectorResult {
    if (!response) {
        response = NextResponse.next();
    }

    const conf = configParser(config);

    function setCookie(name: string, value: string) {
        request.cookies.set(name, value);
        response.cookies.set(name, value);
    }

    function getCookie(name: string): string {
        return request.cookies.get(name)?.value || "";
    }

    //====================
    // Theme setting
    //====================
    let theme: any = getCookie(conf.themeCookie);

    if (!conf.allowedThemes.includes(theme)) {
        theme = conf.defaultTheme;
        setCookie(conf.themeCookie, conf.defaultTheme);
    }

    let lastStyle: any = getCookie(conf.lastStyleCookie);

    if (!conf.allowedStyles.includes(lastStyle)) {
        lastStyle = conf.defaultStyle;
        setCookie(conf.lastStyleCookie, conf.defaultStyle);
    }

    return {
        request,
        response,
    };
}
