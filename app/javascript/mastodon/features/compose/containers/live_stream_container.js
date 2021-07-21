import { connect } from 'react-redux';
import LiveStreamButton from '../components/live_stream_button';
import { changeComposeVisibility } from '../../../actions/compose';
import { openModal, closeModal } from '../../../actions/modal';
import { isUserTouching } from '../../../is_mobile';

const mapStateToProps = state => ({
  isModalOpen: state.get('modal').modalType === 'ACTIONS',
  value: state.getIn(['compose', 'privacy']),
});

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
  isUserTouching
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveStreamButton);
