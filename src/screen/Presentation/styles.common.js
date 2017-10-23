import vars from '../../vars';

const styles = {
  container: {
    backgroundColor: vars.bodyColor,
    flex: 1,
    justifyContent: 'space-between',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  bottomContainer: {
    alignItems: 'center',
  },
  logo: {
    marginBottom: 15,
  },
  title: {
    width: 290,
    marginBottom: 15,
    color: vars.color.white,
  },
  text: {
    color: vars.color.white,
    marginLeft: 15,
  },
  listItem: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  continueButton: {
    alignSelf: 'center',
    backgroundColor: vars.color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {
    color: vars.color.red,
  },
  authButton: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  authText: {
    color: vars.color.white,
  },
};

export default styles;
