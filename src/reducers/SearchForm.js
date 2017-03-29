import each from 'lodash/each';

import { makeReducer } from '../utils';

import actions from '../constants/search';

export default makeReducer((state, action) => ({
    [actions.SEARCH_SET_FIELD_VALUE]: () => {
        const { sectionName, modelName, value } = action;
        const section = state.searchForm[sectionName];
        const model = section[modelName];

        model.value = value;

        state.searchForm = {...state.searchForm};
        state.searchForm[sectionName] = {...section};
        state.searchForm[sectionName][modelName] = {...model};

        return state;
    },

    [actions.SEARCH_SET_FIELD_PARAM]: () => {
        const { sectionName, modelName, paramValue, paramName } = action;
        const section = state.searchForm[sectionName];
        const model = section[modelName];

        model[paramName] = paramValue;

        state.searchForm = {...state.searchForm};
        state.searchForm[sectionName] = {...section};
        state.searchForm[sectionName][modelName] = {...model};

        return state;
    },

    [actions.SEARCH_SET_ITEM_BY_ID]: () => {
        const { modelName, id, sectionName } = action;
        const section = state.searchForm[sectionName];
        const model = section[modelName];

        each(model.items, item => {
            item.active = item.id === id;

            if (item.active) {
                model.selected = item;
            }
        });

        state.searchForm = {...state.searchForm};
        state.searchForm[sectionName] = {...section};
        state.searchForm[sectionName][modelName] = {...model};
        state.searchForm[sectionName][modelName].items = [...model.items];

        return state;
    }
}));
