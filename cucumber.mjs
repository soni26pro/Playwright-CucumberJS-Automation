const getWorldParams = () => {
  const params = {
    foo: 'bar',
  };

  return params;
};

const config = {
  requireModule: ['ts-node/register'],
  require: ['src/**/*.ts'],
  format: [
    'json:reports/cucumber-report.json',
    `html:reports/${process.env.ENV}.html`,
    'progress-bar',
  ],
  formatOptions: { snippetInterface: 'async-await' },
  worldParameters: getWorldParams(),
};
export default config;
