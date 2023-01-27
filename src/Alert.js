import React, { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert, list }) => {
	useEffect(() => {
		const timeout = setInterval(() => {
			removeAlert();
		}, 2000);
		return () => clearInterval(timeout);
	}, [list]);

	return <p className={`alert alert-${type}`}> {msg} </p>;
};

export default Alert;
