import { createServer } from 'vite';

const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
});

export default vite;