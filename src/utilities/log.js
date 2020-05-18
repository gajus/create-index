import chalk from 'chalk';
import moment from 'moment';

export default (...append) => {
  // eslint-disable-next-line no-console
  console.log(chalk.dim('[' + moment().format('HH:mm:ss') + ']'), ...append);
};
