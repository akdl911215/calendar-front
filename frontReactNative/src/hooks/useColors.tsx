import {useColorScheme} from 'react-native/types';

export const palette = {
  'gray-0': '#000000',
  'gray-1': '#333333',
};

const theme = {
  dark: {
    backgroundColor: '#cccccc',
  },
  light: {
    backgroundColor: '#cccccc',
  },
};

export const useColors = () => {
  const mode = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = theme[mode];
  return {colors};
};
