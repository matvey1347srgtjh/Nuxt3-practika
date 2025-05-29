// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

    app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap', rel: 'stylesheet' }
      ]
    }
  },


  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            $primary-color: #3498db;
            $secondary-color: #a0a8a3;
            $warning-color: #FFC107;
            $danger-color: #e74c3c;
            $success-color: #2ecc71;
            $success-light-color:rgb(116, 216, 158);
           

            $text-color: #333333;      
            $text-color-light: #666666; 
            $background-color: #f8f8f8; 

            // Шрифты
            $font-stack: 'Roboto', sans-serif;
            $font-header: 'Montserrat', sans-serif;

            // Размеры шрифтов
            $font-size-base: 1rem;      
            $font-size-sm: 0.875rem;     
            $font-size-md: 1.125rem;    
            $font-size-lg: 1.25rem;     
            $font-size-xl: 1.5rem;      
            $font-size-h1: 2.5rem;      
            $font-size-h2: 2rem;         
            $font-size-h3: 1.75rem;    
            $font-size-h4: 1.5rem;       

            
            $line-height-base: 1.6;
            $line-height-heading: 1.2;

           
            $spacing-xs: 0.25rem;
            $spacing-sm: 0.5rem;
            $spacing-md: 1rem; 
            $spacing-lg: 1.5rem; 
            $spacing-xl: 2rem; 
            $spacing-xxl: 3rem;

          `
        }
      }
    }
  },

  modules: ["@nuxt/eslint"]
})