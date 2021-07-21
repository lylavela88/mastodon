import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, defineMessages } from 'react-intl';
import IconButton from '../../../components/icon_button';
import Overlay from 'react-overlays/lib/Overlay';
import Motion from '../../ui/util/optional_motion';
import spring from 'react-motion/lib/spring';
import detectPassiveEvents from 'detect-passive-events';
import classNames from 'classnames';
import Icon from 'mastodon/components/icon';
import { openModal } from '../../../actions/modal';

const messages = defineMessages({
  live_stream_title: { id: 'live_stream.title', defaultMessage: 'Live Stream!' },
});

export default @injectIntl
class LiveStreamButton extends React.PureComponent {
  state = {
    open: false,
    placement: 'bottom',
  };
   
  handleToggle = ({ target }) => {
    if (this.props.isUserTouching()) {
      if (this.state.open) {
        this.props.onModalClose();
      } else {
        this.props.dispatch(openModal('LIVE_STREAM', this.props));
      }
    } else {
      this.props.dispatch(openModal('LIVE_STREAM', this.props));
    }
  }

  render () {
    const { value, intl } = this.props;
    const { open, placement } = this.state;

    return (
      <div className={classNames('privacy-dropdown', placement, { active: open })} onKeyDown={this.handleKeyDown}>
        <div className={classNames('privacy-dropdown__value')}>
          <IconButton
            className='privacy-dropdown__value-icon'
            icon='video-camera'
            title={intl.formatMessage(messages.live_stream_title)}
            size={18}
            expanded={open}
            active={open}
            inverted
            onClick={this.handleToggle}
            style={{ height: null, lineHeight: '27px' }}
          />
        </div>
      </div>
    );
  }
}