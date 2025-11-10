'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

// Korean translations (default)
const translations: Record<Language, Record<string, string>> = {
  ko: {
    // Header
    'header.logo': 'Ralo Skills',
    'header.dashboard': '대시보드',
    'header.explore': '탐색',
    'header.skills': '스킬',
    'header.categories': '카테고리',
    'header.submit': '제출',
    'header.search.placeholder': '이름, 설명 또는 태그로 스킬 검색...',
    'header.search.minChars': '검색하려면 최소 2자를 입력하세요',
    'header.search.noResults': '스킬을 찾을 수 없습니다',
    'header.search.tryDifferent': '다른 키워드를 시도해보세요',
    'header.search.featured': '추천',

    // Home
    'home.title': 'Ralo Skills',
    'home.subtitle': '강력한 AI 스킬을 발견하고 공유하세요',
    'home.featured': '추천 스킬',
    'home.latest': '최신 스킬',
    'home.downloads': '다운로드',

    // Dashboard
    'dashboard.title': '대시보드',
    'dashboard.subtitle': 'Ralo Skills Hub 개요',
    'dashboard.totalSkills': '전체 스킬',
    'dashboard.featured': '추천',
    'dashboard.totalDownloads': '전체 다운로드',
    'dashboard.categories': '카테고리',
    'dashboard.categoriesTitle': '카테고리',
    'dashboard.recentlyAdded': '최근 추가됨',
    'dashboard.quickActions': '빠른 작업',
    'dashboard.exploreAll': '모든 스킬 탐색',
    'dashboard.exploreAllDesc': 'Claude 스킬의 전체 컬렉션 탐색',
    'dashboard.submitSkill': '스킬 제출',
    'dashboard.submitSkillDesc': '커뮤니티와 커스텀 스킬 공유',
    'dashboard.viewDocs': '문서 보기',
    'dashboard.viewDocsDesc': 'Claude 스킬 생성 및 사용 방법 배우기',

    // Explore
    'explore.title': '스킬 탐색',
    'explore.subtitle': '사용 가능한 모든 AI 스킬 검색 및 탐색',
    'explore.searchPlaceholder': '이름, 설명 또는 태그로 스킬 검색...',
    'explore.filterByCategory': '카테고리별 필터',
    'explore.all': '전체',
    'explore.showing': '표시 중',
    'explore.skills': '스킬',
    'explore.skill': '스킬',
    'explore.in': '카테고리:',
    'explore.matching': '검색어:',
    'explore.noResults': '스킬을 찾을 수 없습니다',
    'explore.tryAdjusting': '검색 또는 필터 조건을 조정해보세요',

    // Skills
    'skills.title': '모든 스킬',
    'skills.subtitle': '{count}개의 AI 스킬 전체 컬렉션 탐색',
    'skills.sortBy': '정렬:',
    'skills.mostPopular': '인기순',
    'skills.name': '이름순',
    'skills.category': '카테고리순',
    'skills.view': '보기:',
    'skills.filterByCategory': '카테고리별 필터',
    'skills.featuredSkills': '추천 스킬',
    'skills.allSkills': '모든 스킬',
    'skills.showing': '표시 중',
    'skills.skillCount': '{count}개 스킬',

    // Categories
    'categories.title': '카테고리별 탐색',
    'categories.subtitle': '{count}개의 다양한 카테고리로 구성된 스킬 탐색',
    'categories.skillCount': '{count}개 스킬',
    'categories.backToAll': '← 모든 카테고리로 돌아가기',
    'categories.inCategory': '이 카테고리의 {count}개 스킬',

    // Submit
    'submit.title': '스킬 제출',
    'submit.subtitle': '커뮤니티와 커스텀 AI 스킬 공유',
    'submit.guidelines': '제출 가이드라인',
    'submit.guidelinesIntro': '스킬을 제출하기 전에 다음 사항을 확인하세요:',
    'submit.guideline1': '스킬 이름이 명확하고 설명적입니다',
    'submit.guideline2': '기능에 대한 자세한 설명을 제공합니다',
    'submit.guideline3': '스킬이 적절히 테스트되고 문서화되었습니다',
    'submit.guideline4': 'GitHub 저장소 링크를 포함합니다 (가능한 경우)',
    'submit.guideline5': '스킬에 올바른 라이선스를 지정합니다',
    'submit.skillName': '스킬 이름',
    'submit.skillNamePlaceholder': '예: 이미지 최적화',
    'submit.skillNameHelper': '스킬에 명확하고 설명적인 이름을 선택하세요',
    'submit.description': '설명',
    'submit.descriptionPlaceholder': '스킬이 무엇을 하는지, 어떻게 작동하는지, 어떤 문제를 해결하는지 설명하세요...',
    'submit.descriptionHelper': '자세한 설명을 제공하세요 (최소 50자)',
    'submit.author': '작성자 이름',
    'submit.authorPlaceholder': '귀하의 이름 또는 조직',
    'submit.authorHelper': '크레딧을 받고 싶은 방식',
    'submit.repository': '저장소 URL',
    'submit.repositoryPlaceholder': 'https://github.com/username/skill-name',
    'submit.repositoryHelper': '스킬 소스 코드 링크 (선택사항이지만 권장됨)',
    'submit.categories': '카테고리',
    'submit.license': '라이선스',
    'submit.tags': '태그',
    'submit.tagsPlaceholder': 'image, optimization, compression, png',
    'submit.tagsHelper': '사용자가 스킬을 찾을 수 있도록 쉼표로 구분된 태그',
    'submit.success': '감사합니다! 스킬 제출이 접수되었으며 곧 검토될 예정입니다.',
    'submit.clearForm': '양식 지우기',
    'submit.submitButton': '스킬 제출',
    'submit.questions': '제출에 대한 질문이 있으신가요?',
    'submit.checkGuidelines': '제출 가이드라인',
    'submit.or': '또는',
    'submit.contactUs': '문의하기',
    'submit.checkOur': '를 확인하세요.',

    // Skill Detail
    'skillDetail.notFound': '스킬을 찾을 수 없습니다',
    'skillDetail.backToSkills': '스킬 목록으로 돌아가기',
    'skillDetail.stars': '스타',
    'skillDetail.forks': '포크',
    'skillDetail.copy': '복사',
    'skillDetail.whatIsIt': '무엇인가요?',
    'skillDetail.howToUse': '사용 방법',
    'skillDetail.keyFeatures': '주요 기능',
    'skillDetail.metadata': '메타데이터',
    'skillDetail.author': '작성자',
    'skillDetail.license': '라이선스',
    'skillDetail.version': '버전',
    'skillDetail.lastUpdate': '마지막 업데이트',
    'skillDetail.viewOnGitHub': 'GitHub에서 보기',
    'skillDetail.relatedSkills': '관련 스킬',
    'header.home': '홈',

    // Common
    'common.loading': '로딩 중...',
    'common.error': '오류',
    'common.close': '닫기',
  },
  en: {
    // Header
    'header.logo': 'Ralo Skills',
    'header.dashboard': 'Dashboard',
    'header.explore': 'Explore',
    'header.skills': 'Skills',
    'header.categories': 'Categories',
    'header.submit': 'Submit',
    'header.search.placeholder': 'Search skills by name, description, or tags...',
    'header.search.minChars': 'Type at least 2 characters to search',
    'header.search.noResults': 'No skills found',
    'header.search.tryDifferent': 'Try different keywords',
    'header.search.featured': 'Featured',

    // Home
    'home.title': 'Ralo Skills',
    'home.subtitle': 'Discover and share powerful AI skills',
    'home.featured': 'Featured Skills',
    'home.latest': 'Latest Skills',
    'home.downloads': 'downloads',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Overview of Ralo Skills Hub',
    'dashboard.totalSkills': 'Total Skills',
    'dashboard.featured': 'Featured',
    'dashboard.totalDownloads': 'Total Downloads',
    'dashboard.categories': 'Categories',
    'dashboard.categoriesTitle': 'Categories',
    'dashboard.recentlyAdded': 'Recently Added',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.exploreAll': 'Explore All Skills',
    'dashboard.exploreAllDesc': 'Browse the complete collection of Claude skills',
    'dashboard.submitSkill': 'Submit a Skill',
    'dashboard.submitSkillDesc': 'Share your custom skill with the community',
    'dashboard.viewDocs': 'View Documentation',
    'dashboard.viewDocsDesc': 'Learn how to create and use Claude skills',

    // Explore
    'explore.title': 'Explore Skills',
    'explore.subtitle': 'Discover and search through all available AI skills',
    'explore.searchPlaceholder': 'Search skills by name, description, or tags...',
    'explore.filterByCategory': 'Filter by Category',
    'explore.all': 'All',
    'explore.showing': 'Showing',
    'explore.skills': 'skills',
    'explore.skill': 'skill',
    'explore.in': 'in',
    'explore.matching': 'matching',
    'explore.noResults': 'No skills found',
    'explore.tryAdjusting': 'Try adjusting your search or filter criteria',

    // Skills
    'skills.title': 'All Skills',
    'skills.subtitle': 'Browse the complete collection of {count} AI skills',
    'skills.sortBy': 'Sort by:',
    'skills.mostPopular': 'Most Popular',
    'skills.name': 'Name',
    'skills.category': 'Category',
    'skills.view': 'View:',
    'skills.filterByCategory': 'Filter by Category',
    'skills.featuredSkills': 'Featured Skills',
    'skills.allSkills': 'All Skills',
    'skills.showing': 'Showing',
    'skills.skillCount': '{count} skills',

    // Categories
    'categories.title': 'Browse by Category',
    'categories.subtitle': 'Explore skills organized by {count} different categories',
    'categories.skillCount': '{count} skills',
    'categories.backToAll': '← Back to all categories',
    'categories.inCategory': '{count} skills in this category',

    // Submit
    'submit.title': 'Submit a Skill',
    'submit.subtitle': 'Share your custom AI skill with the community',
    'submit.guidelines': 'Submission Guidelines',
    'submit.guidelinesIntro': 'Before submitting your skill, please ensure:',
    'submit.guideline1': 'Your skill has a clear and descriptive name',
    'submit.guideline2': 'You provide a detailed description of what the skill does',
    'submit.guideline3': 'The skill is properly tested and documented',
    'submit.guideline4': 'You include a link to the GitHub repository (if available)',
    'submit.guideline5': 'You specify the correct license for your skill',
    'submit.skillName': 'Skill Name',
    'submit.skillNamePlaceholder': 'e.g., Image Optimizer',
    'submit.skillNameHelper': 'Choose a clear, descriptive name for your skill',
    'submit.description': 'Description',
    'submit.descriptionPlaceholder': 'Describe what your skill does, how it works, and what problems it solves...',
    'submit.descriptionHelper': 'Provide a detailed description (minimum 50 characters)',
    'submit.author': 'Author Name',
    'submit.authorPlaceholder': 'Your name or organization',
    'submit.authorHelper': 'How you\'d like to be credited',
    'submit.repository': 'Repository URL',
    'submit.repositoryPlaceholder': 'https://github.com/username/skill-name',
    'submit.repositoryHelper': 'Link to your skill\'s source code (optional but recommended)',
    'submit.categories': 'Categories',
    'submit.license': 'License',
    'submit.tags': 'Tags',
    'submit.tagsPlaceholder': 'image, optimization, compression, png',
    'submit.tagsHelper': 'Comma-separated tags to help users find your skill',
    'submit.success': 'Thank you! Your skill submission has been received and will be reviewed shortly.',
    'submit.clearForm': 'Clear Form',
    'submit.submitButton': 'Submit Skill',
    'submit.questions': 'Questions about submitting? Check out our',
    'submit.checkGuidelines': 'submission guidelines',
    'submit.or': 'or',
    'submit.contactUs': 'contact us',
    'submit.checkOur': '',

    // Skill Detail
    'skillDetail.notFound': 'Skill not found',
    'skillDetail.backToSkills': 'Back to Skills',
    'skillDetail.stars': 'stars',
    'skillDetail.forks': 'forks',
    'skillDetail.copy': 'Copy',
    'skillDetail.whatIsIt': 'What Is It',
    'skillDetail.howToUse': 'How To Use',
    'skillDetail.keyFeatures': 'Key Features',
    'skillDetail.metadata': 'Metadata',
    'skillDetail.author': 'Author',
    'skillDetail.license': 'License',
    'skillDetail.version': 'Version',
    'skillDetail.lastUpdate': 'Last Update',
    'skillDetail.viewOnGitHub': 'View on GitHub',
    'skillDetail.relatedSkills': 'Related Skills',
    'header.home': 'Home',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.close': 'Close',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ko'); // Default to Korean
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'ko' || savedLang === 'en')) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = useMemo(() => ({ language, setLanguage, t }), [language]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
