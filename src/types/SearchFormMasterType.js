// @flow

export type TSearchFormMasterTypeProps = {
  showMasterTypeModal: boolean,
  toggleMasterTypeModal: () => void,
  masterType: Object,
  onMasterTypeSelect: (value: boolean, id: string, modelName: string) => void,
};
