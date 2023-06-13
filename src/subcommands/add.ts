import { Scheme } from '../scheme.ts';
import { getSettings } from '../config.ts';
import { green, yellow, red } from 'colors';
import { Flags } from '../flag.ts';
import { schemesWeb } from './const.ts';

const isUrl = (scheme: string) => scheme.startsWith('http')

const existsFile = async (file: string) => {
	try {
		const f = await Deno.open(file);
		return true
	} catch (e) {
		if (e instanceof Deno.errors.NotFound)
			return false
	}
}

const isFile = async (scheme: string) => scheme.endsWith('json') && (await existsFile(scheme))

export const addScheme = async (schemeName: string, flags: Flags) => {

	let scheme: Scheme | undefined;

	const checkIsFile = await isFile(schemeName)

	if (isUrl(schemeName)) {
		const res = await fetch(schemeName)
		scheme = await res.json()
	}
	if (checkIsFile) {
		const data = await Deno.readTextFile(schemeName)
		scheme = JSON.parse(data)
	}

	if (!schemeName.endsWith('json') && !schemeName.startsWith('https')) {
		const res = await fetch(schemesWeb)
		const schemesNet = await res.json()
		scheme = schemesNet.filter((t: Scheme) => t.name === schemeName)[0]
	}


	if (!scheme) {
		console.log(red('No scheme avalaible'))
		Deno.exit()
	}

	scheme = {
		"background": scheme.background,
		"black": scheme.black,
		"blue": scheme.blue,
		"brightBlack": scheme.brightBlack,
		"brightBlue": scheme.brightBlue,
		"brightCyan": scheme.brightCyan,
		"brightGreen": scheme.brightGreen,
		"brightPurple": scheme.brightPurple,
		"brightRed": scheme.brightRed,
		"brightWhite": scheme.brightWhite,
		"brightYellow": scheme.brightYellow,
		"cursorColor": scheme.cursorColor,
		"cyan": scheme.cyan,
		"foreground": scheme.foreground,
		"green": scheme.green,
		"name": scheme.name,
		"purple": scheme.purple,
		"red": scheme.red,
		"selectionBackground": scheme.selectionBackground,
		"white": scheme.white,
		"yellow": scheme.yellow
	}

	await addSchemeToConfig(scheme)

	flags.scheme = scheme.name

	return flags
}


export const addSchemeToConfig = async (scheme: Scheme) => {

	try {
		const [data, path] = await getSettings()

		const schemes = data.schemes;

		if (schemes.some(s => s?.name === scheme.name)) {
			console.log(yellow('That scheme already exists'))
			Deno.exit()
		}

		schemes.push(scheme)

		const newConfig = JSON.stringify(data, null, "\t");

		await Deno.writeTextFile(path, newConfig);

		console.log(green("Scheme installed succesfully!"));

	} catch (err) {
		throw new Error(err);
	}
};

