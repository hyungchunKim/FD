import puppeteer from 'puppeteer';
import { saveToFirestore } from '../libs/firebase/firebaseDb';
import { translateText } from './translate';

// 크롤링할 URL
const URL = 'https://www.cve.org/Media/News/AllNews';

async function scrapeAndSave() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto(URL, { waitUntil: 'networkidle2' });

  // 크롤링된 데이터 추출
  const newsItems = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.content'));
    return items.map(item => {
      const titleElement = item.querySelector('h2 a');
      const timeElement = item.querySelector('time');
      const summaryElement = item.querySelector('div > div > p');

      return {
        title: titleElement?.textContent?.trim() || '',
        publishedTime: timeElement?.textContent?.trim() || '',
        summary: summaryElement ? Array.from(summaryElement.childNodes).map(node => node.textContent?.trim()).filter(text => text).join(' ') : ''
      };
    });
  });

  // 중복 제거 및 빈 문자열 필터링
  const uniqueNewsItems = new Map<string, any>();

  for (const newsItem of newsItems) {
    const { title, publishedTime, summary } = newsItem;

    // 모든 키가 존재하는지 확인
    if (title && publishedTime && summary) {
      // 중복 제거 (title을 기준으로 중복 확인)
      if (!uniqueNewsItems.has(title)) {
        uniqueNewsItems.set(title, newsItem);
      }
    }
  }

  const filteredNewsItems = Array.from(uniqueNewsItems.values());

  // 데이터 번역 및 저장
  for (const newsItem of filteredNewsItems) {
    try {
      // 데이터 번역
      const translatedTitle = await translateText(newsItem.title);
      const translatedSummary = await translateText(newsItem.summary);

      // Firestore에 저장
      await saveToFirestore({
        ...newsItem,
        title: translatedTitle,
        summary: translatedSummary,
      });
    } catch (error) {
      console.error('Error processing item:', error);
    }
  }

  console.log(`Saved ${filteredNewsItems.length} items`);
  await browser.close();
}

scrapeAndSave();