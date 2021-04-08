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

  beforeEach(async () => {
    plant = await Plant.insert({
      id: '1',
      plantName: 'hosta',
      size: 'medium',
      color: 'green and white',
    });
  });

  it('POST ROUTE to add a plant to the list', async () => {
    const response = await request(app)
      .post('/api/v1/plants')
      .send({ plantName: 'hosta', size: 'medium', color: 'green and white' });

    expect(response.body).toEqual({
      id: '2',
      plantName: 'hosta',
      size: 'medium',
      color: 'green and white',
    });
  });

  it('GET ROUTE for plants', async () => {
    const res = await request(app).get('/api/v1/plants');

    expect(res.body).toEqual([
      {
        id: '1',
        plantName: 'hosta',
        size: 'medium',
        color: 'green and white',
      },
    ]);
  });

  it('GET BY ID plant by its id', async () => {
    const res = await request(app).get('/api/v1/plants/1');

    expect(res.body).toEqual({
      id: '1',
      plantName: 'hosta',
      size: 'medium',
      color: 'green and white',
    });
  });

  it('PUT/UPDATE plant by its :id', async () => {
    const res = await request(app).put('/api/v1/plants/1').send({
      id: '1',
      plant_name: 'hosta',
      size: 'large',
      color: 'green and white',
    });

    expect(res.body).toEqual({
      id: '1',
      plantName: 'hosta',
      size: 'large',
      color: 'green and white',
    });
  });

  it('DELETE plant by its :id', async () => {
    const res = await request(app).delete('/api/v1/plants/1');
    expect(res.body).toEqual({
      id: '1',
      plantName: 'hosta',
      size: 'medium',
      color: 'green and white',
    });
  });
});
