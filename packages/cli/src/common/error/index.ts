export class ConfigError extends Error {
  constructor(message: string, { cause }: { cause?: unknown }) {
    super(message)
    this.name = "ConfigError"
    this.cause = cause
  }
}
