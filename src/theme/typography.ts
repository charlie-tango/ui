export enum FontWeight {
  hairline = 100,
  thin = 200,
  light = 300,
  normal = 400,
  medium = 500,
  semibold = 600,
  bold = 700,
  extrabold = 800,
  black = 900,
}

const typography = {
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    [FontWeight.hairline]: FontWeight.hairline,
    [FontWeight.thin]: FontWeight.thin,
    [FontWeight.light]: FontWeight.light,
    [FontWeight.normal]: FontWeight.normal,
    [FontWeight.medium]: FontWeight.medium,
    [FontWeight.semibold]: FontWeight.semibold,
    [FontWeight.bold]: FontWeight.bold,
    [FontWeight.extrabold]: FontWeight.extrabold,
    [FontWeight.black]: FontWeight.black,
  },
  fonts: {
    heading: `system-ui, Helvetica, Arial, sans-serif`,
    body: `system-ui, Helvetica, Arial, sans-serif`,
    mono: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
  },
};

export default typography;
