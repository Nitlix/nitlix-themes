import { cookies } from "next/headers";
import { Config, Style, Theme, ThemeRetrieverResult } from "./types";
import configParser from "./configParser";
/**
 * Retrieves the theme from the headers. Run server-side in the route-handler.
 * @param {*} config Your theme configuration.
 * @returns An object parseable into a theme provider.
 */
export default async function (
    config: Config = {}
): Promise<ThemeRetrieverResult> {
    const conf = configParser(config);

    const localCookies = await cookies();

    let lastStyle = localCookies.get(conf.lastStyleCookie)?.value || "";
    if (!conf.allowedStyles.includes(lastStyle as any)) {
        lastStyle = conf.defaultStyle;
    }

    let theme = localCookies.get(conf.themeCookie)?.value || "";
    if (!conf.allowedThemes.includes(theme as any)) {
        theme = conf.defaultTheme;
    }

    return {
        lastStyle: lastStyle as Style,
        theme: theme as Theme,
        config,
    };
}
