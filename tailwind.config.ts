
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// House of Beauty palette
				cream: {
					50: 'hsl(var(--cream-50))',
					100: 'hsl(var(--cream-100))',
					200: 'hsl(var(--cream-200))',
					500: 'hsl(var(--cream-500))',
					900: 'hsl(var(--cream-900))',
				},
				luxury: {
					gold: 'hsl(var(--luxury-gold))',
					'gold-light': 'hsl(var(--luxury-gold-light))',
					'gold-dark': 'hsl(var(--luxury-gold-dark))',
				},
				natural: {
					green: 'hsl(var(--natural-green))',
					'green-light': 'hsl(var(--natural-green-light))',
					'green-dark': 'hsl(var(--natural-green-dark))',
				},
				beige: {
					light: 'hsl(var(--beige-light))',
					DEFAULT: 'hsl(var(--beige))',
					dark: 'hsl(var(--beige-dark))',
				}
			},
			backgroundImage: {
				'luxury-gradient': 'linear-gradient(135deg, var(--luxury-gold-light), var(--luxury-gold))',
				'natural-gradient': 'linear-gradient(135deg, var(--natural-green-light), var(--natural-green))',
				'hero-gradient': 'linear-gradient(135deg, var(--cream-50), var(--beige-light))',
			},
			fontFamily: {
				'luxury': ['Playfair Display', 'serif'],
				'modern': ['Inter', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'shimmer': {
					'0%': {
						'background-position': '-200% 0'
					},
					'100%': {
						'background-position': '200% 0'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'shimmer': 'shimmer 2s linear infinite',
				'float': 'float 3s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
