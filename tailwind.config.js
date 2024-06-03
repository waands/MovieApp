/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },

    borderRadius: {
      'none': '0',
      'sm': '.125rem',
      DEFAULT: '.25rem',
      'lg': '.5rem',
      'full': '9999px',
    },

    colors: {
      'primary': {
        500: '#8000FF',
        800: '#540BA1',
      },
      'secondary': '#FF1F8A',
      'bluish-gray': '#303243',
       'gray': {
        900: '#121212',
        800: '#1F1F1F', 
        700: '#2D2D2D',
        600: '#3B3B3B', 
        500: '#BBBBBB',
        300: '#E5E5E5',
        200: '#F2F2F2',
       },
       
       black: '#000',
       white: '#fff',
    },

    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      backgroundImage: theme => ({
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-linear': 'linear-gradient(var(--tw-gradient-angle), var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      }),
      lineClamp: {
        2: '2',
      },
    },
  },
  variants: {
    extend: {
      backgroundImage: ['hover', 'focus'],
      backdropBlur: ['hover', 'focus'],
      opacity: ['group-hover'],
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}