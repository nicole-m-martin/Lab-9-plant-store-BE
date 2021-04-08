const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Plant = require('../lib/models/Plant');
const Pot = require('../lib/models/Pot');
const { response } = require('../lib/app');

describe('PLANTS Routes', () => {
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

  beforeEach(async () => {
    pot = await Pot.insert({
      id: '1',
      size: 'large',
      color: 'black',
      kind: 'matte',
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

describe('POTS Routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(async () => {
    pot = await Pot.insert({
      id: '1',
      size: 'large',
      color: 'black',
      kind: 'matte',
    });
  });

  it('POST ROUTE to add a pot to the list', async () => {
    const response = await request(app)
      .post('/api/v1/pots')
      .send({ size: 'large', color: 'black', kind: 'matte' });

    expect(response.body).toEqual({
      id: '2',
      size: 'large',
      color: 'black',
      kind: 'matte',
    });
  });

  it('GET ROUTE for pots', async () => {
    const res = await request(app).get('/api/v1/pots');

    expect(res.body).toEqual([
      {
        id: '1',
        size: 'large',
        color: 'black',
        kind: 'matte',
      },
    ]);
  });

  it('GET BY ID pot by its id', async () => {
    const res = await request(app).get('/api/v1/pots/1');

    expect(res.body).toEqual({
      id: '1',
      size: 'large',
      color: 'black',
      kind: 'matte',
    });
  });

  it('PUT/UPDATE pot by its :id', async () => {
    const res = await request(app).put('/api/v1/pots/1').send({
      id: '1',
      size: 'large',
      color: 'black',
      kind: 'matte',
    });

    expect(res.body).toEqual({
      id: '1',
      size: 'large',
      color: 'black',
      kind: 'matte',
    });
  });

  it('DELETE pot by its :id', async () => {
    const res = await request(app).delete('/api/v1/pots/1');
    expect(res.body).toEqual({
      id: '1',
      size: 'large',
      color: 'black',
      kind: 'matte',
    });
  });
});
