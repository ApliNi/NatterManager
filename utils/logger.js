
export const logger = {

	getTime(){
		const time = new Date();
		return `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}`;
	},

	info(...log){
		console.log(`\x1B[0m[${logger.getTime()} INFO]:`, ...log, `\x1B[0m`);
	},

	mark(...log){
		console.log(`\x1B[92m[${logger.getTime()} MARK]:`, ...log, `\x1B[0m`);
	},

	log(...log){
		console.log(...log);
	},

	table(...log){
		console.table(...log);
	},

	warn(...log){
		console.log(`\x1B[93m[${logger.getTime()} WARN]:`, ...log, `\x1B[0m`);
	},

	error(...log){
		console.log(`\x1B[91m[${logger.getTime()} ERROR]:`, ...log, `\x1B[0m`);
	},

	throw(msg, log, mark){
		if(msg){
			logger.error(msg);
		}
		if(log){
			logger.log(log);
		}
		if(mark){
			logger.mark(mark);
		}
	},
};
