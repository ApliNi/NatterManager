import { spawn } from 'child_process';
import iconv from 'iconv-lite';


export const runProcessPromise = (cmd, args = [], cb = null, decode = 'gbk') => new Promise((resolve, reject) => {
	// 创建一个进程
	const process = spawn(cmd, args);

	// 监听 stdout（标准输出）数据事件
	if(cb !== null){
		process.stdout.on('data', (data) => {
			const msg = iconv.decode(data, decode);
			cb(`${msg}`, process);
		});
		process.stderr.on('data', (data) => {
			const msg = iconv.decode(data, decode);
			cb(`${msg}`, process);
		});
	}

	// close, exit, error
	process.on('close', resolve);
	process.on('exit', resolve);
	process.on('error', resolve);

});
