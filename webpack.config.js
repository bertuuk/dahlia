const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './assets/js/main.js',
        style: './assets/sass/main.scss',
        editor: './assets/sass/editor.scss'
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
                    'sass-loader'               // Compila Sass a CSS
                ]
            },
            // File loader for fonts and icons
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
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
