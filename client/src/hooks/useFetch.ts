import {useEffect, useState} from 'react';

const useFetch = (url:any) => {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const abortCont = new AbortController();

		fetch(url, {signal: abortCont.signal, headers: {'Content-type': 'application/json'}})
			.then(res => {
				console.log(res);
				if (!res.ok) {
					throw Error('could not fetch the data for that resource');
				}

				return res.json();
			})
			.then(data => {
				setIsPending(false);
				console.log(data);
				setData(data);
				setError(null);
			})
			.catch(err => {
				if (err.name === 'AbortError') {
					console.log('fetch aborted');
				} else {
					setIsPending(false);
				}

				setIsPending(false);
				setError(err.message);
			});

		return () => abortCont.abort();
	}, [url]);

	return {data, isPending, error};
};

export default useFetch;
