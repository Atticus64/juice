

const res = await  fetch('https://2zrysvpla9.execute-api.eu-west-2.amazonaws.com/prod/themes')
const themes = await res.json()

const theme = themes.filter(t => t.name === "3024 Day")[0]

console.log(JSON.stringify(theme))
