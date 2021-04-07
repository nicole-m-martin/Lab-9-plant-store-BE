const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Plant = require('../lib/models/Plant');

describe('Plant-Store Routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET ROUTE for a list of plants', async () => {
    const plants = await Promise.all([
      Plant.insert({
        plantName: 'hosta',
        size: 'medium',
        color: 'green and white',
      }),
      Plant.insert({
        plantName: 'snake',
        size: 'small',
        color: 'bright green',
      }),
      Plant.insert({
        plantName: 'rose',
        size: 'medium',
        color: 'red',
      }),
    ]);

    return request(app)
      .get('api/v1/plants')
      .then((res) => {
        expect(res.body).toEqual(expect.arrayContaining(plants));
      });
  });
});
