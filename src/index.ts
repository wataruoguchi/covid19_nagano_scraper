const fs = require("fs");
const path = require("path");
const commander = require("commander");
import { crawler } from "./lib/crawler";
import { newsItem } from "./lib/types";
import { newsItemRaw } from "./lib/naganoTypes";
import { mapper } from "./lib/mapper";
import { BASE_URL, getEvaluatePage } from "./lib/naganoConfig";

const JSON_DIR = path.join(__dirname, ".json");

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
    const newsItemsData: { newsItems: newsItem[] } = mapper(results);
    fs.writeFileSync(
      [JSON_DIR, "news.json"].join("/"),
      JSON.stringify(newsItemsData, null, 2)
    );
    console.log(newsItemsData);
    console.log("DONE!");
  })
  .catch((err) => console.error(err));

function launchCrawler(): Promise<newsItemRaw[]> {
  // Set up parameters for the crawler
  let results: newsItemRaw[] = [];

  function onSuccess(res: { result: newsItemRaw[] }) {
    results = res.result || [];
  }

  return new Promise((resolve, reject) => {
    crawler({ url: BASE_URL, evaluatePage: getEvaluatePage(), onSuccess })
      .then(() => resolve(results))
      .catch((err) => reject(err));
  });
}

function mkDirs(): void {
  [JSON_DIR].forEach((dirName) => {
    // Create directories we'd use.
    try {
      fs.mkdirSync(dirName);
    } catch (e) {}
  });
}
