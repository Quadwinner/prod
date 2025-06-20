import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Polyfill for __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
    // Default to secure=false if VITE_SECURE is not set
    const isSecure = process.env.VITE_SECURE === 'true';
    
    let httpsConfig = {};
    
    // Set up HTTPS if enabled
    if (isSecure) {
        console.log('HTTPS is enabled for Vite development server');
        // Use self-signed certs if available
        const certPath = path.resolve(__dirname, './certs');
        if (fs.existsSync(path.join(certPath, 'cert.pem')) && 
            fs.existsSync(path.join(certPath, 'key.pem'))) {
            httpsConfig = {
                cert: fs.readFileSync(path.join(certPath, 'cert.pem')),
                key: fs.readFileSync(path.join(certPath, 'key.pem'))
            };
        }
    }
    
    return {
        plugins: [
            react()
        ],
        root: '.',
        base: '',
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './resources/js'),
                '@pages': path.resolve(__dirname, './resources/js/Pages'),
                '@components': path.resolve(__dirname, './resources/js/Components'),
                '@src': path.resolve(__dirname, './src')
            }
        },
        build: {
            outDir: 'dist',
            emptyOutDir: true,
            manifest: true,
            rollupOptions: {
                input: {
                    main: path.resolve(__dirname, 'index.html')
                },
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return 'vendor';
                        }
                    }
                }
            }
        },
        optimizeDeps: {
            include: ['react', 'react-dom', 'react-router-dom']
        },
        server: {
            hmr: {
                host: 'localhost',
                protocol: isSecure ? 'wss' : 'ws',
                clientPort: 5173
            },
            host: true,
            port: 5173,
            https: isSecure ? httpsConfig : false,
            watch: {
                usePolling: true,
            },
            cors: true,
            historyApiFallback: true,
            proxy: {
                '/api': {
                    target: process.env.VITE_API_URL || 'http://localhost:5005',
                    changeOrigin: true,
                    secure: false,
                    ws: true,
                    configure: (proxy, _options) => {
                        proxy.on('error', (err, _req, _res) => {
                            console.log('proxy error', err);
                        });
                        proxy.on('proxyReq', (proxyReq, req, _res) => {
                            console.log('Sending Request to the Target:', req.method, req.url);
                        });
                        proxy.on('proxyRes', (proxyRes, req, _res) => {
                            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
                        });
                    }
                }
            }
        }
    };
});
