import { logger } from "../utils/logger.js";
import fs from "fs";


export const writeFile = async (path, text) => {
	fs.writeFile(path, text, (err) => {
		if(err){
			logger.error(`[writeFile]`, err);
		}
	});
};
