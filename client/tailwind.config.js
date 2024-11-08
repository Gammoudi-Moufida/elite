/** @type {import('tailwindcss').Config} */
module.exports = {
  // prefix: 'tw-',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      
      textColor: {
        'custom-black': '#2a2a2a',
        'custom-blue': '#097893',
        'custom-slate-gray':'#576975',
        'custom-dark-blue':'#00779b', 
        'custom-cadet':'#5B6A73',
        'custom-gray': '#556a74', 
        'custom-deep-blue': '#124C63', 
        'custom-ocean-blue': '#327793', 
        'custom-olive': '#3D4E05', 
        'custom-gray-light':'#576471',
        'custom-silver':'#ebebec',
        'custom-gray-pagination':'#666',
        'custom-orange':'#e6451c',
        'custom-blue-green':'#0c96bb',
        'custom-jet-gray':'#5b6a73',
        'custom-slate-gray':'#576975',
        'custom-dark-metal':'#212529',
        'custom-orange-marchands':'#faba0d'
       
      },
      backgroundColor: {
        'custom-blue': '#097893',
        'custom-dark-blue':'#00779b',
        'custom-slate-gray':'#576975',
        'custom-cadet':'#5B6A73',
        'custom-gray': '#F1F1F1',
        'custom-silver':'#ebebec',
        'custom-black': '#2a2a2a',
        'custom-ocean-blue': '#327793',
        'custom-deep-blue': '#124C63',
        'custom-olive': '#3D4E05',
        'custom-flash-white': '#f2f2f2',
        'custom-bright-gray': '#eeeeee',
        'custom-gray-btn':'#596A73',
        'custom-jet-gray':'#5b6a73',
        'custom-slate-gray':'#576975',
        'custom-steel-blue': '#007795',
        'custom-dark-metal':'#212529',
      },
      borderColor: {
        'custom-blue': '#097893',
        'custom-gray-pagination':'#666',
        'custom-gray-btn':'#596A73',
        'custom-flash-white': '#f2f2f2',
        'custom-gray': '#F1F1F1',
        'custom-gains-gray':'#e2e2e2',
        'custom-dark-metal':'#212529',
      },
      colors:{
        'custom-blue': '#097893',
        'custom-gray': '#596a73',
        'custom-olive': '#3D4E05',
        'custom-gray-btn':'#596A73',
        'custom-black': '#2a2a2a',
        'custom-gray-pagination':'#666',
        'custom-orange':'#e6451c',
        'custom-dark-metal':'#212529',
      },
    
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'arial': ['Arial', 'sans-serif'],
        'raleway': ['Raleway', 'Helvetica', 'sans-serif'],
      }
    },
  },
  plugins: [],
}