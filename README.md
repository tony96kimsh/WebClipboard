# 🖇 웹 클립보드
> 메모를 쉽게 복사 및 저장 관리할 수 있는 웹 클립보드입니다.

홈화면 | 로그인 화면| 메모 추가
--|--|--|
![alt text](./public/image2.png) | | ![alt text](./public/image.png)

<br>

Links
[🌐 사이트 바로가기](https://tony96kimsh.github.io/WebClipboard/)  
[📘 작업 로그(노션)](https://stump-smartphone-024.notion.site/React-Oauth-Cloud-DB-1e7f398452c380489bf0dbc33195c385?pvs=4)

## 프로젝트 개요

### 제작 배경
QA업무를 하다보면 여러 이슈 보고서 형태를 미리 적어놓고 복사하면 쓰는 일이 많습니다. 보통 메모를 노션이나 별도의 메모앱에 저장하게 되는데 이 경우 다른 메모들과 함께 있게 되어 찾는 시간이 많이 소요되곤 하였습니다. 그래서 윈도우 클립보드를 활용하기도 했지만 상황에 따라 복사할 메모들을 구별할 수 없어서 이러한 불편을 해결한 별도의 명확한 용도의 클립보드 웹앱을 만들게 되었습니다.

### 기술 스택
TypeScript, React, OAuth

### 주요 기능
1. 메모 선택 시 자동 복사
2. 메모 폴더 구분 가능
3. 로컬 스토리지 저장
3. 구글 API를 통한 OAuth 로그인
5. (개발중) 클라우드 DB Superbase 사용


## 프로젝트 구조

### 레이아웃 구성

홈 (싱글페이지 구성)
- 헤더 : 제목 및 로그인 버튼
  - 로그인 모달
- 메인
 - 메인 1: 폴더 선택
 - 메인 2: 메모 추가
 - 메인 3: 메모 리스트
- 풋터


### 폴더 구조
```
/src
├── App.css
├── App.tsx
├── assets
│   └── react.svg
├── components
│   ├── FolderMenu.css
│   ├── FolderMenu.tsx
│   ├── InsertMemo.tsx
│   ├── MemoList.css
│   ├── MemoList.tsx
│   └── MemoModal.tsx
├── data
│   ├── Folder.ts
│   ├── Memo.ts
│   └── Sample.ts
├── index.css
├── main.tsx
└── vite-env.d.ts
```
### 코드 구조
메모 CRUD 코드
``` tsx
```

구글 Oauth 연결 코드
``` tsx
```

#### 로그인 상태에 따른 DB 사용
초기 렌더
``` tsx
```
메모 추가
``` tsx
```

### DB 구조 (superbase)
folders
- id: UUID (PK)
- name: text
- created_at timestampz
- user_email: text (유저 구분용)
memos
- id: UUID (PK)
- folderId: UUID (FK)
- title: text
- content: text
- created_at: timestampz
- updated_at: timestampz
- user_email: text (유저 구분용)


