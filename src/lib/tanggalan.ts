// @ts-nocheck

import cheerio from 'cheerio';
import got from 'got';

export const tanggalan = async (tahun: string | number) => {
	const text = await got.get('https://tanggalan.com/' + tahun).text();
	const $ = cheerio.load(text);
	const results: {
		tanggal: string;
		memperingati: string;
	}[] = [];
	$('#main ul').each((bulan, bulanEl) => {
		bulan++;
		bulan = bulan.toString().padStart(2, '0');

		const daftarHariLibur = $(bulanEl).find('li:last-child table');
		if (daftarHariLibur) {
			$(daftarHariLibur)
				.find('tr')
				.each((_, el) => {
					let tanggal = $(el).find('td:first-child').text();
					const memperingati = $(el).find('td:last-child').text();
					// jika tanggal libur berada dalam range tanggal
					if (tanggal.includes('-')) {
						let [startAT, endAT] = tanggal.split('-', 2);
						startAT = parseInt(startAT);
						endAT = parseInt(endAT);
						for (let i = startAT; i <= endAT; i++) {
							tanggal = i;
							tanggal = tanggal.toString().padStart(2, '0');
							results.push({
								tanggal: `${tahun}-${bulan}-${tanggal}`,
								memperingati
							});
						}
					} else {
						tanggal = tanggal.toString().padStart(2, '0');
						results.push({
							tanggal: `${tahun}-${bulan}-${tanggal}`,
							memperingati
						});
					}
				});
		}
	});
	return results;
};
