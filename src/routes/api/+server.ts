import { REVALIDATE_TOKEN } from '$lib';
import { tanggalan } from '$lib/tanggalan.js';
import { json } from '@sveltejs/kit';

export const config = {
	isr: {
		allowQuery: ['tahun', 'bulan'],
		expiration: 60 * 60 * 24 * 30,
		bypassToken: REVALIDATE_TOKEN
	}
};

export const GET = async (event) => {
	let tahun = parseInt(
		event.url.searchParams.get('tahun')?.toString() || new Date().getFullYear().toString()
	);
	let bulan = event.url.searchParams.get('bulan')?.toString();

	const result: { tanggal: string; memperingati: string }[] = [];

	const daftarHariLibur = await tanggalan(tahun);
	daftarHariLibur.map((item) => {
		if (!(bulan && tahun)) {
			result.push(item);
			return;
		}
		if (new Date(item.tanggal).getMonth() + 1 == +bulan) {
			result.push(item);
		}
	});

	await new Promise((resolve) => setTimeout(resolve, 5_000));

	return json(result);
};
