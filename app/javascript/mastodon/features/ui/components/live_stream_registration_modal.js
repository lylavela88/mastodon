import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, defineMessages } from 'react-intl';
import Button from '../../../components/button';
import { submitLiveStreamRegistrationForm } from '../../../actions/live_stream';
import { me } from '../../../initial_state';

const messages = defineMessages({
  live_stream_title: { id: 'live_stream.title', defaultMessage: 'Live Stream!' },
  submit: { id: 'live_stream.submit',  defaultMessage: 'Submit Registration'}
});

const mapStateToProps = state => ({
  myAccount: state.getIn(['accounts', me])
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (data) => dispatch(submitLiveStreamRegistrationForm(data))
});

export default @connect(mapStateToProps, mapDispatchToProps)
@injectIntl
class LiveStreamRegistrationModal extends React.PureComponent {
  constructor(props) {
    super(props);
    const { value, intl, myAccount } = this.props;
    this.state = {
      user_name: `@${myAccount.get('username')}`,
      account_id: myAccount.get('id'),
      full_name: '', 
      phone_number: '',
      email: '', 
      organization_name: '', 
      organization_phone_number: '', 
      organization_email: '',
      organization_broadcast_number: '',
      organization_broadcast_hours: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.props.onClose();
  }

  handleChange(event) {
    let name = event.target.name;
    let val = event.target.value;
    this.setState({[name]: val});
  }

  render () {
    const { value, intl } = this.props;

    return (
      <div className='modal-root__modal live-stream-modal'>
        <div className='live-stream-modal__target'>
          <strong>Live Stream Registration</strong>
        </div>
        <div className='live-stream-modal__container'>
          <form className='compose-form simple_form' id='live-stream-form' onSubmit={this.handleSubmit} autoComplete='off'>
            <div className='input with_block_label'>
              <div className='row'>
                <div className='input'>
                  <input
                    name='full_name'
                    className='setting-text'
                    value={this.state.title}
                    onChange={this.handleChange}
                    placeholder="Full Name"
                  />
                </div>
                <div className='input'>
                  <input
                    readOnly={true}
                    name='user_name'
                    value={this.state.user_name}
                    className='setting-text'
                    onChange={this.handleChange}
                    placeholder="User Name"
                  />
                </div>
              </div>
              <div className='row'>
                <div className='input'>
                  <input
                    name='phone_number'
                    className='setting-text'
                    value={this.state.title}
                    onChange={this.handleChange}
                    placeholder="Your Phone Number"
                  />
                </div>
                <div className='input'>
                  <input
                    name='email'
                    className='setting-text'
                    value={this.state.title}
                    onChange={this.handleChange}
                    placeholder="Your Email"
                  />
                </div>
              </div>
              <div className='with_block_label'>
                <label>Organization Information</label>
                <span className='hint' />
                <div className='row'>
                  <div className='input'>
                    <input
                      name='organization_name'
                      className='setting-text'
                      value={this.state.title}
                      onChange={this.handleChange}
                      placeholder="Name"
                    />
                  </div>
                  <div className='input'>
                    <input
                      name='organization_owner'
                      className='setting-text'
                      value={this.state.title}
                      onChange={this.handleChange}
                      placeholder="Owner / Leader"
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='input'>
                    <input
                      name='organization_phone_number'
                      className='setting-text'
                      value={this.state.title}
                      onChange={this.handleChange}
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className='input'>
                    <input
                      name='organization_email'
                      className='setting-text'
                      value={this.state.title}
                      onChange={this.handleChange}
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='input'>
                    <input
                      name='organization_broadcast_number'
                      className='setting-text'
                      value={this.state.title}
                      onChange={this.handleChange}
                      placeholder="How many broadcasts, on average, will you have monthly?"
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='input'>
                    <input
                      name='organization_broadcast_hours'
                      className='setting-text'
                      value={this.state.title}
                      onChange={this.handleChange}
                      placeholder="How many hours on average would you like to broadcast live?"
                    />
                  </div>
                </div>
              </div>

            </div>  
            <br />
          </form>
        </div>
        <div className='live-stream-modal__action-bar'>
          <Button text={intl.formatMessage(messages.submit)} form='live-stream-form' onClick={this.handleSubmit} ref={this.setRef} />
        </div>
      </div>
    );
  }
}