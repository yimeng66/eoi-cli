import chalk from 'chalk';
import { program } from 'commander';

import { version } from '../package.json';
import { create } from './commands';

program
  .version(chalk.green(`v${version}`), '-v, --version')
  .usage('<command> [options]');

function registerCommand() {
  program
    .command('create')
    .description('create new project')
    .action(() => {
      create();
    });
}

registerCommand();

program.parse();
