import { NextRequest, NextResponse } from "next/server";

export type Style = "light" | "dark";
export type Theme = Style | "system";

export type Config = {
    allowedThemes?: Theme[];
    defaultTheme?: Theme;

    allowedStyles?: Style[];
    defaultStyle?: Style;

    themeCookie?: string;
    lastStyleCookie?: string;
};

export type StrictConfig = {
    allowedThemes: Theme[];
    defaultTheme: Theme;

    allowedStyles: Style[];
    defaultStyle: Style;

    themeCookie: string;
    lastStyleCookie: string;
};

export type ThemeInjectorResult = {
    request: NextRequest;
    response: NextResponse;
};

export type ThemeRetrieverResult = {
    lastStyle: Style;
    theme: Theme;
    config: Config;
};
