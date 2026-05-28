export const handler = async (event) => {
  const BACKEND_URL = process.env.BACKEND_URL;

  try {
    const response = await fetch(`${BACKEND_URL}/api/tasks`);
    if (!response.ok) throw new Error(`Backend retornou ${response.status}`);
    const tasks = await response.json();

    const total = tasks.length;
    const concluidas = tasks.filter(t => t.status === 'concluida').length;
    const pendentes = tasks.filter(t => t.status === 'pendente').length;
    const porPrioridade = {
      alta: tasks.filter(t => t.priority === 'alta').length,
      media: tasks.filter(t => t.priority === 'media').length,
      baixa: tasks.filter(t => t.priority === 'baixa').length,
    };
    const percentualConcluido = total > 0 ? ((concluidas / total) * 100).toFixed(2) + '%' : '0%';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ geradoEm: new Date().toISOString(), total, concluidas, pendentes, percentualConcluido, porPrioridade })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Falha ao gerar relatorio', detail: err.message })
    };
  }
};