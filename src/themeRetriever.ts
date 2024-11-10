import { headers } from "next/headers";
import { Config, ThemeRetrieverResult } from "./types";
import settings from "./settings";

/**
 * Retrieves the theme from the headers.
 * @param {*} config Your theme configuration.
 * @returns An object parseable into a theme provider.
 */
export default async function (
    config: Config = {}
): Promise<ThemeRetrieverResult> {
    const {
        lastThemeHeaderSignal = settings.lastThemeHeaderSignal,
        themeHeaderSignal = settings.themeHeaderSignal,
    } = config;

    const localHeaders = await headers();

    return {
        lastTheme:
            localHeaders.get(lastThemeHeaderSignal) || settings.defaultStyle,
        theme: localHeaders.get(themeHeaderSignal) || settings.defaultTheme,
        config,
    };
}
