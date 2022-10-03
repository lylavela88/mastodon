import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Column from '../ui/components/column';
import ColumnBackButtonSlim from '../../components/column_back_button_slim';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { createSelector } from 'reselect';
import { fetchGroupDetail } from '../../actions/groups';

const messages = defineMessages({
  heading: { id: 'column.groups', defaultMessage: 'Group' },
  subheading: { id: 'groups.subheading', defaultMessage: 'Your Groups' },
});


const mapStateToProps = (state, props) => ({
  group: state.getIn(['groups', props.params.id])
});

export default @connect(mapStateToProps)
@injectIntl
class GroupDetail extends ImmutablePureComponent {
  static propTypes = {
    params: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    group: ImmutablePropTypes.Group,
    intl: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.dispatch(fetchGroupDetail(this.props.params.id));
  }

  render() {
    const { intl, shouldUpdateScroll, group } = this.props;

    const emptyMessage = <FormattedMessage id='empty_column.groups' defaultMessage="You don't have any groups yet." />;
    return (
      <Column icon='list-ul' heading={intl.formatMessage(messages.heading)}>
        <ColumnBackButtonSlim />

      </Column>
    );
  }

}
