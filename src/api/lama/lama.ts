import { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { user_code } = req.body;

    if (!user_code) {
      return res.status(400).json({ error: '코드가 제공되지 않았습니다.' });
    }

    // lama.py를 실행하여 코드 분석
    exec(`python3 ./src/api/lama.py "${user_code}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).json({ error: 'Python 코드 실행 중 오류가 발생했습니다.' });
      }
      return res.status(200).json({ result: stdout });
    });
  } else {
    res.status(405).json({ error: '허용되지 않은 메서드입니다.' });
  }
}
