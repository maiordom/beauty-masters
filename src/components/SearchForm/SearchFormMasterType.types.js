// @flow
import type { MasterTypeSelectType } from '../../types/SearchFormTypes';

export type TSearchFormMasterTypeProps {
  showMasterTypeModal: boolean,
  toggleMasterTypeModal: () => void,
  masterType: Object,
  onMasterTypeSelect: MasterTypeSelectType
};
