export const getBaseUrl = () => {
    if (import.meta.env.DEV) {
      return 'http://localhost:5173';
    }
    return 'https://rahulvital.github.io/simple-vents-fe';
  };