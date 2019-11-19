/**
 * 自定义服务器端渲染模版
 * 可以通过该模版改写首屏的 DOM 结构
 * @param {object} options 传入参数
 * @param {object} options.head helmet 对象，里面包含 title, meta, link, style, script, noscript 等
 * @param {string} options.cssTags webpack 编译输出的 css 标签字符串
 * @param {string} options.jsTags webpack 编译输出的 css 标签字符串
 * @param {string} options.markup 服务器端渲染生成的 DOM 字符串
 * @param {string} options.state 服务器端渲染生成的 state 字符串
 * @return {string} 首屏 HTML
 */

export default ({
  head = {},
  markup = '',
  state = '{}',
  styleTags = '',
  scriptTags = ''
}) => {
  const print = (key) => {
    if (head[key] && typeof head[key].toString === 'function') {
      return head[key].toString();
    }
    return '';
  };

  return `<!doctype html>
  <html ${print('htmlAttributes')}>
  <head>
    <meta charset="utf-8" />
    ${print('title') + print('meta') + print('link') + process.env.HEADER_STYLES + print('style') + print('script') + styleTags}
  </head>
  <body ${print('bodyAttributes')}>
    <h1>with-custom-document</h1>
    <div id="root">${markup}</div>
    <script>window.INITIAL_STATE=${state};</script>${scriptTags}
  </body>
  </html>`;
};
