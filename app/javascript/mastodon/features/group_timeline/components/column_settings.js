import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import { searchGroup } from '../../../actions/groups';
import { connect } from 'react-redux';
import SettingToggle from '../../notifications/components/setting_toggle';
import Icon from 'mastodon/components/icon';
const messages = defineMessages({
  placeholder: { id: 'search.placeholder', defaultMessage: 'Search' },
});
const mapStateToProps = state => ({
  value: state.getIn(['groups', 'title']),
});



const mapDispatchToProps = dispatch => ({
  onSubmit: (value) => dispatch(searchGroup(value)),
});

export default @connect(mapStateToProps, mapDispatchToProps)

@injectIntl
class ColumnSettings extends React.PureComponent {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    style: PropTypes.object,
    intl: PropTypes.object.isRequired,
  };
  state = {
    expanded: false,
    value: ''
  };

  handleChange = (e) => {

    this.setState({ value: `${e.target.value}` });
    this.props.onChange(e.target.value);
  }

  handleClear = (e) => {
    e.preventDefault();

    if (this.state.value.length > 0) {
      this.setState({ value: '' });
    }
  }

  handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.onSubmit(this.state.value);

    } else if (e.key === 'Escape') {
      document.querySelector('.ui').parentElement.focus();
    }
  }

  handleFocus = () => {
    this.setState({ expanded: true });
  }

  handleBlur = () => {
    this.setState({ expanded: false });
  }


  render() {
    const { intl } = this.props;
    const hasValue = this.state.value.length > 0;

    return (
      <div className='search'>
        <label>
          <span style={{ display: 'none' }}>{intl.formatMessage(messages.placeholder)}</span>
          <input
            className='search__input'
            type='text'
            placeholder={intl.formatMessage(messages.placeholder)}
            value={this.state.value}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}

          />
        </label>

        <div role='button' tabIndex='0' className='search__icon' onClick={this.handleClear}>
          <Icon id='search' className={hasValue ? '' : 'active'} />
          <Icon id='times-circle' className={hasValue ? 'active' : ''} aria-label={intl.formatMessage(messages.placeholder)} />
        </div>


      </div>

    );
  }

}
