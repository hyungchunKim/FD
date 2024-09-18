import requests
import json
import io
import sys

# 기본 인코딩을 UTF-8로 설정
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding='utf-8')

def get_llama_analysis(user_code):
    auth_url = "http://43.203.238.76:8000/auth/token"
    generate_url = "http://43.203.238.76:8000/generate"
    
    # 인증 요청 정보
    auth_data = {
        "username": "sfacspace_4",
        "password": "8045d39136872b73"
    }
    
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    
    # 인증 요청 보내기
    print("Authenticating with Llama API...")
    auth_response = requests.post(auth_url, data=auth_data, headers=headers)
    if auth_response.status_code != 200:
        print(f"Authentication failed: {auth_response.status_code} - {auth_response.text}")
        return None
    
    # 액세스 토큰 가져오기
    auth_data = auth_response.json()
    token = auth_data.get('access_token')
    if not token:
        print("Failed to retrieve access token.")
        return None
    
    print("Token retrieved successfully.")
    
    # Llama API에 코드 분석 요청 보내기
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    generate_body = {
        "user_message": f"""다음 코드를 분석하고 아래 형식에 맞춰 답변해주세요:

각 문제점에 대해 다음 형식으로 작성해주세요:

문제점: [문제점 설명]
수정 사항: [수정 사항 설명]
수정된 코드:
```python
[수정된 코드 부분]
```

분석할 코드:
{user_code}

각 문제점을 개별적으로 처리하고, 수정된 코드는 해당 문제점을 해결하는 부분만 포함해주세요.""",
        "temperature": 0.7,
        "top_p": 0.9
    }
    
    print("Sending analysis request to Llama API...")
    response = requests.post(generate_url, json=generate_body, headers=headers)
    
    if response.status_code != 200:
        print(f"Analysis request failed: {response.status_code} - {response.text}")
        return None
    
    # 응답 내용 반환
    print("Analysis response received successfully.")
    return response.text

def extract_analysis_and_fix(response_text):
    """
    Llama API 응답에서 문제점, 수정사항, 수정된 코드를 각각 추출하는 함수
    """
    if not response_text:
        print("No response text received from Llama API.")
        return []

    analysis_results = []
    current_item = {}
    current_section = None
    code_block = []

    lines = response_text.splitlines()
    for line in lines:
        line = line.strip()
        if line.startswith("문제점:"):
            if current_item:
                analysis_results.append(current_item)
            current_item = {"problem": line[4:].strip()}
            current_section = "problem"
        elif line.startswith("수정 사항:"):
            current_item["solution"] = line[6:].strip()
            current_section = "solution"
        elif line.startswith("수정된 코드:"):
            current_section = "code"
            code_block = []
        elif line.startswith("```python"):
            continue
        elif line.startswith("```"):
            current_item["code"] = "\n".join(code_block)
            current_section = None
        elif current_section == "code":
            code_block.append(line)

    if current_item:
        analysis_results.append(current_item)

    return analysis_results

def display_changes(analysis_results):
    """
    분석 결과를 출력하는 함수
    """
    for i, result in enumerate(analysis_results, 1):
        print(f"문제점 {i}: {result['problem']}")
        print(f"수정 사항 {i}: {result['solution']}")
        print(f"수정된 코드 {i}:")
        print("```python")
        print(result['code'])
        print("```")
        print()

if __name__ == "__main__":
    # 사용자 코드 예시
    user_code = """
 import sqlite3

def get_user_data(user_id):
    conn = sqlite3.connect('example.db')
    cursor = conn.cursor()
    query = f"SELECT * FROM users WHERE id = {user_id}"
    cursor.execute(query)
    return cursor.fetchone()

if __name__ == "__main__":
    user_id = input("Enter user ID: ")
    data = get_user_data(user_id)
    print(data)


    """
    
    # Llama API를 사용하여 취약점 분석 요청
    llama_response = get_llama_analysis(user_code)
    
    if llama_response:
        # 분석 결과와 수정된 코드를 추출
        analysis_results = extract_analysis_and_fix(llama_response)
        
        # 변경된 부분 출력
        display_changes(analysis_results)
    else:
        print("Llama API 응답이 없습니다.")