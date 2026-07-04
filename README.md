# soop-facial

Frontend React/Vite da Sooplix.

## Rodar local

```bash
pnpm install
pnpm dev
```

Por padrao o front usa a API em `http://localhost:3000/api`.
Para alterar, crie um `.env` com:

```env
VITE_API_URL=http://localhost:3000/api
```

## Build

```bash
pnpm build
```

## Docker

```bash
docker compose up --build
```

O site fica em `http://localhost:8080`.
