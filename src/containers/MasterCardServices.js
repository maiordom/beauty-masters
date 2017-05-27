// @flow

import { connect } from 'react-redux';
import find from 'lodash/find';
import groupBy from 'lodash/groupBy';

import MasterCardServices from '../components/MasterCard/MasterCardServices';

const mapStateToProps = (state, ownProps) => {
  const servicesDictionaries = {
    ...state.searchForm.serviceManicure,
    ...state.searchForm.servicePedicure,
  };

  const masterServices = groupBy(
    ownProps.services.map(({ serviceId, price, duration }) => {
      const { title, parentServiceId } = find(servicesDictionaries, service => service.id === serviceId);

      return { price, duration, title, serviceId, parentServiceId };
    }),
    'parentServiceId',
  );

  const services = Object.keys(masterServices)
    .map(id => find(servicesDictionaries, service => service.id === Number(id)))
    .map(service => ({
      title: service.title,
      id: service.id,
      services: masterServices[service.id],
    }));

  return { services };
};

export default connect(mapStateToProps)(MasterCardServices);
