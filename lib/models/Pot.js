const pool = require('../utils/pool');
const express = require('express');

module.exports = class Pot {
  id;
  size;
  color;
  kind;

  constructor(row) {
    this.id = row.id;
    this.size = row.size;
    this.color = row.color;
    this.kind = row.kind;
  }

  static async insert(pot) {
    const {
      rows,
    } = await pool.query(
      `INSERT INTO pots (size, color, kind) VALUES ($1, $2, $3) RETURNING *`,
      [pot.size, pot.color, pot.kind]
    );

    return new Pot(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(`SELECT * FROM pots`);
    return rows.map((row) => new Pot(row));
  }

  static async getId(id) {
    const { rows } = await pool.query(`SELECT * FROM pots WHERE id=$1`, [id]);
    return new Pot(rows[0]);
  }

  static async update(id, pot) {
    const { rows } = await pool.query(
      `UPDATE pots SET size=$1, color=$2, kind=$3 WHERE id=$4 RETURNING *`,

      [pot.size, pot.color, pot.kind, id]
    );
    return new Pot(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM pots WHERE id=$1 RETURNING *',

      [id]
    );
    return new Pot(rows[0]);
  }
};
