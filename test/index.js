/**
 * 测试用例入口
 * 确保测试用例串行运行，防止并行运行导致 3000 端口号冲突
 *
 * @param {process.env} EXAMPLE 实例名称，只跑指定的这个实例
 * @param {process.env} DEBUG 启动调试输出
 * @param {process.env} TRAVIS 是否为 travis 运行环境
 * @param {process.env} TAG 使用指定的 dace@TAG 版本运行测试用例
 */
const cp = require('child_process');
const chalk = require('chalk');
const glob = require('glob');
const path = require('path');

const startTime = Date.now();
const { EXAMPLE = '*', FROM = 1 } = process.env;

const files = glob.sync(`${EXAMPLE}.js`, { cwd: `${__dirname}/cases` });
files.sort((a, b) => path.dirname(a) > path.dirname(b));

const errors = [];
files.forEach((file, i) => {
  if (i + 1 >= FROM) {
    const cmd = `node_modules/.bin/mocha test/cases/${file}`;
    const title = `[${i + 1}/${files.length}] ${cmd}`;
    console.log(chalk.yellow(title));
    try {
      const stdout = cp.execSync(cmd, { encoding: 'utf-8' });
      if (stdout.includes('expected false to be true')) {
        errors.push(title);
        console.log(chalk.red(stdout));
      } else {
        console.log(stdout);
      }
    } catch (e) {
      errors.push(title);
      console.log(chalk.red(e.stdout));
    }
  }
});

const output = [chalk.cyan('[DONE]'), ''];

if (errors.length === 0) {
  const useTime = parseInt((Date.now() - startTime) / 1000, 10);
  output.push(chalk.cyan(`  All cases passing (${useTime}s)`));
  output.push('');
  console.log(output.join('\n'));
} else {
  output.push(`  ${files.length - errors.length} passing`);
  output.push(chalk.red(`  ${errors.length} failing`));
  errors.forEach(title => output.push(chalk.red(`    - ${title}`)));
  console.log(output.join('\n'));
  process.exit(1);
}
