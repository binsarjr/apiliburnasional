import { REVALIDATE_TOKEN } from '$lib';
import { json } from '@sveltejs/kit';

export const GET = async (event) => {
	await event.fetch('/api', {
		method: 'HEAD',
		headers: {
			'x-prerender-revalidate': REVALIDATE_TOKEN,
			cookie: '__prerender_bypass=' + REVALIDATE_TOKEN
		}
	});
	return json({ message: 'Revalidated' });
};
