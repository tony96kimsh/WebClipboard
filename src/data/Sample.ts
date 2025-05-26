import type { Folder } from './Folder';

export const sampleFolders: Folder[] = [
  { id: 'f1', name: '프론트엔드', createdAt: new Date('2025-05-01') },
  { id: 'f2', name: '백엔드', createdAt: new Date('2025-05-02') },
  { id: 'f3', name: '다짐', createdAt: new Date('2025-05-03') },
];

import type { Memo } from './Memo';

export const sampleMemos: Memo[] = [
  {
    id: 'm1',
    folderId: 'f1',
    title: '리액트 기초',
    content: 'useState와 useEffect를 배웠다.',
    createdAt: new Date('2025-05-01T10:00:00'),
    updatedAt: new Date('2025-05-01T10:00:00'),
  },
  {
    id: 'm2',
    folderId: 'f1',
    title: '타입스크립트 인터페이스',
    content: 'interface와 type alias 차이를 정리했다.',
    createdAt: new Date('2025-05-02T14:30:00'),
    updatedAt: new Date('2025-05-02T14:30:00'),
  },
  {
    id: 'm3',
    folderId: 'f2',
    title: 'Express 복습',
    content: '라우팅과 미들웨어를 정리함.',
    createdAt: new Date('2025-05-03T09:00:00'),
    updatedAt: new Date('2025-05-03T09:00:00'),
  },
  {
    id: 'm4',
    folderId: 'f3',
    title: '개발 다짐',
    content: '매일 꾸준히 기록하고 회고하기!',
    createdAt: new Date('2025-05-04T20:15:00'),
    updatedAt: new Date('2025-05-04T20:15:00'),
  },
];