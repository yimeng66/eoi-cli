import { program } from 'commander';

import { version } from '../package.json';

async function getChalk() {
  return (await import('chalk')).default;
}

getChalk().then((chalk) => {
  program
    .version(chalk.green(`v${version}`), '-v, --version')
    .usage('<command> [options]');

  function registerCommand() {
    program.command('create').description('create new project');
  }

  registerCommand();
});
