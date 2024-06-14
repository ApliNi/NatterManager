import { key } from "../key.js";
import { logger } from "../utils/logger.js";
import { sleep } from "../utils/util.js";


export const cloudflare = {

	set_SRV_record: async (dns_record_id, name, ip, port, retry = 0) => {
		if(retry > 14){
			logger.error('[Cloudflare] [set_SRV_record] 达到重试上限');
			return;
		}
		try{
			const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${key.cf_zone_id}/dns_records/${dns_record_id}`, {
				method: 'PUT',
				headers: {
					'Authorization': key.cf_Authorization,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					type: 'SRV',
					ttl: 60,
					name: name,
					data: {
						weight: 0,
						priority: 5,
						port: port,
						target: ip,
					}
				}),
			});
			const data = await res.json();
			if(data?.success !== true){
				logger.error(data);
			}
		}catch(err){
		    logger.error(err);
			await sleep(1000);
			retry ++;
			await cloudflare.set_SRV_record(dns_record_id, name, ip, port, retry);
		}
	},
};
