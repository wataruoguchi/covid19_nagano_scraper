const fs = require("fs");
const path = require("path");
const commander = require("commander");
const $ = require("jquery");
import { crawler } from "./lib/crawler";
import { newsItem, newsItemRaw } from "./lib/types";
import { mapper } from "./lib/mapper";

const JSON_DIR = path.join(__dirname, ".json");
const URL =
  "https://www.pref.nagano.lg.jp/hoken-shippei/kenko/kenko/kansensho/joho/bukan-haien.html";

commander
  .description(
    "The script that scrapes Pref. of Nagano news then convert it into JSON files."
  )
  .parse(process.argv);

if (commander.help) {
  commander.outputHelp();
}

console.log("STARTED");
mkDirs();

launchCrawler()
  .then((results: newsItemRaw[]) => {
    // Generating a JSON file.
    const newsItemsData: { newsItems: newsItem[] } = mapper(URL, results);
    fs.writeFileSync(
      [JSON_DIR, "news.json"].join("/"),
      JSON.stringify(newsItemsData, null, 2)
    );
    console.log(newsItemsData);
    console.log("DONE!");
  })
  .catch(err => console.error(err));

function launchCrawler(): Promise<newsItemRaw[]> {
  // Set up parameters for the crawler
  let results: newsItemRaw[] = [];

  function evaluatePage() {
    // This part will be implemented in the target page.
    const newsItemsRaw: { href: string; text: string }[] = [];
    $("#tmp_contents>div.outline:nth-of-type(1)>ul>li").each(
      (_idx: number, el: any) => {
        newsItemsRaw.push({
          href: $(el)
            .find("a")
            .attr("href"),
          text: $(el).text()
        });
      }
    );
    return newsItemsRaw;
  }
  function onSuccess(res: { result: newsItemRaw[] }) {
    results = res.result || [];
  }

  return new Promise((resolve, reject) => {
    crawler({ url: URL, evaluatePage, onSuccess })
      .then(() => resolve(results))
      .catch(err => reject(err));
  });
}

function mkDirs(): void {
  [JSON_DIR].forEach(dirName => {
    // Create directories we'd use.
    try {
      fs.mkdirSync(dirName);
    } catch (e) {}
  });
}
