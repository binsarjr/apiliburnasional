const fsPromises = require("fs").promises;
const fs = require("fs");
const { join } = require("path");
const { tanggalan } = require("../services/tanggalan");
const moment = require("moment");
require("moment/locale/id");

const datapath = join(__dirname, "../data");

module.exports = async (req, res) => {
	const today = moment();
	let tahun = today.get("year");

	const filepath = join(datapath, `${tahun}.json`);

	let items = [];

	if (fs.existsSync(filepath)) {
		let text = await fsPromises.readFile(filepath, "utf8");
		let parseResult = JSON.parse(text);
		items = parseResult;
	}

	// Filter array untuk mendapatkan satu hari berikutnya
	const nextDayData = items.filter((item) => new Date(item.tanggal) > today);

	// Ambil satu data saja setelah tanggal besok
	const firstNextDayData = nextDayData.length > 1 ? nextDayData[0] : null;
	if (firstNextDayData == null) return res.status(404);
	firstNextDayData["sisa_waktu"] = moment
		.duration(moment(firstNextDayData["tanggal"]).diff(today))
		.humanize(true);

	return res.status(200).send(firstNextDayData);
};
