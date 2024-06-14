import { configList } from "./main.js";
import { cloudflare } from "./mode/cloudflare.js";
import { writeFile } from "./mode/file.js";
import { runNatter } from "./mode/natter.js";
import { logger } from "./utils/logger.js";
import { sleep } from "./utils/util.js";


export const mode = {
	cloudflare,
	writeFile,
};

const funcMap = {
	'Natter': runNatter,
};


export const runManager = async () => {

    for(const cfg of configList){
		logger.mark(`[RUN] ${cfg.name}`);
		if(!funcMap[cfg.args[0]]){
			logger.error(`  - 程序参数无效`);
		}
		funcMap[cfg.args[0]](cfg);
		await sleep(150);
	}

	logger.mark(`[RUN] 启动完成`);
};
