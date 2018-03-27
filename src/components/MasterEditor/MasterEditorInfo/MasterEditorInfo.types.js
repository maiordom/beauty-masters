// @flow

export type TMasterEditorInfoProps = {
  aboutField: Object,
  actions: Object,
  cardType: string,
  certificatePhotos: Object,
  editStatus: Object,
  isSalon: boolean,
  masterCardId: number | null,
  personalPhotos: Object,
  sectionName: string,
  workPhotos: Object,
};

export type TMasterEditorInfoState = {
  certificatesShow: boolean,
  photoMasterModalVisible: boolean,
  renderLoader: boolean,
};
