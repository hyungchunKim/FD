import admin from 'firebase-admin';
import puppeteer from 'puppeteer';
import { saveToFirestore } from '../libs/firebase/firebaseDb';
import { translateText } from './translate';
import { format } from 'date-fns';
import serviceAccount from '../fd-6aea3-firebase-adminsdk-t7blu-a3caea7018.json'; // JSON 파일을 import

// Firebase Admin SDK 초기화
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount), // 타입 캐스팅 추가
  });
}

// Firestore 데이터베이스에 접근
const Timestamp = admin.firestore.Timestamp; // Timestamp를 Firestore에서 직접 가져옴

const URL = 'https://www.cve.org/Media/News/AllNews';

async function scrapeAndSave() {
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = await browser.newPage();

  await page.goto(URL, { waitUntil: 'networkidle2' });

  let pageNumber = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    console.log(`Scraping page ${pageNumber}...`);

    const newsItems = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.content'));
      return items.map(item => {
        const titleElement = item.querySelector('h2 a');
        const timeElement = item.querySelector('time');
        const summaryElement = item.querySelector('div > div > p');

        return {
          title: titleElement?.textContent?.trim() || '',
          url: 'https://www.cve.org' + titleElement?.getAttribute('href') || '',
          publishedTime: timeElement?.textContent?.trim() || '',
          summary: summaryElement ? Array.from(summaryElement.childNodes).map(node => node.textContent?.trim()).filter(text => text).join(' ') : ''
        };
      });
    });

    const uniqueNewsItems = new Map<string, any>();

    for (const newsItem of newsItems) {
      const { title, publishedTime, summary, url } = newsItem;

      if (title && publishedTime && summary && url) {
        if (!uniqueNewsItems.has(title)) {
          uniqueNewsItems.set(title, newsItem);
        }
      }
    }

    const filteredNewsItems = Array.from(uniqueNewsItems.values());

    for (const newsItem of filteredNewsItems) {
      try {
        if (newsItem.url) {
          await page.goto(newsItem.url, { waitUntil: 'networkidle2' });

          const detailedContent = await page.evaluate(() => {
            const contentElement = document.querySelector('.content.ml-2.mt-5') as HTMLElement;
            return contentElement?.innerHTML || '';
          });

          // <br> 태그 추가
          const formattedDetailContent = detailedContent.replace(/(<\/p>|<\/div>)/g, '<br>$1');

          const translatedTitle = await translateText(newsItem.title);
          const translatedSummary = await translateText(newsItem.summary);
          const translatedPublishedTime = await translateText(newsItem.publishedTime);
          const translatedDetailContent = await translateText(formattedDetailContent);

          await saveToFirestore({
            title: translatedTitle,
            summary: translatedSummary,
            publishedTime: translatedPublishedTime,
            savedTime: format(Timestamp.now().toDate(), "yyyy년 MM월 dd일"),
            detailContent: " " + translatedDetailContent,
            url: newsItem.url,
            usePinIcon: true,
            useNewWindowIcon: true,
            isClicked: 0,
            isPinned: false,
          });

          console.log(`${pageNumber} 페이지 데이터 크롤링 완료`);
        }
      } catch (error) {
        console.error('아이템 처리 중 오류:', error);
      }
    }

    await page.goto(URL, { waitUntil: 'networkidle2' });

    hasNextPage = await page.evaluate(() => {
      const nextButton = document.querySelector('.svg-inline--fa.fa-angle-right');
      console.log("클래스 감지됨!!!");
      return nextButton !== null;
    });

    if (hasNextPage) {
      for (let i = 0; i < pageNumber; i++) {
        await page.click('.svg-inline--fa.fa-angle-right');
      }
      await page.waitForSelector('.content', { visible: true, timeout: 5000 });
      pageNumber++;
    }

    if (pageNumber === 6) break;
  }

  console.log(`크롤링 완료. 총 페이지 수: ${pageNumber - 1}`);
  await browser.close();
}

scrapeAndSave();