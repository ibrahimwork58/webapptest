import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark' | 'system';

// Get initial theme from localStorage or default to 'system'
const getInitialTheme = (): Theme => {
    if (!browser) return 'system';
    const stored = localStorage.getItem('theme') as Theme;
    return stored || 'system';
};

// Get the effective theme (resolving 'system' to actual theme)
const getEffectiveTheme = (theme: Theme): 'light' | 'dark' => {
    if (theme === 'system') {
        if (!browser) return 'light';
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
};

// Create the theme store
const createThemeStore = () => {
    const { subscribe, set, update } = writable<Theme>(getInitialTheme());

    return {
        subscribe,
        set: (value: Theme) => {
            if (browser) {
                localStorage.setItem('theme', value);
                const effectiveTheme = getEffectiveTheme(value);

                // Update document class
                if (effectiveTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
            set(value);
        },
        toggle: () => {
            update((current) => {
                const next = current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light';
                if (browser) {
                    localStorage.setItem('theme', next);
                    const effectiveTheme = getEffectiveTheme(next);

                    if (effectiveTheme === 'dark') {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                }
                return next;
            });
        },
        init: () => {
            if (browser) {
                const theme = getInitialTheme();
                const effectiveTheme = getEffectiveTheme(theme);

                if (effectiveTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }

                // Listen for system theme changes
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                mediaQuery.addEventListener('change', (e) => {
                    update((current) => {
                        if (current === 'system') {
                            if (e.matches) {
                                document.documentElement.classList.add('dark');
                            } else {
                                document.documentElement.classList.remove('dark');
                            }
                        }
                        return current;
                    });
                });
            }
        }
    };
};

export const theme = createThemeStore();
