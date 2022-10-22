import dayjs from 'dayjs'

export {};

declare global {
    interface Date {
        toJapanDateString(): string; 
    }
}

Date.prototype.toJapanDateString = function() {
    const format = 'YYYY/MM/DD HH:mm:ss';
    const jpLocale = {
        utcDiffTime: (9 * 60) + this.getTimezoneOffset(),
        timeScale: 'minute' as dayjs.ManipulateType
    }
    //UTC基準Timeから日本時間のGMT 9時間を追加
    let date = dayjs(this.getTime());
    date = date.add(jpLocale.utcDiffTime, jpLocale.timeScale);
    return  date.format(format).toString();
}
