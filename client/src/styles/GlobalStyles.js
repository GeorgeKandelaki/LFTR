import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        &, &.light-mode{

        }

        &.dark-mode {
            /* Core Backgrounds */
            --color-neutral-1000: #0a0e14; /* Deepest black/blue for background shadows */
            --color-neutral-900:  #0f172a; /* Main Page Background (Navy Charcoal) */
            --color-neutral-800:  #1e293b; /* Sidebar and Header background */
            --color-neutral-700:  #1e293b; /* Primary Card surface */
            --color-neutral-600:  #334155; /* Secondary Card surface / Hover states */

            /* Borders & Dividers */
            --color-border-subtle: #1e293b; 
            --color-border-strong: #334155; 

            /* Typography & Content */
            --color-text-primary:   #f8fafc; /* Headings and key titles */
            --color-text-secondary: #94a3b8; /* Subtext, labels, and descriptions */
            --color-text-muted:     #64748b; /* Placeholders and disabled states */

            /* The Primary Glow */
            --color-accent-600: #2563eb; /* Deep Blue (Used in some button gradients) */
            --color-accent-500: #3b82f6; /* Primary Button / Action color */
            --color-accent-400: #60a5fa; /* Active icons / Consistency markers */
            --color-accent-300: #93c5fd; /* Subtle highlights / Focus states */

            /* The Cyan Glow (Specifically seen in 'Start' and Progress) */
            --color-cyan-500:   #06b6d4; /* Vibrant Cyan for 'Start' buttons & Badges */
            --color-cyan-400:   #22d3ee; /* Progress bar highlights */

            /* Success (Greenish-Cyan) */
            --color-success: #10b981; /* Completion checkmarks and status badges */

            /* Error / Danger */
            --color-error-bg: #1e1b1b; /* Dark red background for danger zones */
            --color-error-500: #ef4444; /* 'Delete My Data' button and error text */

            /* Warning / Streak */
            --color-warning: #f59e0b; /* Amber for 'Current Streak' flame icon */

            --main-background: var(--color-neutral-900 );
            --Workout-cards: var(--color-neutral-700 );
            --primary-Button-blue: var(--color-accent-500 );
            --primary-Button-cyan: var(--color-cyan-500 );
            --consistency-grid-dots: var(--color-accent-400);
            --inactive-upcoming-states: var(--color-neutral-600);
        }
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;

        /* Creating animations for dark mode */
        transition: background-color 0.3s, border 0.3s;
    }

    html {
        font-size: 62.5%;
    }

    body {
        font-family: "Poppins", sans-serif;
        /* color: var(--color-grey-700); */
        /* background-color: var(--color-grey-50); */


        transition: color 0.3s, background-color 0.3s;
        min-height: 100vh;
        line-height: 1.5;
        font-size: 1.6rem;
    }

    input,
    button,
    textarea,
    select {
        font: inherit;
        color: inherit;
    }

    button {
        cursor: pointer;
    }

    *:disabled {
        cursor: not-allowed;
    }

    select:disabled,
    input:disabled {
        /* background-color: var(--color-grey-200); */
        /* color: var(--color-grey-500); */
    }

    input:focus,
    button:focus,
    textarea:focus,
    select:focus {
        /* outline: 2px solid var(--color-brand-600); */
        outline-offset: -1px;
    }

    button:has(svg) {
        line-height: 0;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    ul {
        list-style: none;
    }

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        overflow-wrap: break-word;
        hyphens: auto;
    }

    img {
        max-width: 100%;
        
    }

    @media screen and (max-width: 78em) {
        html {
            font-size: 50%;
        }
    }


`;

export default GlobalStyles;
