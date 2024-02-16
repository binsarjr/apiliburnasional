import { json } from '@sveltejs/kit';

export const GET = async (event) => {
	const resp = await event.fetch(
		'/api?tahun=' + event.params.year + '&bulan=' + event.params.month
	);
	return json(await resp.json());
};
