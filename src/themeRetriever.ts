import { headers } from "next/headers"
import { Config, ThemeRetrieverResult } from "./types";
import settings from "./settings";

/**
 * Retrieves the theme from the headers.
 * @param {*} config Your theme configuration.
 * @returns An object parseable into a theme provider.
 */
export default function(config: Config = {}): ThemeRetrieverResult{
    const {
        lastThemeHeaderSignal = settings.lastThemeHeaderSignal,
        themeHeaderSignal = settings.themeHeaderSignal,
    } = config;

    return {
        lastTheme: headers().get(lastThemeHeaderSignal),
        theme: headers().get(themeHeaderSignal),
        config
    }
}