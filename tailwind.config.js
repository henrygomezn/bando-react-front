module.exports = {
  content: [
	"./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens:{
      'm' : '768px', 
      'lg': '1440px',
      'xl': '1920px'
    },
    extend: {
      fontFamily: {
        body: ['Open Sans', 'sans-serif'],
      },
      colors:{
        'hw-blue': '#004466',
		'hw-sky': '#0089CD',
		'hw-orange': '#F25B3D',
    'hw-orange-hover': '#D64E34',
    'hw-gray-bg': '#F5F5F5',
    'hw-black': '#333333'

	  },
      backgroundImage: {
        'hw-background': "url('../public/background-hwmonit.png')"
      }
    },
  },
  plugins: [],
}
