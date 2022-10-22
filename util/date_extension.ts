import dayjs from 'dayjs'

export {};

declare global {
    interface Date {
        toJapanDateString(): string; 
    }
}

Date.prototype.toJapanDateString = function() {
    const format = 'YYYY/MM/DD HH:mm:SS';
    const jpLocale = {
        utcDiffTime: 9,
        timeScale: 'hour' as dayjs.ManipulateType
    }
    //UTC基準Timeから日本時間のGMT 9時間を追加
    const date = dayjs(this.getTime());
    date.add(jpLocale.utcDiffTime, jpLocale.timeScale);
    const returnDate = date.format(format).toString();
    return returnDate;
}