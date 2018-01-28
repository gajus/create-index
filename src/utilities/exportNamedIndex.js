export default (variableName, fileName) => {
  return 'export { default as ' + variableName + ' } from \'./' + fileName + '\';';
};
