export interface Command {
	direction?: string;
	action?: string;
	singleLine?: boolean;
}

export interface Action {
	command: Command,
	keys: string
}