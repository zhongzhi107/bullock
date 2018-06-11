/* eslint react/no-danger: 0 */
import { existsSync } from 'fs';
import { resolve } from 'path';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import Routes from '../Routes';

export default class Html extends Component {
  static propTypes = {
    ctx: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  render() {
    const { ctx, context, store } = this.props;

    const IS_DEV = process.env.NODE_ENV === 'local';
    const getWebpackStats = () => {
      const assetManifest = resolve('dist/webpack-stats.json');
      if (IS_DEV) {
        return ctx.state.webpackStats.toJson();
      } else if (existsSync(assetManifest)) {
        return require(assetManifest); // eslint-disable-line
      }
      throw new Error(`找不到文件：${assetManifest}，请先运行 \`npm run build\``);
    };
    const { publicPath, chunks } = getWebpackStats();
    // 获取初始化网页需要插入的 CSS/JS 静态文件
    const initialAssets = chunks
      .filter(item => item.initial)
      .reduce((accumulator, item) => {
        accumulator = accumulator.concat(item.files);
        return accumulator;
      }, []);

    const renderTags = (extension, assets) => {
      const getTagByFilename = filename => (filename.endsWith('js') ?
        <script src={publicPath + filename} key={filename} /> :
        <link rel="stylesheet" href={publicPath + filename} key={filename} />);

      return assets
        .filter(item => !/\.hot-update\./.test(item)) // 过滤掉 HMR 包
        .filter(item => item.endsWith(extension))
        .map(item => getTagByFilename(item));
    };

    const Root = (
      <Provider store={store}>
        <StaticRouter location={ctx.path} context={context}>
          {renderRoutes(Routes)}
        </StaticRouter>
      </Provider>
    );
    const jsTags = renderTags('js', initialAssets);
    const cssTags = renderTags('css', initialAssets);
    const content = renderToString(Root);
    const helmet = Helmet.renderStatic();

    return (
      <html lang="zh-CN">
        <head>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {cssTags}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          <script dangerouslySetInnerHTML={{ __html: `window.INITIAL_STATE=${serialize(store.getState())};` }} charSet="UTF-8" />
          {jsTags}
        </body>
      </html>
    );
  }
}
