export type TDictionaryService = {
  id: number,
  key: string,
  title: string,
  categoryId: number,
};

export type TDictionaryCategoryService = {
  id: number,
  key: string,
  parentId: number,
  title: string,
};
