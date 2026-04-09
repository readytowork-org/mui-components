import useMediaQuery from "@mui/material/useMediaQuery";
import type { Theme } from "@mui/system/createTheme";
import useTheme from "@mui/system/useTheme";
import type { FC } from "react";
import type { JSX } from "react/jsx-runtime";

export interface MobileBreakpointProviderProps {
  children: ({
    theme,
    isMobile,
    isTablet,
  }: {
    theme: Theme;
    isMobile: boolean;
    isTablet: boolean;
  }) => JSX.Element;
}

export const MobileBreakpointProvider: FC<MobileBreakpointProviderProps> = ({
  children,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  return children({ theme, isMobile, isTablet });
};
