const $ = require("jquery");
import { newsItemRaw } from "./naganoTypes";

export const URL =
  "https://www.pref.nagano.lg.jp/hoken-shippei/kenko/kenko/kansensho/joho/corona.html";
export function getEvaluatePage() {
  return function evaluatePage(): newsItemRaw[] {
    // This part will be implemented in the target page.
    const newsItemsRaw: { href: string; text: string }[] = [];
    $("#tmp_contents>div.outline:nth-of-type(1)>ul>li").each(
      (_idx: number, el: any) => {
        newsItemsRaw.push({
          href: $(el).find("a").attr("href"),
          text: $(el).text(),
        });
      }
    );
    return newsItemsRaw;
  };
}
