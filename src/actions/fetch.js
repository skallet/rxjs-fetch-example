export const fetch = (url, useAjax = false) => ({
	type: 'FETCH_START',
	payload: { url, useAjax },
});

export const receive = (url, payload) => ({
	type: 'FETCH_SUCCESS',
	payload: { url, data: payload },
});

export const error = (url) => ({
	type: 'FETCH_FAILED',
	payload: { url },
});
