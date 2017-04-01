import React, {Component, PropTypes} from 'react';
import { View } from 'react-native';

import { FilterLabel } from '../../components/FilterLabel';
import FilterSubLabel from '../../components/FilterSubLabel';
import FilterCheckBox from '../../components/FilterCheckBox';
import Switch from '../../components/Switch';
import switchStyles from './SearchFormSwitchStyles';

import i18n from '../../i18n';

export default class SearchFormBlockPedicure extends Component {
    static propTypses = {
        service: PropTypes.object,
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = { showBlock: true };
    }

    toggleBlock = nextState => {
        if (nextState !== this.state.showBlock) {
            this.setState({ showBlock: !this.state.showBlock });
        }
    };


    render() {
        const { onChange, service } = this.props;
        const { showBlock } = this.state;

        return (
            <View>
                <Switch
                    title={i18n.pedicure}
                    customStyles={{...switchStyles}}
                    onChange={this.toggleBlock}
                    value={showBlock}
                />
                {showBlock && (
                    <View>
                        <FilterSubLabel title={i18n.filters.nailProcessingMethod} />
                        <FilterCheckBox {...service.classicPedicure} onChange={onChange} withInput={false} />
                        <FilterCheckBox {...service.hardwarePedicure} onChange={onChange} withInput={false} />
                        <FilterCheckBox {...service.europeanPedicure} onChange={onChange} withInput={false} />

                        <FilterSubLabel title={i18n.filters.coverage} />
                        {/*{любой гель-лак}*/}
                        <FilterCheckBox {...service.applyingShellacPedicure} onChange={onChange} withInput={false} />
                        <FilterCheckBox {...service.applyingBioGelPedicure} onChange={onChange} withInput={false} />
                        <FilterCheckBox {...service.applyingNailPolishPedicure} onChange={onChange} withInput={false} />

                        <FilterSubLabel title={i18n.filters.withdrawal} />
                        <FilterCheckBox {...service.removingNailPolishPedicure} onChange={onChange} withInput={false} />
                        <FilterCheckBox {...service.removingBioGelPedicure} onChange={onChange} withInput={false} />
                        <FilterCheckBox {...service.removingShellacPedicure} onChange={onChange} withInput={false} />
                        <FilterCheckBox {...service.removingGePedicure} onChange={onChange} withInput={false} />
                        <FilterCheckBox {...service.removingNailsPedicure} onChange={onChange} withInput={false} />

                        <FilterSubLabel title={i18n.filters.otherServices} />
                        <FilterCheckBox {...service.artDesignPedicure} title="Дизайн ногтей" onChange={onChange} withInput={false} />
                        <FilterCheckBox {...service.extensionPedicure} onChange={onChange} withInput={false} />
                    </View>
                )}
            </View>
        );
    }
}
