import path from 'path';
import { fileURLToPath } from 'url'; // Necessário para substituir __dirname
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Correção para __dirname em ES Modules ("type": "module")
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
    // Carrega variáveis baseadas no modo (development/production)
    const env = loadEnv(mode, process.cwd(), '');

    return {
        // 1. CORREÇÃO DO 404: O nome do repositório deve estar aqui, entre barras.
        base: '/gestor-de-procedimentos-esteticos/',

        server: {
            port: 3000,
            host: '0.0.0.0',
        },
        plugins: [react()],

        // ATENÇÃO: Isso expõe sua chave no código final. Cuidado.
        define: {
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        },

        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'), // Recomendado apontar para ./src, não raiz
            }
        }
    };
});