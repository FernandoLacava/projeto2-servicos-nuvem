const API_URL = "https://m9aj7fdwvf.execute-api.us-east-1.amazonaws.com";

async function loadTasks() {
  const res = await fetch(`${API_URL}/api/tasks`);
  const tasks = await res.json();
  const tbody = document.querySelector("#tasks-table tbody");
  tbody.innerHTML = "";
  tasks.forEach(t => {
    tbody.innerHTML += `<tr>
      <td>${t.id}</td>
      <td>${t.title}</td>
      <td>${t.status}</td>
      <td>${t.priority}</td>
      <td>
        <button onclick="toggleStatus(${t.id}, '${t.status}')">Alternar</button>
        <button onclick="deleteTask(${t.id})">Excluir</button>
      </td>
    </tr>`;
  });
}

async function createTask() {
  const body = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    priority: document.getElementById("priority").value,
    status: document.getElementById("status").value
  };
  if (!body.title) { alert("Titulo obrigatorio"); return; }
  await fetch(`${API_URL}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  loadTasks();
}

async function deleteTask(id) {
  if (!confirm("Excluir?")) return;
  await fetch(`${API_URL}/api/tasks/${id}`, { method: "DELETE" });
  loadTasks();
}

async function toggleStatus(id, currentStatus) {
  const newStatus = currentStatus === "pendente" ? "concluida" : "pendente";
  await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus })
  });
  loadTasks();
}

async function loadReport() {
  const res = await fetch(`${API_URL}/report`);
  const data = await res.json();
  document.getElementById("report-output").textContent = JSON.stringify(data, null, 2);
}

loadTasks();