export enum DatetimeFormat {
    DateOnly = '$1$2-$3-$4',
    NoSecondsDatetime = '$1$2-$3-$4 $5:$6',
    NoSecondsTimeOnly = '$5:$6',
    NoYearDateOnly = '$3-$4',
    NoYearNoSecondsDatetime = '$3-$4 $5:$6',
    ShortYearNoSecondsDatetime = '$2-$3-$4 $5:$6',
    ShortYearDateOnly = '$2-$3-$4',
    ShortYearDatetime = '$2-$3-$4 $5:$6:$7',
    TimeOnly = '$5:$6:$7',
}

interface DatetimeFormatOption {
    format?: DatetimeFormat;
    sec?: boolean;
    dateSeq?: string;
    timeSeq?: string;
}

export const datetimeFormat = (timestamp: number, option?: DatetimeFormatOption) => {
    if (option?.sec) timestamp *= 1000;
    const datetime = new Date(timestamp);

    const timeText = datetime.toISOString();
    const ISOFormat = /(\d{2})(\d{2})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z/;

    return timeText
        .replace(ISOFormat, option?.format || '$1$2-$3-$4 $5:$6:$7')
        .replace(/-/, option?.dateSeq || '-')
        .replace(/:/, option?.timeSeq || ':');
};
