import { NextRequest, NextResponse } from "next/server";

export type Config = {
    allowedThemes?: string[];
    defaultTheme?: string;

    allowedStyles?: string[];
    defaultStyle?: string;

    themeCookie?: string;
    lastThemeCookie?: string;

    lastThemeHeaderSignal?: string;
    themeHeaderSignal?: string;
};

export type ThemeInjectorResult = {
    request: NextRequest;
    response: NextResponse;
};

export type ThemeRetrieverResult = {
    lastTheme: string;
    theme: string;
    config: Config;
};
