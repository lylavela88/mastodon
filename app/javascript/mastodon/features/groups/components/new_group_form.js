import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeListEditorTitle, createGroup } from '../../../actions/groups';
import IconButton from '../../../components/icon_button';
import { defineMessages, injectIntl } from 'react-intl';
import Button from '../../../components/button';

const messages = defineMessages({
  label: { id: 'groups.new.title_placeholder', defaultMessage: 'Group Title' },
  description: { id: 'groups.new.description_placeholder', defaultMessage: 'Group Description' },
  category: { id: 'groups.new.category_placeholder', defaultMessage: 'Select Group Category' },
  accessibility: { id: 'groups.new.accessibilty_placeholder', defaultMessage: 'Accessibility' },
  cover_image: { id: 'groups.new.cover_image_placeholder', defaultMessage: 'Group Cover Image' },
  title: { id: 'lists.new.create', defaultMessage: 'Add Group' },
  createGroup: { id: 'lists.new.created', defaultMessage: 'Create Group' }
});

const mapStateToProps = state => ({
  value: state.getIn(['listEditor', 'title']),
  disabled: state.getIn(['listEditor', 'isSubmitting']),
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(changeListEditorTitle(value)),
  onSubmit: (value) => dispatch(createGroup(value)),
});

export default @connect(mapStateToProps, mapDispatchToProps)
@injectIntl
class NewGroupForm extends React.PureComponent {

  static propTypes = {
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    intl: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    newGroupValues: { title: '', description: '', category: '', is_private: 'false', cover_image: '' }
  };

  handleChange = e => {
    const params = { ...this.state.newGroupValues };
    params[e.target.name] = e.target.value
    this.setState({ 'newGroupValues': params });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit();
  }
  accessibility = v =>{
    const params = { ...this.state.newGroupValues };
    params['is_private'] = v
    this.setState({ 'newGroupValues': params });
    
  }

  handleClick = () => {
    this.props.onSubmit(this.state.newGroupValues);
  }

  render() {
    const { value, disabled, intl } = this.props;

    const label = intl.formatMessage(messages.label);
    const title = intl.formatMessage(messages.title);
    const lb_description = intl.formatMessage(messages.description);
    const lb_category = intl.formatMessage(messages.category);
    const lb_cover_image = intl.formatMessage(messages.cover_image);
    const ls_accessiblity = intl.formatMessage(messages.accessibility);
    const lb_createGroup = intl.formatMessage(messages.createGroup)

    return (
      <form className='compose-form simple_form' onSubmit={this.handleSubmit}>

        <div className='input with_block_label '>


          <input
            className='setting-text input-text'
            name="title"
            value={this.state.newGroupValues.title}
            disabled={disabled}
            onChange={this.handleChange}
            placeholder={label}
            maxLength={100}
          />

        </div>

        <div className='input with_block_label'>


          <textarea
            className='setting-text'
            name="description"
            value={this.state.newGroupValues.description}
            disabled={disabled}
            onChange={this.handleChange}
            placeholder={lb_description}
          >{this.state.newGroupValues.description}</textarea>

        </div>

        <div className='input with_block_label '>
          <select name='category' onChange={this.handleChange} value={this.state.newGroupValues.category} className="input-text">
            <option value="">{lb_category}</option>
            <option value="news">News</option>
            <option value="sports">Sports</option>
            <option value="politics">Politics</option>
            <option value="technology">Technology</option>
            <option value="religion">Religion</option>
            <option value="hobbies">hobbies</option>
          </select>

        </div>

        <div className='row'>



          <label>
            Public
            <input type='radio' name='is_private' value={'false'} onChange={()=>this.accessibility('false')} />
          </label>
          <label>
            Private
            <input type='radio' name='is_private' value={'true'}  onChange={()=>this.accessibility('true')} />
          </label>

        </div>


        <div className='input with_block_label' style={{marginTop:"50px"}}>
          <div className='row'>

            <Button form='live-stream-form' onClick={this.handleClick} ref={this.setRef} >

              {lb_createGroup}
            </Button>

          </div></div>
      </form>
    );
  }

}
