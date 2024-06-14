import { logger } from "../utils/logger.js";
import { runProcessPromise } from "../utils/run.js";


export const runNatter = async (cfg) => {
	while(true){
		logger.mark(`[${cfg.name}] -> Natter`);
		const args = cfg.args.slice(1);
		await runProcessPromise('./mode/python/python.exe', ['./mode/Natter/natter.py', ...args], (_msg, process) => {
			const msg = `${_msg}`.trim();
			logger.info(`[${cfg.name}]`, msg);

			const res = msg.match(/\[I\] WAN > ([\d\.]+):(\d+)\s+\[ OPEN \]/);
			if(res){
				const ip = res[1];
				const port = res[2];
				logger.mark(`[${cfg.name}] [Natter] ~ ${ip}:${port}`);

				cfg.cb(ip, port);
			}

			else if(msg.includes('[W] !! Hole punching failed !!')){
				process.kill();
			}
		});
	}
};
