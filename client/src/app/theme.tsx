export interface Theme {
  bgColor: string;
  primaryColor: string;
  accentText: string;
  gradientDark: string;
  gradientLight: string;
  colorProduct: string;
  productList: string;
  accentTextInvert: string;
  gradientLightProjects: string;
  goldText: string;
  blueBackground: string;
  darkBlueBackground: string;
  gradientLightContact: string;
  accentBgColor: string;
  colorWarning: string;
  accentWarning: string;
}

export const lightTheme: Theme = {
  bgColor: '#f1f0ee',
  accentBgColor: '#f6e760',
  primaryColor: '#0e0f11',
  accentText: '#0047ff',
  accentTextInvert: '#f6e760',
  gradientDark: '#4bbbf4',
  gradientLight: '#ecae37',
  gradientLightProjects: 'rgba(241, 240, 238, 0.5)',
  gradientLightContact: 'rgba(241, 240, 238, 0.50)',
  colorProduct: '#000000b2',
  productList: '#e7e6e2',
  goldText: '#5e5c03',
  blueBackground: '#dee4ea',
  darkBlueBackground: 'rgba(222, 228, 234, 0.19)',
  colorWarning: '#ba5858',
  accentWarning: '#8b0000',
};

export const darkTheme: Theme = {
  bgColor: '#0e0f11',
  accentBgColor: '#0047ff',
  primaryColor: '#ffffff',
  accentText: '#f6e760',
  accentTextInvert: '#0047ff',
  gradientDark: '#4bbbf4',
  gradientLight: '#ecae37',
  gradientLightProjects: 'rgba(255, 255, 255, 0.5)',
  gradientLightContact: '#00000026',
  colorProduct: '#ffffffb2',
  productList: '#18191d',
  goldText: '#5e5c03',
  blueBackground: '#dee4ea',
  darkBlueBackground: 'rgba(222, 228, 234, 0.19)',
  colorWarning: '#ff6b60',
  accentWarning: '#ff3b2d',
};
