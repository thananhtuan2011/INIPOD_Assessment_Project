/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    container: {
      center: true,
      padding: '24px',
    },
    extend: {
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      colors: {
        test: { DEFAULT: '#ff0008' },
        // TEXT COLORS
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          placeholder: {
            DEFAULT: 'var(--text-placeholder)',
            slight: 'var(--text-placeholder-slight)',
          },
          disabled: 'var(--text-disabled)',
          white: 'var(--text-white)',
          black: 'var(--text-black)',
          informative: 'var(--text-informative)',
          success: 'var(--text-success)',
          danger: 'var(--text-danger)',
          warning: 'var(--text-warning)',
          brand: {
            tertiary: 'var(--text-brand-tertiary)',
            primary: 'var(--text-brand-primary)',
            secondary: 'var(--text-brand-secondary)',
          }
        },

        //  BACKGROUND COLORS
        bg: {
          overlay: {
            dark: 'var(--bg-overlay-dark)',
            light: 'var(--bg-overlay-light)',
            brand: 'var(--bg-overlay-brand)',
          },
          primary: {
            DEFAULT: 'var(--bg-primary)',
            fixed: 'var(--bg-primary-fixed)',
            hover: 'var(--bg-primary-hover)',
            dark: 'var(--bg-primary-dark)',
          },
          secondary: {
            DEFAULT: 'var(--bg-secondary)',
            hover: 'var(--bg-secondary-hover)',
            subtle: 'var(--bg-secondary-subtle)',
            dark: 'var(--bg-secondary-dark)',
          },
          danger: {
            primary: 'var(--bg-danger-primary)',
            secondary: 'var(--bg-danger-secondary)',
            strong: {
              DEFAULT: 'var(--bg-danger-strong)',
              hover: 'var(--bg-danger-strong-hover)'
            }
          },
          success: {
            primary: 'var(--bg-success-primary)',
            secondary: 'var(--bg-success-secondary)',
            strong: 'var(--bg-success-strong)',
          },
          warning: {
            primary: 'var(--bg-warning-primary)',
            secondary: 'var(--bg-warning-secondary)',
            strong: 'var(--bg-warning-strong)',
          },
          tertiary: 'var(--bg-tertiary)',
          selected: 'var(--bg-selected)',
          disabled: {
            DEFAULT: 'var(--bg-disabled)',
            slight: 'var(--bg-disabled-slight)',
          },
          brand: {
            primary: 'var(--bg-brand-primary)',
            secondary: 'var(--bg-brand-secondary)',
            strong: {
              DEFAULT: 'var(--bg-brand-strong)',
              hover: 'var(--bg-brand-strong-hover)',
            }
          }
        },

        // OBJECT COLORS
        object: {
          primary: "var(--object-primary)",
          white: "var(--object-white)",
          secondary: "var(--object-secondary)",
          disabled: {
            DEFAULT: "var(--object-disabled)",
            slight: 'var(--object-disabled-slight)'
          },
          tertiary: "var(--object-tertiary)",
          quaternary: "var(--object-quaternary)",
          contrast: {
            black: "var(--object-contrast-black)",
            white: 'var(--object-contrast-white)',
          },
          brand: {
            primary: 'var(--object-brand-primary)',
            secondary: 'var(--object-brand-secondary)'
          },
          danger: {
            primary: 'var(--object-danger-primary)',
            secondary: 'var(--object-danger-secondary)',
          },
          success: {
            primary: 'var(--object-success-primary)',
            secondary: 'var(--object-success-secondary)',
          },
          warning: {
            primary: 'var(--object-warning-primary)',
            secondary: 'var(--object-warning-secondary)',
          }
        },

        // BORDER COLORS
        border: {
          primary: {
            DEFAULT: 'var(--border-primary)',
            slight: 'var(--border-primary-slight)',
          },
          secondary: 'var(--border-secondary)',
          disabled: 'var(--border-disabled)',
          dark: 'var(--border-dark)',
          duotone: 'var(--border-duotone)',
          white: 'var(--border-white)',
          tertiary: 'var(--border-tertiary)',
          brand: {
            DEFAULT: 'var(--border-brand)',
            secondary: 'var(--border-brand-secondary)',
          },
          in: { tertiary: 'var(--border-in-tertiary)', },
          danger: {
            DEFAULT: 'var(--border-danger)',
            slight: 'var(--border-danger-slight)',
          },
          success: {
            DEFAULT: 'var(--border-success)',
            slight: 'var(--border-success-slight)',
          },
          warning: {
            DEFAULT: 'var(--border-warning)',
            slight: 'var(--border-warning-slight)',
          }
        }
      },

      fontSize: {
        'lg-regular': ['80px', { lineHeight: '96px', fontWeight: '400' }],
        'lg-medium': ['80px', { lineHeight: '96px', fontWeight: '500' }],
        'lg-semibold': ['80px', { lineHeight: '96px', fontWeight: '600' }],
        'lg-bold': ['80px', { lineHeight: '96px', fontWeight: '700' }],

        'md-regular': ['64px', { lineHeight: '72px', fontWeight: '400' }],
        'md-medium': ['64px', { lineHeight: '72px', fontWeight: '500' }],
        'md-semibold': ['64px', { lineHeight: '72px', fontWeight: '600' }],
        'md-bold': ['64px', { lineHeight: '72px', fontWeight: '700' }],

        'sm-regular': ['48px', { lineHeight: '56px', fontWeight: '400' }],
        'sm-medium': ['48px', { lineHeight: '56px', fontWeight: '500' }],
        'sm-semibold': ['48px', { lineHeight: '56px', fontWeight: '600' }],
        'sm-bold': ['48px', { lineHeight: '56px', fontWeight: '700' }],

        'headline-xl-regular': ['40px', { lineHeight: '48px', fontWeight: '400' }],
        'headline-xl-medium': ['40px', { lineHeight: '48px', fontWeight: '500' }],
        'headline-xl-semibold': ['40px', { lineHeight: '48px', fontWeight: '600' }],
        'headline-xl-bold': ['40px', { lineHeight: '48px', fontWeight: '700' }],

        'headline-lg-regular': ['30px', { lineHeight: '40px', fontWeight: '400' }],
        'headline-lg-medium': ['30px', { lineHeight: '40px', fontWeight: '500' }],
        'headline-lg-semibold': ['30px', { lineHeight: '40px', fontWeight: '600' }],
        'headline-lg-bold': ['30px', { lineHeight: '40px', fontWeight: '700' }],

        'headline-md-regular': ['24px', { lineHeight: '32px', fontWeight: '400' }],
        'headline-md-medium': ['24px', { lineHeight: '32px', fontWeight: '500' }],
        'headline-md-semibold': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'headline-md-bold': ['24px', { lineHeight: '32px', fontWeight: '700' }],

        'headline-sm-regular': ['20px', { lineHeight: '30px', fontWeight: '400' }],
        'headline-sm-medium': ['20px', { lineHeight: '30px', fontWeight: '500' }],
        'headline-sm-semibold': ['20px', { lineHeight: '30px', fontWeight: '600' }],
        'headline-sm-bold': ['20px', { lineHeight: '30px', fontWeight: '700' }],

        'headline-xs-regular': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'headline-xs-medium': ['18px', { lineHeight: '28px', fontWeight: '500' }],
        'headline-xs-semibold': ['18px', { lineHeight: '28px', fontWeight: '600' }],
        'headline-xs-bold': ['18px', { lineHeight: '28px', fontWeight: '700' }],

        'text-md-regular': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'text-md-medium': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'text-md-semibold': ['16px', { lineHeight: '24px', fontWeight: '600' }],
        'text-md-bold': ['16px', { lineHeight: '24px', fontWeight: '700' }],

        'text-sm-regular': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'text-sm-medium': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'text-sm-semibold': ['14px', { lineHeight: '20px', fontWeight: '600' }],
        'text-sm-bold': ['14px', { lineHeight: '20px', fontWeight: '700' }],

        'text-xs-regular': ['12px', { lineHeight: '18px', fontWeight: '400' }],
        'text-xs-medium': ['12px', { lineHeight: '18px', fontWeight: '500' }],
        'text-xs-semibold': ['12px', { lineHeight: '18px', fontWeight: '600' }],
        'text-xs-bold': ['12px', { lineHeight: '18px', fontWeight: '700' }],

        'text-tn-regular': ['10px', { lineHeight: '16px', fontWeight: '400' }],
        'text-tn-medium': ['10px', { lineHeight: '16px', fontWeight: '500' }],
        'text-tn-semibold': ['10px', { lineHeight: '16px', fontWeight: '600' }],
        'text-tn-bold': ['10px', { lineHeight: '16px', fontWeight: '700' }],
      }
    },
    screens: {
      xs: '475px',
      sm: '640px', // Small
      md: '768px', // Medium
      lg: '1024px', // Large
      xl: '1280px', // Extra Large

      '2xl': '1536px',
      // Min width
      mw600: {
        raw: 'screen and (min-width: 600px)',
      },

      // Max width
      mxw1100: {
        raw: 'screen and (max-width: 1100px)',
      },
      mxw600: {
        raw: 'screen and (max-width: 600px)',
      },
    }
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container-full': {
          '@apply css-container-full': {},
        },
        'shadow-xs': {
          'box-shadow': '0px 2px 4px -2px rgba(0, 0, 0, 0.08)'
        },
        'shadow-md': {
          'box-shadow': '0px 12px 24px -8px rgba(0, 0, 0, 0.3)'
        },
        'shadow-lg': {
          'box-shadow': '0px 32px 64px -12px rgba(0, 0, 0, 0.3)'
        },
        '.button-size-md': {
          '@apply css-button-md': {},
        },
        '.button-primary': {
          '@apply css-button-primary': {},
        },
        '.button-transparent': {
          '@apply css-button-transparent': {},
        },
        '.button-outline': {
          '@apply css-button-outline': {},
        },
        '.button-outline-primary': {
          '@apply css-button-outline-primary': {},
        },
        '.button-danger': {
          '@apply css-button-danger': {},
        },
        '.button-link-danger': {
          '@apply css-button-link-danger': {},
        },
        '.button-link-primary': {
          '@apply css-button-link-primary': {},
        },
        '.button-icon': {
          '@apply css-button-icon': {},
        },
        '.dropdown-invisible': {
          '@apply css-dropdown-invisible': {},
        },
        '.dropdown-md': {
          '@apply css-dropdown-md': {},
        },
        '.dropdown-sm': {
          '@apply css-dropdown-sm': {},
        },
      });
    },
  ],
}
