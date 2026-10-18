export function validateEnvironment(config: Record<string, unknown>) {
  const host = config.HOST ?? '127.0.0.1';
  const rawPort = config.PORT ?? '3000';
  const port = Number(rawPort);

  if (typeof host !== 'string' || host.trim().length === 0) {
    throw new Error('HOST must be a non-empty string.');
  }

  if (
    !/^\d+$/.test(String(rawPort)) ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535
  ) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }

  return { ...config, HOST: host, PORT: port };
}
