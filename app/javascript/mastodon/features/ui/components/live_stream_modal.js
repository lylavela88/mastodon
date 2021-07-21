import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, defineMessages } from 'react-intl';
import Overlay from 'react-overlays/lib/Overlay';
import Button from '../../../components/button';
import classNames from 'classnames';
import { openModal } from '../../../actions/modal';
import { goLive } from '../../../actions/live_stream';

const messages = defineMessages({
  live_stream_title: { id: 'live_stream.title', defaultMessage: 'Live Stream!' },
  go_live: { id: 'live_stream.go_live',  defaultMessage: 'Go Live!'}
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (title, vod, props) => dispatch(goLive(title, vod, props))
});

export default @connect(null, mapDispatchToProps)
@injectIntl
class LiveStreamModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {title: '', vod: '0', disableSubmitButton: true};
    this.handleChange = this.handleChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({disableSubmitButton: true});
    this.props.onSubmit(this.state.title, this.state.vod, this.props);
  }

  handleChange(event) {
    let titleLength = event.target.value.length === 0 || event.target.value.trim().length === 0
    this.setState({title: event.target.value, disableSubmitButton: titleLength});
  }

  handleOptionChange(event) {
    this.setState({vod: event.target.value})
  }

  render () {
    const { value, intl } = this.props;
    return (
      <div className='modal-root__modal live-stream-modal'>
        <div className='live-stream-modal__target'>
          <strong>Live Stream Broadcast</strong>
        </div>
        <div className='live-stream-modal__container'>
          <form className='compose-form' id='live-stream-form' onSubmit={this.handleSubmit}>
            <input
              className='setting-text'
              value={this.state.title}
              onChange={this.handleChange}
              placeholder="Title of Stream"
            />
            <div style={{margin: '1rem 0'}}>Share recording when Live Stream is over?</div>
            <label>
              <input
                name='vod'
                type='radio'
                value='1'
                checked={this.state.vod == '1'}
                onChange={this.handleOptionChange}
              />
              <span dangerouslySetInnerHTML={{ __html: 'Yes' }} />
            </label>
            <label>
              <input
                name='vod'
                type='radio'
                value='0'
                checked={this.state.vod == '0'}
                onChange={this.handleOptionChange}
              />
              <span dangerouslySetInnerHTML={{ __html: 'No' }} />
            </label>
            <br />
            <video id="25gj3fvq" x-webkit-airplay="allow" controls alt="Live" width="97%"></video>
          </form>
        </div>
        <div className='live-stream-modal__action-bar'>
          <Button text={intl.formatMessage(messages.go_live)} form='live-stream-form' onClick={this.handleSubmit} disabled={this.state.disableSubmitButton} ref={this.setRef} />
        </div>
      </div>
    );
  }
}