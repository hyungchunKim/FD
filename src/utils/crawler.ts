import puppeteer from 'puppeteer';
import { saveToFirestore } from '../libs/firebase/firebaseDb';
import { translateText } from './translate';
import { firestore } from 'firebase-admin';
import { format } from 'date-fns';

// 크롤링할 URL
const URL = 'https://www.cve.org/Media/News/AllNews';

async function scrapeAndSave() {
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = await browser.newPage();

  await page.goto(URL, { waitUntil: 'networkidle2' });

  let pageNumber = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    console.log(`Scraping page ${pageNumber}...`);

    // 크롤링된 데이터 추출
    const newsItems = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.content'));
      return items.map(item => {
        const titleElement = item.querySelector('h2 a');
        const timeElement = item.querySelector('time');
        const summaryElement = item.querySelector('div > div > p');

        return {
          title: titleElement?.textContent?.trim() || '',
          url: 'https://www.cve.org' + titleElement?.getAttribute('href') || '', // 세부 페이지 URL
          publishedTime: timeElement?.textContent?.trim() || '',
          summary: summaryElement ? Array.from(summaryElement.childNodes).map(node => node.textContent?.trim()).filter(text => text).join(' ') : ''
        };
      });
    });

    const uniqueNewsItems = new Map<string, any>();

    for (const newsItem of newsItems) {
      const { title, publishedTime, summary, url } = newsItem;

      // 모든 키가 존재하는지 확인
      if (title && publishedTime && summary && url) {
        if (!uniqueNewsItems.has(title)) {
          uniqueNewsItems.set(title, newsItem);
        }
      }
    }

    const filteredNewsItems = Array.from(uniqueNewsItems.values());

    for (const newsItem of filteredNewsItems) {
      try {
        // 세부 페이지로 이동
        if (newsItem.url) {
          await page.goto(newsItem.url, { waitUntil: 'networkidle2' });

          // 세부 페이지에서 개행 및 공백을 유지하면서 텍스트 추출
          const detailedContent = await page.evaluate(() => {
            const contentElement = document.querySelector('.content.ml-2.mt-5') as HTMLElement; // 세부 페이지의 내용 선택자
            
            // 개행과 공백을 유지한 텍스트 추출
            return contentElement?.innerText?.replace(/\n/g, '\n').trim() || '';
          });

          // 번역
          const translatedTitle = await translateText(newsItem.title);
          const translatedSummary = await translateText(newsItem.summary);
          const translatedPublishedTime = await translateText(newsItem.publishedTime);
          const translatedDetailContent = await translateText(detailedContent);

          // Firestore에 저장
          await saveToFirestore({
            title: translatedTitle,
            summary: translatedSummary,
            publishedTime: translatedPublishedTime,
            savedTime: format(firestore.Timestamp.now().toDate(), "yyyy년 MM월 dd일"),
            detailContent: translatedDetailContent,
            url: newsItem.url,
          });

          console.log(`${pageNumber} page data crawlling completed`);
        }
      } catch (error) {
        console.error('Error processing item:', error);
      }
    }

    await page.goto(URL, { waitUntil: 'networkidle2' });

    // 다음 페이지가 있는지 확인하고, 있으면 클릭해서 이동
    hasNextPage = await page.evaluate(() => {
      const nextButton = document.querySelector('.svg-inline--fa.fa-angle-right');
      console.log("class detected!!!");
      return nextButton !== null; // 다음 버튼이 존재하는지 확인
    });

    if (hasNextPage) {
      // 다음 페이지 버튼 클릭
      for(let i=0; i<pageNumber; i++) {
        await page.click('.svg-inline--fa.fa-angle-right');
      } 
      await page.waitForSelector('.content', { visible: true, timeout: 5000 }); // 새 페이지가 로드될 때까지 대기
      pageNumber++;
    }

    if(pageNumber === 3) break;
  }

  console.log(`Scraping completed. Total pages: ${pageNumber - 1}`);
  await browser.close();
}

scrapeAndSave();