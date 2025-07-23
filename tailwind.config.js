// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'toss-blue': '#0064FF',
        'toss-gray': {
          100: '#F2F4F6',
          200: '#E5E8EB',
          400: '#B0B8C1',
          600: '#6B7684',
          800: '#333D4B',
          900: '#191F28',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.33, 1, 0.68, 1) forwards',
        'background-pan': 'backgroundPan 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        backgroundPan: {
          '0%': {
            backgroundPosition: '0% center'
          },
          '100%': {
            backgroundPosition: '-200% center'
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-1000px 0'
          },
          '100%': {
            backgroundPosition: '1000px 0'
          },
        },
      },
      boxShadow: {
        'toss': '0 2px 10px rgba(0, 0, 0, 0.08)',
        'toss-lg': '0 10px 30px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'gradient-shimmer': 'linear-gradient(to right, #f0f2f5 4%, #e4e7eb 25%, #f0f2f5 36%)',
      },
    },
  },
  plugins: [],
};
