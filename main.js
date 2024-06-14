import { mode, runManager } from "./runManager.js";
import { logger } from "./utils/logger.js";

logger.mark('-> NatterManager <-');


export const configList = [

	{
		name: 'Minecraft',
		args: ['Natter', '-p', '25565', '-U'],
		cb: (ip, port) => mode.cloudflare.set_SRV_record('your_dns_record_id', '_minecraft._tcp.mc', `${ip}.nip.io`, port),
	},
	{
		name: 'OpenBMCLAPI',
		args: ['Natter', '-p', '4001', '-U'],
		cb: (ip, port) => mode.writeFile('C:/OpenBmclAPI/addr.txt', `addr: ${ip}:${port}`),
	},
	
];


runManager();
