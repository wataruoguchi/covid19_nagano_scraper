import { newsItem } from "./types";
import { newsItemRaw } from "./naganoTypes";
export function mapper(source: newsItemRaw[]): { newsItems: newsItem[] } {
  return {
    newsItems: source.map(rawToData()),
  };
}

function numToStr2digs(numStr: string): string {
  return numStr.padStart(2, "0");
}

function rawToData() {
  return function (newsItemRaw: newsItemRaw): newsItem {
    const dateReg = RegExp(/^(\d+)月(\d+)日/);

    /**
     * japaneseShortDateToYMD
     * @param japaneseShortDate e.g., 3月30日
     * @returns e.g., 2020/30/30
     */
    function japaneseShortDateToYMD(japaneseShortDate: string): string {
      const regexRes = japaneseShortDate.match(dateReg);
      if (!regexRes || !regexRes.length) return "";
      // TODO: Assuming it's 2020. Wish I don't need to update here.
      return `2020/${numToStr2digs(regexRes[1])}/${numToStr2digs(regexRes[2])}`;
    }

    return {
      date: japaneseShortDateToYMD(newsItemRaw.text),
      url: newsItemRaw.href,
      text: newsItemRaw.text.replace(dateReg, "").trim(),
    };
  };
}
