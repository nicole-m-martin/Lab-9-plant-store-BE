const pool = require('../utils/pool');

module.exports = class Plant {
  id;
  plant_name;
  size;
  color;

  constructor(row) {
    this.id = row.id;
    this.plantName = row.plant_name;
    this.size = row.size;
    this.color = row.color;
  }

  static async insert({ plantName, size, color }) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO plants (plant_name, size, color) VALUES ($1, $2, #3) RETURNING *',
      [plantName, size, color]
    );

    return new Plant(rows[0]);
  }
};
