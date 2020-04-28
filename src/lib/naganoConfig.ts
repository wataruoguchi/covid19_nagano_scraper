import { newsItemRaw } from "./naganoTypes";

export const BASE_URL =
  "https://www.pref.nagano.lg.jp/hoken-shippei/kenko/kenko/kansensho/joho/corona.html";
export function getEvaluatePage() {
  return function evaluatePage(): newsItemRaw[] {
    // This part will be implemented in the target page.
    const newsItemsRaw: { href: string; text: string }[] = [];
    const listItems = document.querySelectorAll(
      "#tmp_contents>table>tbody>tr>td>ul>li"
    );
    listItems.forEach((listItem) => {
      const anchor = listItem.querySelector("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href) {
          const url = new URL(href, window.location.href).href;
          newsItemsRaw.push({
            href: url,
            text: listItem.textContent || "test",
          });
        }
      }
    });
    return newsItemsRaw;
  };
}
