const pool = require('../utils/pool');
const express = require('express');

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

  static async insert(plant) {
    const {
      rows,
    } = await pool.query(
      `INSERT INTO plants (plant_name, size, color) VALUES ($1, $2, $3) RETURNING *`,
      [plant.plantName, plant.size, plant.color]
    );

    return new Plant(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(`SELECT * FROM plants`);
    return rows.map((row) => new Plant(row));
  }

  static async getId(id) {
    const { rows } = await pool.query(`SELECT * FROM plants WHERE id=$1`, [id]);
    return new Plant(rows[0]);
  }

  static async update(id, plant) {
    const { rows } = await pool.query(
      `UPDATE plants SET plant_name=$1, size=$2, color=$3 WHERE id=$4 RETURNING *`,

      [plant.plant_name, plant.size, plant.color, id]
    );
    return new Plant(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM plants WHERE id=$1 RETURNING *',

      [id]
    );
    return new Plant(rows[0]);
  }
};
