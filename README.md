# Weberos Headstart Template

This is a Next.js template to provide a headstart when starting a new project, with a strong emphasis on typescript.

## Features

- `TailwindCSS`: TailwindCSS with pre added theme colors and fonts.
- `NextAuth`: Authentication with Google provider and MongoDB adapter.
- `Mongoose`: Handles MongoDB connection and DB traversal.

## Implementations

- `Network`: Typed Endpoints with typed Response and Params/Body.
- `WeberosIcon`: Typed and Cachable Svg Icons.
- `UseWeberosQuery`: React Client Component hook for persisted network requests.
- `UseWeberosSocket`: React Client Component hook for persisted Websocket connections.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

`NEXT_PUBLIC_API_URL`

`NEXT_PUBLIC_SOCKET_URL`

`GOOGLE_CLIENT_ID`

`GOOGLE_CLIENT_SECRET`

`NEXTAUTH_SECRET`

`MONGODB_URI`

Please check `.env.example` for more information.

## Run

```bash
npm i && npm run dev
```

```bash
yarn install && yarn dev
```

```bash
pnpm i && pnpm run dev
```
