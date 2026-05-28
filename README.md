# Cloud Tasks - Projeto de Servicos em Nuvem (AWS Academy)

Projeto academico que demonstra arquitetura distribuida na AWS com CRUD, containers, Lambda e banco privado.

## Arquitetura

Usuario -> Frontend (ECS Fargate) -> API Gateway -> Backend (ECS Fargate) -> RDS PostgreSQL (privado)
Usuario -> API Gateway -> Lambda /report -> Backend HTTP -> JSON de estatisticas

## Tecnologias

- Node.js 20 + Express
- PostgreSQL 16 (RDS)
- Docker
- AWS: ECS Fargate, ECR, RDS, Lambda, API Gateway, CloudWatch, VPC

## Executar local

docker compose up --build

- Backend: http://localhost:3000
- Frontend: http://localhost:8080

## Deploy AWS

- Frontend: http://35.153.51.11
- API Gateway: https://m9aj7fdwvf.execute-api.us-east-1.amazonaws.com

## Endpoints

| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | /api/tasks | Lista todas |
| GET | /api/tasks/{id} | Busca uma |
| POST | /api/tasks | Cria |
| PUT | /api/tasks/{id} | Atualiza |
| DELETE | /api/tasks/{id} | Remove |
| GET | /report | Estatisticas (Lambda) |

## Integrantes

- Matheus Fernandes - RA: 10435788
- Fernando Lacava - RA: 10438026
- Joao Trevisol - RA: 10277893