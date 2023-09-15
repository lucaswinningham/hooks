import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { type Configuration } from 'webpack';
import { type Configuration as DevServerConfiguration  } from 'webpack-dev-server';

const devServer: DevServerConfiguration = {
  port: '9500',
  static: ['./public'],
  open: true,
  hot: true,
  liveReload: true,
};

const config: Configuration = {
  mode: 'development', 
  entry: './index.tsx', 
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js'
  },
  target: 'web',
  devServer,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
  ],
};

export default config;
