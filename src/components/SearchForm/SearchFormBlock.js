import React, {Component} from 'react';
import { View } from 'react-native';

import { FilterLabel } from '../../components/FilterLabel';
import FilterSubLabel from '../../components/FilterSubLabel';
import FilterCheckBox from '../../components/FilterCheckBox';

import i18n from '../../i18n';

export default class SearchFormBlock extends Component {
    constructor(props) {
        super(props);

        this.state = { showBlock: true };
    }

    toggleBlock = () => this.setState({ showBlock: !this.state.showBlock });

    render() {
        const { type } = this.props;
        const { showBlock } = this.state;

        return (
            <View>
                // todo add toggle
                <FilterLabel text={type === 'manicure' ? i18n.manicure : i18n.pedicure} />
                {showBlock && (
                    <View>
                        <FilterSubLabel title={i18n.filters.nailProcessingMethod} />
                        <FilterCheckBox title={i18n.filters.classic} withInput={false} />
                        <FilterCheckBox title={i18n.filters.hardware} withInput={false} />
                        <FilterCheckBox title={i18n.filters.european} withInput={false} />

                        <FilterSubLabel title={i18n.filters.coverage} />
                        <FilterCheckBox title={i18n.filters.anyNailGel.nom} withInput={false} />
                        <FilterCheckBox title={i18n.filters.shellac.nom} withInput={false} />
                        <FilterCheckBox title={i18n.filters.bioGel.nom} withInput={false} />
                        <FilterCheckBox title={i18n.filters.varnish.nom} withInput={false} />

                        <FilterSubLabel title={i18n.filters.withdrawal} />
                        <FilterCheckBox title={i18n.filters.varnish.nom} withInput={false} />
                        <FilterCheckBox title={i18n.filters.bioGel.nom} withInput={false} />
                        <FilterCheckBox title={i18n.filters.shellac.nom} withInput={false} />
                        <FilterCheckBox title={i18n.filters.anotherNailGel.nom} withInput={false} />
                        <FilterCheckBox title={i18n.filters.removingNails.nom} withInput={false} />

                        <FilterSubLabel title={i18n.filters.otherServices} />
                        <FilterCheckBox title={i18n.filters.nailDesign} withInput={false} />
                        <FilterCheckBox title={i18n.filters.nailExtension} withInput={false} />
                    </View>
                )}
            </View>
        );
    }
}
