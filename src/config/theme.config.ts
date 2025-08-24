
export const themeConfig = {
  // Couleurs principales (modifiables facilement)
  colors: {
    primary: {
      50: 'hsl(35, 91%, 95%)',
      100: 'hsl(35, 91%, 90%)',
      200: 'hsl(35, 91%, 80%)',
      300: 'hsl(35, 91%, 70%)',
      400: 'hsl(35, 91%, 60%)',
      500: 'hsl(35, 91%, 50%)',
      600: 'hsl(35, 91%, 40%)',
      700: 'hsl(35, 91%, 30%)',
      800: 'hsl(35, 91%, 20%)',
      900: 'hsl(35, 91%, 10%)'
    },
    
    luxury: {
      gold: 'hsl(45, 85%, 58%)',
      cream: 'hsl(48, 20%, 95%)',
      brown: 'hsl(25, 30%, 25%)'
    },
    
    neutral: {
      50: 'hsl(0, 0%, 98%)',
      100: 'hsl(0, 0%, 96%)',
      200: 'hsl(0, 0%, 90%)',
      300: 'hsl(0, 0%, 83%)',
      400: 'hsl(0, 0%, 64%)',
      500: 'hsl(0, 0%, 45%)',
      600: 'hsl(0, 0%, 32%)',
      700: 'hsl(0, 0%, 25%)',
      800: 'hsl(0, 0%, 15%)',
      900: 'hsl(0, 0%, 9%)'
    }
  },
  
  // Typographie
  fonts: {
    heading: '"Playfair Display", serif',
    body: '"Inter", sans-serif',
    accent: '"Dancing Script", cursive'
  },
  
  // Espacements
  spacing: {
    section: '5rem',
    container: '1.5rem',
    card: '1.5rem'
  },
  
  // Rayons des bordures
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem'
  },
  
  // Ombres
  shadows: {
    luxury: '0 10px 40px rgba(0, 0, 0, 0.1)',
    card: '0 4px 20px rgba(0, 0, 0, 0.08)',
    hover: '0 8px 30px rgba(0, 0, 0, 0.15)'
  }
};
