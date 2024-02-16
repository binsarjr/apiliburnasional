const fsPromises = require("fs").promises;
const fs = require("fs");
const { join } = require("path");
const { tanggalan } = require("../services/tanggalan");

const datapath = join(__dirname, "../data");

module.exports = async (req, res) => {
	const now = new Date();
	let tahun = now.getFullYear();

	const filepath = join(datapath, `${tahun}.json`);

	let items = [];

	if (fs.existsSync(filepath)) {
		let text = await fsPromises.readFile(filepath, "utf8");
		let parseResult = JSON.parse(text);
		items = parseResult;
	}

	// Filter array untuk mendapatkan satu hari berikutnya
	const nextDayData = items.filter((item) => new Date(item.tanggal) > now);

	// Ambil satu data saja setelah tanggal besok
	const firstNextDayData = nextDayData.length > 1 ? nextDayData[0] : null;

	return res.status(!!firstNextDayData ? 200 : 404).send(firstNextDayData);
};
