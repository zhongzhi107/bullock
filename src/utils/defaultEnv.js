export default {
  // 本地开发 web server 主机名
  DACE_HOST: 'localhost',

  // 本地开发 web server 端口
  DACE_PORT: '3000',

  // 编译产物对外服务访问使用的 URL
  DACE_PUBLIC_PATH: '/',

  // API 接口地址 BaseURL，建议配置在 profiles 中
  // 仅在 dace-plugin-redux 中使用
  DACE_API_BASE_URL: 'http://localhost:3002',

  // 页面切换后是否自动滚动到页面顶部
  DACE_SCROLL_TO_TOP: true,

  // 路由默认使用的首页文件名称
  DACE_INDEX: 'index',

  // 禁用服务器端渲染
  DACE_NO_SSR: false,

  // URL 转发规则
  DACE_PROXY: '',

  // 以 `DACE_PATH_` 开头的变量会转换成绝对路径
  // 工程根目录
  // appRoot: '.',
  DACE_PATH_ROOT: '.',

  // babel 配置文件位置
  // appBabelRc: '.babelrc',
  DACE_PATH_BABEL_RC: '.babelrc',

  // eslint 配置文件位置
  // appEslintRc: '.eslintrc.js',
  DACE_PATH_ESLINT_RC: '.eslintrc.js',

  // postcss 配置文件位置
  // appPostcssRc: 'postcss.config.js',
  DACE_PATH_POSTCSS_RC: 'postcss.config.js',

  // profiles 目录位置
  // appProfiles: 'profiles',
  DACE_PATH_PROFILES: 'profiles',

  // src 目录位置
  // appSrc: 'src',
  DACE_PATH_SRC: 'src',

  // pages 目录位置
  // appPages: 'src/pages',
  DACE_PATH_PAGES: 'src/pages',

  // 服务器端编译入口文件位置
  // appServerIndexJs: 'src/server.js',
  DACE_PATH_SERVER_ENTRY: 'src/server.js',

  // 浏览器端编译入口文件位置
  // appClientIndexJs: 'src/client.js',
  DACE_PATH_CLIENT_ENTRY: 'src/client.js',

  // node_modules 目录位置
  // appNodeModules: 'node_modules',
  DACE_PATH_NODE_MODULES: 'node_modules',

  // 浏览器端编译产物输出目录位置
  // appClientBuild: 'prd',
  DACE_PATH_CLIENT_DIST: 'prd',

  // 服务器端编译产物输出目录位置
  // appServerBuild: 'dist',
  DACE_PATH_SERVER_DIST: 'dist',

  // 浏览器端编译输出的版本文件位置
  // appStatsJson: 'prd/webpack-stats.json'
  DACE_PATH_STATS_JSON: 'prd/webpack-stats.json',

  // 创建 axios 实例的文件路径
  DACE_PATH_PLUGIN_REDUX_AXIOS_INSTANCE: ''
};