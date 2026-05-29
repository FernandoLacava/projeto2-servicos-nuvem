# Infraestrutura AWS - Projeto 2 Servicos em Nuvem

## Regiao
us-east-1 (N. Virginia)

## VPC
- VPC ID: vpc-01ee64a7bbddc4158 (Default VPC)

## Security Groups

| Nome | ID | Porta | Origem |
|------|----|-------|--------|
| backend-sg | sg-076298c6e19988920 | 3000 | 0.0.0.0/0 |
| rds-sg | sg-01204ca545ef42489 | 5432 | sg-076298c6e19988920 |
| frontend-sg | sg-0d7aa9b9cafb647bb | 80 | 0.0.0.0/0 |

## RDS PostgreSQL
- Identificador: tasks-db
- Engine: PostgreSQL 16.6
- Instancia: db.t3.micro
- Storage: 20 GB
- Endpoint: tasks-db.chik60kca7ki.us-east-1.rds.amazonaws.com
- Porta: 5432
- Banco: tasksdb
- Acesso publico: NAO
- Security Group: rds-sg

## ECR Repositorios
- 645994717126.dkr.ecr.us-east-1.amazonaws.com/tasks-backend
- 645994717126.dkr.ecr.us-east-1.amazonaws.com/tasks-frontend

## ECS Fargate
- Cluster: cloud-tasks-cluster
- Backend Service: tasks-backend-service (tasks-backend-task:1) - 0.5 vCPU, 1 GB
- Frontend Service: tasks-frontend-service (tasks-frontend-task:1) - 0.25 vCPU, 0.5 GB
- IAM Role: LabRole

## Lambda
- Nome: tasks-report
- Runtime: Node.js 22.x
- Timeout: 15s
- Memoria: 256 MB
- IAM Role: LabRole
- Variavel: BACKEND_URL=http://54.226.164.14:3000

## API Gateway
- Nome: tasks-api
- Tipo: HTTP API
- ID: m9aj7fdwvf
- Invoke URL: https://m9aj7fdwvf.execute-api.us-east-1.amazonaws.com
- Rotas:
  - ANY /api/tasks -> ECS Backend
  - ANY /api/tasks/{id} -> ECS Backend
  - GET /report -> Lambda tasks-report
- CORS: Allow-Origin: *, Allow-Methods: *