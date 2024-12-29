import puppeteer from "puppeteer";
import { join, toFileUrl } from "@std/path";

async function renderHtmlToPdf(
  htmlPath: string,
  outPath: string,
): Promise<void> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(htmlPath, { waitUntil: "networkidle2" });
  await page.pdf({ path: outPath });
  await browser.close();
}

async function main(): Promise<void> {
  const htmlPath = toFileUrl(join(Deno.cwd(), Deno.args[0]));
  const outPath = Deno.args[1];
  await renderHtmlToPdf(htmlPath.toString(), outPath);
}

if (import.meta.main) await main();
