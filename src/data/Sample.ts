// Sample.ts
import type { Folder } from './Folder';
import type { Memo } from './Memo';

// 고정 UUID
const folder1Id = '6c6fa76a-ecdc-4148-9346-9aa8dfbfb0f1';
const folder2Id = 'e5bd8a2f-ea1d-4c8b-9ee3-947fbf82f4d2';
const folder3Id = 'f5c3f4f1-199f-4714-90c6-3f622c31b5d9';

export const sampleFolders: Folder[] = [
  { id: folder1Id, name: '프론트엔드', createdAt: new Date('2025-05-01') },
  { id: folder2Id, name: '백엔드', createdAt: new Date('2025-05-02') },
  { id: folder3Id, name: '다짐', createdAt: new Date('2025-05-03') },
];

export const sampleMemos: Memo[] = [
  {
    id: '8f351e1b-d3d5-4b59-a879-52e14f98fcb9',
    folderId: folder1Id,
    title: '리액트 기초',
    content: 'useState와 useEffect를 배웠다.',
    createdAt: new Date('2025-05-01T10:00:00'),
    updatedAt: new Date('2025-05-01T10:00:00'),
  },
  {
    id: '1a7b2d4a-69c7-4aa6-8b31-cac6486f50d5',
    folderId: folder1Id,
    title: '타입스크립트 인터페이스',
    content: 'interface와 type alias 차이를 정리했다.',
    createdAt: new Date('2025-05-02T14:30:00'),
    updatedAt: new Date('2025-05-02T14:30:00'),
  },
  {
    id: 'b3040bb3-b2c4-4965-8ac4-2ea5613d30ae',
    folderId: folder2Id,
    title: 'Express 복습',
    content: '라우팅과 미들웨어를 정리함.',
    createdAt: new Date('2025-05-03T09:00:00'),
    updatedAt: new Date('2025-05-03T09:00:00'),
  },
  {
    id: 'd24f7f5a-bb53-42ec-a7aa-5b75d1fc5f94',
    folderId: folder3Id,
    title: '개발 다짐',
    content: '매일 꾸준히 기록하고 회고하기!',
    createdAt: new Date('2025-05-04T20:15:00'),
    updatedAt: new Date('2025-05-04T20:15:00'),
  },
];