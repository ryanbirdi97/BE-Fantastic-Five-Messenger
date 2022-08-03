const app = require("./app");

const { PORT = 9090 } = process.env;
console.log(process.env);
app.listen(PORT, () => `Listening on ${PORT}...`);
