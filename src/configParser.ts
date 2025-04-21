import { Config, StrictConfig } from "./types";

export default function (config: Config): StrictConfig {
    return {
        allowedThemes: config.allowedThemes || ["light", "dark", "system"],
        defaultTheme: config.defaultTheme || "system",

        allowedStyles: config.allowedStyles || ["light", "dark"],
        defaultStyle: config.defaultStyle || "dark",

        themeCookie: config.themeCookie || "nitlix-themes-theme",
        lastStyleCookie: config.lastStyleCookie || "nitlix-themes-last-style",
    };
}
