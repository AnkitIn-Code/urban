import "dotenv/config";

const defaultOrigins = [
  "http://localhost:8080",
  "http://localhost:5173",
  "http://localhost:8081",
  "http://127.0.0.1:8080",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:8081",
];

const envOrigins = [
  process.env.FRONTEND_ORIGINS,
  process.env.FRONTEND_URL,
  process.env.CLIENT_URL,
]
  .filter(Boolean)
  .flatMap((val) => val.split(","))
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

export const allowedOrigins = envOrigins.length > 0 ? envOrigins : defaultOrigins;

export const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  const cleanOrigin = origin.trim().replace(/\/+$/, "");
  if (allowedOrigins.includes("*")) return true;
  return allowedOrigins.includes(cleanOrigin);
};
