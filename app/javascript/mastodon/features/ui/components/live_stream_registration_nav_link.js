import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import Icon from 'mastodon/components/icon';
import { me } from 'mastodon/initial_state';
import { List as ImmutableList } from 'immutable';
import { FormattedMessage } from 'react-intl';
import { openModal } from '../../../actions/modal';

const mapStateToProps = state => ({
  locked: state.getIn(['accounts', me, 'locked']),
  count: state.getIn(['user_lists', 'follow_requests', 'items'], ImmutableList()).size,
});

export default @withRouter
@connect(mapStateToProps)
class LiveStreamRegistrationNavLink extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  handleClick = ({ target }) => {
    this.props.dispatch(openModal('LIVE_STREAM_REGISTRATION', this.props));
  }

  render () {
    return <a className='column-link column-link--transparent' onClick={this.handleClick} href='#'><Icon className='column-link__icon' id='video-camera' fixedWidth /><FormattedMessage id='navigation_bar.live_stream_registration' defaultMessage='Live Stream Registration' /></a>
  }

}