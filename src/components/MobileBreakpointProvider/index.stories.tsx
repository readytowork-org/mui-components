import type { Meta, StoryObj } from "@storybook/react";
import { Box, Typography, Paper } from "@mui/material";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import { MobileBreakpointProvider } from "./index";

// A default theme for Storybook context if not provided globally
// This ensures that theme.breakpoints.down is available.
const storybookTheme = createTheme();

const meta = {
  title: "Providers/MobileBreakpointProvider",
  component: MobileBreakpointProvider,
  parameters: {
    layout: "fullscreen", // Fullscreen to better test breakpoints by resizing viewport
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider theme={storybookTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  // The primary "prop" is the children render function, demonstrated in the story's render method.
} satisfies Meta<typeof MobileBreakpointProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component to display theme breakpoints for context
const BreakpointDisplay = () => {
  const theme = useTheme();
  return (
    <Box sx={{ mt: 2, p: 1, border: "1px dashed grey", fontSize: "0.8rem" }}>
      <Typography variant={"subtitle2"}>
        {"Current Theme Breakpoints (MUI):"}
      </Typography>
      <Typography variant={"caption"}>
        {"xs: "}
        {theme.breakpoints.values.xs}
        {"px (up to sm)"}
      </Typography>
      <br />
      <Typography variant={"caption"}>
        {"sm: "}
        {theme.breakpoints.values.sm}
        {"px (Mobile if screen "}&lt;{" sm)"}
      </Typography>
      <br />
      <Typography variant={"caption"}>
        {"md: "}
        {theme.breakpoints.values.md}
        {"px"}
      </Typography>
      <br />
      <Typography variant={"caption"}>
        {"lg: "}
        {theme.breakpoints.values.lg}
        {"px (Tablet if screen "}&lt;{" lg)"}
      </Typography>
      <br />
      <Typography variant={"caption"}>
        {"xl: "}
        {theme.breakpoints.values.xl}
        {"px"}
      </Typography>
    </Box>
  );
};

export const Default: Story = {
  render: (args) => (
    <MobileBreakpointProvider {...args}>
      {({ isMobile, isTablet }) => (
        <Paper sx={{ p: 3, m: 2, textAlign: "center" }}>
          <Typography variant={"h5"} gutterBottom>
            {"Mobile Breakpoint Provider Demo"}
          </Typography>
          <Typography paragraph>
            {
              "Resize your browser window or the Storybook canvas (if adjustable)"
            }
            {"to see the values change."}
          </Typography>

          <BreakpointDisplay />

          <Box
            sx={{
              mt: 3,
              p: 2,
              backgroundColor: isMobile
                ? "lightcoral"
                : isTablet
                  ? "lightskyblue"
                  : "lightgreen",
              borderRadius: 1,
              transition: "background-color 0.3s ease",
            }}
          >
            <Typography variant={"h6"}>
              <strong>{"isMobile:"}</strong> {isMobile.toString()}
            </Typography>
            <Typography variant={"h6"}>
              <strong>{"isTablet:"}</strong> {isTablet.toString()}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              {isMobile
                ? "📱 Displaying content for MOBILE screens."
                : isTablet
                  ? "💻 Displaying content for TABLET screens."
                  : "🖥️ Displaying content for DESKTOP screens."}
            </Typography>
          </Box>
        </Paper>
      )}
    </MobileBreakpointProvider>
  ),
  // No specific args needed here as children is handled by render
};
