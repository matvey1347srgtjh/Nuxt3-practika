/// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default withNuxt(
  
  {
    
    languageOptions: {
      globals: {
        ...globals.browser, 
        ...globals.node     
      }
    },
    
    rules: {
     
      'vue/multi-word-component-names': 'off',

      
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

     
    }
  },

  
  prettier
);