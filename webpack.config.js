const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { execSync } = require('child_process'); // Ejecuta scripts en el sistema
module.exports = {
    entry: {
        main: './assets/js/main.js',
        admin: './assets/js/editor.js',
        style: './assets/sass/main.scss',
        editor: './assets/sass/editor.scss',
        blocks: './assets/sass/block-styles.scss'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        clean: true // Limpia la carpeta build en cada compilación
    },
    module: {
        rules: [
            // Sass loader
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // Extrae CSS a archivos separados
                    'css-loader',               // Traduce CSS a módulos CommonJS
                    'postcss-loader',           // Aplica postcss (incluyendo autoprefixer)
                    {
                        loader: 'sass-loader',  // Compila Sass a CSS
                        options: {
                            sassOptions: {
                                includePaths: [path.resolve(__dirname, 'assets/sass')]
                            }
                        }
                    }
                    
                ]
            },
            // File loader for fonts and icons
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
            // Babel loader for JavaScript (optional, for ES6+ support)
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.svg$/,
                type: 'asset/resource', // Convierte los SVG en base64 para incluirlos en CSS
                generator: {
                    filename: 'icons/[name][ext]' // Coloca los SVG en build/icons/
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    mode: 'development', // Cambia a 'production' para compilar para producción
    watch: true // Observa cambios en los archivos
    
};
