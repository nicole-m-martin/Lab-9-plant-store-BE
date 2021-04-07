const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Plant = require('../lib/models/Plant');
const { response } = require('../lib/app');

describe('Plant-Store Routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST ROUTE to add a plant to the list', async () => {
    const response = await request(app)
      .post('/api/v1/plants')
      .send({ plant_name: 'hosta', size: 'medium', color: 'green and white' });

    expect(response.body).toEqual({
      id: '1',
      plantName: 'hosta',
      size: 'medium',
      color: 'green and white',
    });
  });

  it.skip('GET ROUTE for a list of plants', async () => {
    const plants = await Promise.all([
      Plant.insert({
        plant_name: 'hosta',
        size: 'medium',
        color: 'green and white',
      }),
    ]);

    return request(app)
      .get('/api/v1/plants')
      .then((res) => {
        expect(res.body).toEqual(expect.arrayContaining(plants));
      });
  });
});
