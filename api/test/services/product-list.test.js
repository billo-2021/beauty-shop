const app = require('../../src/app');

describe('\'product-list\' service', () => {
  it('registered the service', () => {
    const service = app.service('product-list');
    expect(service).toBeTruthy();
  });
});
