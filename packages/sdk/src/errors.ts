export class XRPLAnchorError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly retryable: boolean,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = "XRPLAnchorError";
  }
}

export class NetworkError extends XRPLAnchorError {
  constructor(cause: unknown) {
    super("XRPL network unreachable", "NETWORK_ERROR", true, cause);
  }
}

export class InsufficientFundsError extends XRPLAnchorError {
  constructor() {
    super("Wallet has insufficient XRP", "INSUFFICIENT_FUNDS", false);
  }
}

export class SequenceCollisionError extends XRPLAnchorError {
  constructor() {
    super("Sequence number collision", "SEQUENCE_COLLISION", true);
  }
}

export class LedgerTimeoutError extends XRPLAnchorError {
  constructor() {
    super("Transaction not included before LastLedgerSequence", "LEDGER_TIMEOUT", true);
  }
}

try {
  await anchorToXRPL(...);
} catch (err) {
  if (err instanceof XRPLAnchorError && err.retryable) {
    await job.retry({ delay: 5000 });
  } else if (err instanceof InsufficientFundsError) {
    await alerting.pageOnCall("XRPL wallet needs funding");
  } else {
    throw err;
  }
}
