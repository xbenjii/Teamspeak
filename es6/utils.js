let escape = string => {
	return string
		.replace(/[\\\/\n\r\t\v\f]/g, '\\$&')
		.replace(/\|/g, '\\p')
		.replace(/ /g, '\\s')
};

let unEscape= string => {
  	return string.replace(/\\s/g, ' ')
		.replace(/\\p/, '|')
		.replace(/[\\]/g, '$&');
};

let buildCommand = (command, params = '') => {
	let cmd = `${escape(command)} `;
	if(typeof params === 'string') {
		cmd += escape(params)
	} else if (Array.isArray(params)) {
		cmd += params.join(' ');
	} else if (typeof params === 'object') {
		cmd += Object.keys(params).map(key => {
			if(Array.isArray(params[key])) {
				return params[key].map(p => {
					return `${escape(key)}=${escape(p)}`;
				}).join('|');
			}
			return `${escape(key)}=${escape(params[key])}`;
		}).join(' ');
	}
	return cmd;
};

let parseResponse = data => {
  	let parsed = data.split('|').map(group => {
	    return group.split(' ').reduce((obj, val) => {
	        let [k, v] = val.split('=');
	    	obj[k] = v ? unEscape(v) : '';
    		return obj;
    	}, {});
  	});
  	if(Array.isArray(parsed) && parsed.length === 1) {
  		return parsed[0];
  	}
  	return parsed;
};

export default {escape, unEscape, buildCommand, parseResponse};