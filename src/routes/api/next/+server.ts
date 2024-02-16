import { error, json } from '@sveltejs/kit';
import moment from 'moment';
import 'moment/locale/id';

export const GET = async (event) => {
	const today = moment();
	let tahun = today.get('year');
	const resp = await event.fetch('/api?tahun=' + tahun);
	const items = (await resp.json()) as {
		tanggal: string;
		memperingati: string;
	}[];

	// Filter array untuk mendapatkan satu hari berikutnya
	// @ts-ignore
	const nextDayData = items.filter((item) => new Date(item.tanggal) > today);

	// Ambil satu data saja setelah tanggal besok
	const firstNextDayData = nextDayData.length > 1 ? nextDayData[0] : null;
	if (firstNextDayData == null) throw error(404, 'Tidak ada hari libur nasional berikutnya');
	// @ts-ignore
	firstNextDayData['sisa_waktu'] = moment
		.duration(moment(firstNextDayData['tanggal']).diff(today))
		.humanize(true);

	return json(firstNextDayData);
};
