import chalk from 'chalk';
import moment from 'moment';

export default (...append) => {
    /* eslint-disable no-console */
    console.log(chalk.dim('[' + moment().format('HH:mm:ss') + ']'), ...append);
    /* eslint-enable no-console */
};
