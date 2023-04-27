const request = require('supertest');
const app = require('../src/app');
const { Activity } = require('../src/db');
const Sequelize = require('sequelize');
const { Mock } = require('sequelize-mock')
const {
    DB_USER, DB_PASSWORD, DB_HOST,
  } = process.env;

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});


jest.mock('../src/db', () => {
    
    const dbMock = Mock();

  return {
    Activity: dbMock,
    sequelize: dbMock
  };
});

describe('GET /activity', () => {
  test('responds with all activities', async () => {
    const expectedResponse = [      { name: 'activity1', difficulty: '1' },      { name: 'activity2', difficulty: '2' },      { name: 'activity3', difficulty: '3' }    ];

    Activity.findAll.mockResolvedValue(expectedResponse);

    const response = await request(app).get('/activity');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });

  test('responds with 500 and error message when there is an error', async () => {
    const expectedError = { message: 'Database error' };

    Activity.findAll.mockRejectedValue(expectedError);

    const response = await request(app).get('/activity');

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ error: expectedError.message });
  });
});
