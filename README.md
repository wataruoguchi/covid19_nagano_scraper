# COVID-19 Nagano News scraper

## What's this

長野県が公開しているニュースリンク一覧を json 形式に変換します。

The script that scrapes Pref. of Nagano's website and create a JSON file that has news links.

## How to run

このスクリプトは GitHub Actions で毎時実行され、長野県の公表しているデータの取得を試みます。
It's running every hour by GitHub Actions, to try fetching news data then update the `news.json` under `src/.json` automatically.

### Locally...

ローカル環境で実行する場合。

```
$ yarn start
```

## Specification

1. [長野県の Web ページ](https://www.pref.nagano.lg.jp/hoken-shippei/kenko/kenko/kansensho/joho/corona.html)のニュース一覧を JSON ファイルに変換します。

## About the JSON file

### news.json

| Property | Desc.                                          |
| -------- | ---------------------------------------------- |
| date     | 日付。HTML text から日付部分を取り出して変換。 |
| url      | ニュースサイト URL。HTML href から取得。       |
| text     | 見出し。HTML text から日付部分を削除して変換。 |

## Where would it be used

- [長野県 非公式 新型コロナウイルス感染症対策サイト / Nagano COVID-19 Task Force unofficeial website](https://stop-covid19-nagano.netlify.app/)
- [https://github.com/Stop-COVID19-Nagano/covid19](https://github.com/Stop-COVID19-Nagano/covid19)
