import request from 'isomorphic-fetch';
import { Observable } from 'rxjs/Observable';
import { receive, error } from '../actions/fetch.js';
import uuidv1 from 'uuid/v1';

const ajaxMiddleware = url => Observable.ajax(url).map(data => data.response);
const nativeMiddleware = url => request(url).then(r => r.json());

const fetchMiddleware = (url, useAjax) => {
	const middleware = useAjax ? ajaxMiddleware : nativeMiddleware;
	return middleware(url);
}

const fetch = (url, useAjax) => {
	const timeout = (Math.floor(Math.random() * 5) + 5);
	const data = uuidv1();
	const endpoint = `${url}?data={"ID":"${data}"}&sleep=${timeout}&api_key=48bf0f34-7e8e-458d-919b-e3758195c7fa`;
	return fetchMiddleware(endpoint, useAjax);
}

export const fetchEpic = action$ =>
	action$
		.ofType('FETCH_START')
		.map(action => Observable
			.from(fetch(action.payload.url, action.payload.useAjax))
			.map(payload => receive(action.payload.url, payload))
			.catch(err => Observable.of(error(err)))
		)
		.switch();
