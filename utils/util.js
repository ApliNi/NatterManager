

// 格式化 UTC 时间
export const getUTCTime = (utcAdd = 8) => {
	const utcDate = new Date();
	// 获取UTC时间的小时和分钟
	const utcHours = utcDate.getUTCHours();
	const utcMinutes = utcDate.getUTCMinutes();
	// 计算UTC+8时间的小时和分钟
	const utcPlus8Hours = utcHours + utcAdd;
	const utcPlus8Minutes = utcMinutes;
	// 创建UTC+8时间的Date对象
	const utcPlus8Date = new Date(Date.UTC(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate(), utcPlus8Hours, utcPlus8Minutes));
	// 格式化UTC+8时间
	// 移除时间字符串最后的'Z'，表示UTC时间
	return utcPlus8Date.toISOString().slice(0, -5).replace('T', ' ');
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

