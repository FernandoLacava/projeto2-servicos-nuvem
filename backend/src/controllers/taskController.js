const pool = require('../config/db');

exports.create = async (req, res, next) => {
  try {
    const { title, description, status, priority } = req.body;
    if (!title) return res.status(400).json({ error: 'title e obrigatorio' });
    const result = await pool.query(
      'INSERT INTO tasks (title, description, status, priority) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description || '', status || 'pendente', priority || 'media']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { next(err); }
};

exports.findAll = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) { next(err); }
};

exports.findOne = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE id=$1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Nao encontrada' });
    res.json(result.rows[0]);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const { title, description, status, priority } = req.body;
    const result = await pool.query(
      'UPDATE tasks SET title=COALESCE($1,title), description=COALESCE($2,description), status=COALESCE($3,status), priority=COALESCE($4,priority) WHERE id=$5 RETURNING *',
      [title, description, status, priority, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Nao encontrada' });
    res.json(result.rows[0]);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id=$1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Nao encontrada' });
    res.json({ message: 'Removida', task: result.rows[0] });
  } catch (err) { next(err); }
};

exports.setup = async (req, res, next) => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      description TEXT,
      status VARCHAR(20) NOT NULL DEFAULT 'pendente',
      priority VARCHAR(10) NOT NULL DEFAULT 'media',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    const count = await pool.query('SELECT COUNT(*) FROM tasks');
    if (parseInt(count.rows[0].count) === 0) {
      await pool.query(
        'INSERT INTO tasks (title, description, status, priority) VALUES ($1,$2,$3,$4),($5,$6,$7,$8),($9,$10,$11,$12),($13,$14,$15,$16),($17,$18,$19,$20)',
        ['Estudar AWS','Revisar VPC e RDS','pendente','alta','Comprar mercado','Arroz feijao','concluida','baixa','Entregar projeto','Faculdade','pendente','alta','Pagar internet','Vence dia 20','pendente','media','Exercicios','Caminhada 30min','concluida','media']
      );
    }
    res.json({ message: 'Banco inicializado com sucesso!' });
  } catch (err) { next(err); }
};