import axios from 'axios';

// Llama API 요청을 처리하는 함수
export async function get_llama_analysis(user_code: string): Promise<string | null> {
  const auth_url = "http://43.203.238.76:8000/auth/token";
  const generate_url = "http://43.203.238.76:8000/generate";
  
  try {
    // 인증 요청: 액세스 토큰 발급
    const auth_response = await axios.post(auth_url, {
      username: "sfacspace_4",
      password: "8045d39136872b73"
    }, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    const token = auth_response.data.access_token;
    if (!token) {
      console.error("액세스 토큰을 받지 못했습니다.");
      return null;
    }

    // 코드 분석 요청
    const generate_response = await axios.post(generate_url, {
      user_message: `다음 코드를 분석하고 아래 형식에 맞춰 답변해 주세요:

문제점: [문제점 설명]
수정 사항: [수정 사항 설명]
수정된 코드:
\`\`\`python
[수정된 코드]
\`\`\`

분석할 코드:
${user_code}`,
      temperature: 0.7,
      top_p: 0.9
    }, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    return generate_response.data;
  } catch (error: any) {
    // 오류 발생 시 로그 출력
    console.error("Llama API 요청 중 오류 발생:", error.response?.data || error.message);
    return null;
  }
}

// Llama API 응답에서 분석 결과 추출
export function extract_analysis_and_fix(response_text: string) {
  const analysis_results = [];
  let current_item: any = {};
  let current_section: string | null = null;
  let code_block: string[] = [];

  const lines = response_text.split('\n');
  for (const line of lines) {
    const trimmed_line = line.trim();
    
    if (trimmed_line.startsWith("문제점:")) {
      if (Object.keys(current_item).length > 0) {
        analysis_results.push(current_item);
      }
      current_item = { problem: trimmed_line.slice(4).trim() };
      current_section = "problem";
    } else if (trimmed_line.startsWith("수정 사항:")) {
      current_item.solution = trimmed_line.slice(6).trim();
      current_section = "solution";
    } else if (trimmed_line.startsWith("수정된 코드:")) {
      current_section = "code";
      code_block = [];
    } else if (trimmed_line.startsWith("```python")) {
      continue;
    } else if (trimmed_line.startsWith("```")) {
      current_item.code = code_block.join('\n');
      current_section = null;
    } else if (current_section === "code") {
      code_block.push(trimmed_line);
    }
  }

  if (Object.keys(current_item).length > 0) {
    analysis_results.push(current_item);
  }

  return analysis_results;
}
