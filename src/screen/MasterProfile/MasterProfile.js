import { connect } from 'react-redux';

import NavBar from '../../components/NavBar';
import MasterProfile from '../../components/MasterProfile/MasterProfile';


const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterProfile));
