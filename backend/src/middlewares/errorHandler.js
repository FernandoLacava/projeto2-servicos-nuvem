module.exports = (err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({ error: 'Erro interno', detail: err.message });
};
