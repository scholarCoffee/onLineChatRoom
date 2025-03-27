export const dateTime = (d) => {
    const date = new Date(d);
    const now = new Date();
    const diffTime = now - date;
    const oneDay = 24 * 60 * 60 * 1000;

    const hours = date.getHours().toString().padStart(2, '0'); // 补零
    const minutes = date.getMinutes().toString().padStart(2, '0'); // 补零

    if (diffTime < oneDay && date.getDate() === now.getDate()) {
        // 今天
        return `${hours}:${minutes}`;
    } else if (diffTime < 2 * oneDay && date.getDate() === now.getDate() - 1) {
        // 昨天
        return `昨天 ${hours}:${minutes}`;
    } else if (diffTime < 7 * oneDay) {
        // 最近7天
        return `${date.getMonth() + 1}月${date.getDate()}日 ${hours}:${minutes}`;
    } else {
        // 其他时间
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${hours}:${minutes}`;
    }
};


// 间隔时间差
export const spaceTime = (old, now) => {
    old = new Date(old)
    now = new Date(now)
    const told = old.getTime()
    const tnow = now.getTime()
    if (told > tnow + 1000*60*5) {
        return now;
    } // 5分钟内不显示
    return '';
}