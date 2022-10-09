import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import LoadingIndicator from '../../components/loading_indicator';
import Column from '../ui/components/column';
import ColumnBackButtonSlim from '../../components/column_back_button_slim';
import { fetchGroups } from '../../actions/groups';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import ImmutablePureComponent from 'react-immutable-pure-component';
import ColumnLink from '../ui/components/column_link';
import ColumnSubheading from '../ui/components/column_subheading';
import NewGroupForm from './components/new_group_form';
import { createSelector } from 'reselect';
import ScrollableList from '../../components/scrollable_list';
import GroupList from '../group_list'

const messages = defineMessages({
  heading: { id: 'column.groups', defaultMessage: 'New Group' },
  subheading: { id: 'groups.subheading', defaultMessage: 'Your Groups' },
});


const mapStateToProps = state => ({
});

export default @connect(mapStateToProps)

@injectIntl
class Groups extends ImmutablePureComponent {
  static propTypes = {
    params: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.dispatch(fetchGroups());
  }

  render() {
    const { intl, shouldUpdateScroll } = this.props;

    const emptyMessage = <FormattedMessage id='empty_column.groups' defaultMessage="You don't have any groups yet." />;
    return (
      <Column icon='list-ul' heading={intl.formatMessage(messages.heading)}>
        <ColumnBackButtonSlim />

        <NewGroupForm />
      </Column>
    );
  }

}
