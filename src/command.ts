export interface Command {
  command: {
    direction?: string;
    action?: string;
    singleLine?: boolean;
  };
  keys: string;
}
