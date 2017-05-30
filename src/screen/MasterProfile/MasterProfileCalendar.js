import { connect } from 'react-redux';

import NavBar from '../../components/NavBar';
import MasterProfileCalendar from '../../components/MasterProfile/MasterProfileCalendar';


const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterProfileCalendar));
