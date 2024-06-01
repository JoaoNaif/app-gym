export class MaxNumbeCheckInsError extends Error {
  constructor() {
    super("Max number of check-ins reached.");
  }
}
