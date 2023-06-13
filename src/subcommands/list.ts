import { schemesWeb } from "./const.ts";


export async function listThemes() {
	const schemes = await fetch(schemesWeb).then(schemes => schemes.json());

	for (const scheme of schemes) {
		const name = scheme["name"]

		const cursor = scheme["cursor"]
		const background = scheme["background"]
		const selection = scheme["selectionBackground"]
		const foreground = scheme["foreground"]
		const blue = scheme["blue"]
		const white = scheme["white"]
		const purple = scheme["purple"]
		const green = scheme["green"]
		const cyan = scheme["cyan"]
		const red = scheme["red"]

		console.log(name)
		console.log("%c   %c   %c   %c   %c   %c   %c   %c   %c   %c   %c",
			`background-color: ${background}`,
			`background-color: ${foreground}`,
			`background-color: ${cursor}`,
			`background-color: ${cyan}`,
			`background-color: ${red}`,
			`background-color: ${purple}`,
			`background-color: ${green}`,
			`background-color: ${red}`,
			`background-color: ${white}`,
			`background-color: ${blue}`,
			`background-color: ${selection}`,
		)

		console.log()
	}


}
