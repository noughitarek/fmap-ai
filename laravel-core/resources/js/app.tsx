import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InertiaProgress } from '@inertiajs/progress';


createInertiaApp({
    title: (title) => `${title} - FMAP`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<>
            <ToastContainer />
            <App {...props} />
        </>);
    },
    progress: {
        color: '#4B5563',
    },
});

InertiaProgress.init();