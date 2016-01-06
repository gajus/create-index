import _ from 'lodash';

export default (paths) => {
    return _.sortBy(paths, (path) => {
        return -path.split('/').length;
    });
};
