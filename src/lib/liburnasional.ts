import cheerio from 'cheerio';
import got from 'got';
export const liburnasional = async (tahun: string | number) => {
	const text = await got.get('http://www.liburnasional.com/kalender-' + tahun + '/').text();
	const $ = cheerio.load(text);
	const results: {
		tanggal: string;
		memperingati: string;
	}[] = [];
	$('body > div.container-fluid > div.row.row-eq-height.libnas-content > diV').each((_, el) => {
		const memperingati = $(el).find('.libnas-calendar-holiday-title span').text();
		let tanggal = $(el).find('.libnas-calendar-holiday-datemonth').attr()!['datetime'];
		results.push({
			tanggal,
			memperingati
		});
	});
	return results;
};
