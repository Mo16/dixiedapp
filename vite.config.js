import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePluginFonts } from 'vite-plugin-fonts'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        [react()],
        VitePluginFonts({
            google: [
                {
                    family: "Love Ya Like A Sister",
                    styles: "display=swap",
                },
            ],
        }),
    ],
});
