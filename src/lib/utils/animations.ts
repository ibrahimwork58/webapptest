import { animate, stagger } from 'motion';

export const animations = {
    // Fade in animation
    fadeIn: (element: HTMLElement, delay = 0) => {
        return animate(
            element,
            { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] },
            { duration: 0.5, delay, easing: [0.4, 0, 0.2, 1] }
        );
    },

    // Staggered list animation
    staggerList: (elements: NodeListOf<HTMLElement> | HTMLElement[]) => {
        return animate(
            elements,
            { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] },
            { duration: 0.4, delay: stagger(0.05), easing: [0.4, 0, 0.2, 1] }
        );
    },

    // Scale in animation
    scaleIn: (element: HTMLElement, delay = 0) => {
        return animate(
            element,
            { opacity: [0, 1], transform: ['scale(0.9)', 'scale(1)'] },
            { duration: 0.3, delay, easing: [0.4, 0, 0.2, 1] }
        );
    },

    // Slide in from bottom
    slideInBottom: (element: HTMLElement, delay = 0) => {
        return animate(
            element,
            { transform: ['translateY(100%)', 'translateY(0)'] },
            { duration: 0.4, delay, easing: [0.4, 0, 0.2, 1] }
        );
    },

    // Page transition
    pageTransition: {
        in: (element: HTMLElement) => {
            return animate(
                element,
                { opacity: [0, 1], transform: ['translateX(20px)', 'translateX(0)'] },
                { duration: 0.3, easing: [0.4, 0, 0.2, 1] }
            );
        },
        out: (element: HTMLElement) => {
            return animate(
                element,
                { opacity: [1, 0], transform: ['translateX(0)', 'translateX(-20px)'] },
                { duration: 0.2, easing: [0.4, 0, 0.2, 1] }
            );
        }
    }
};
