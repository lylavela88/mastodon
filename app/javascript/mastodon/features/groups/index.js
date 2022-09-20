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
import NewListForm from './components/new_group_form';
import { createSelector } from 'reselect';
import ScrollableList from '../../components/scrollable_list';

const messages = defineMessages({
  heading: { id: 'column.groups', defaultMessage: 'Groups' },
  subheading: { id: 'groups.subheading', defaultMessage: 'Your Groups' },
});

const getOrderedLists = createSelector([state => state.get('groups')], groups => {
  if (!groups) {
    return groups;
  }

  return groups.toList().filter(item => !!item).sort((a, b) => a.get('title').localeCompare(b.get('title')));
});

const mapStateToProps = state => ({
  groups: getOrderedLists(state),
});

export default @connect(mapStateToProps)
@injectIntl
class Groups extends ImmutablePureComponent {

  static propTypes = {
    params: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    groups: ImmutablePropTypes.list,
    intl: PropTypes.object.isRequired,
  };

  componentWillMount () {
    this.props.dispatch(fetchGroups());
  }

  render () {
    const { intl, shouldUpdateScroll, groups } = this.props;

    if (!groups) {
      return (
        <Column>
          <LoadingIndicator />
        </Column>
      );
    }

    const emptyMessage = <FormattedMessage id='empty_column.groups' defaultMessage="You don't have any groups yet." />;

    return (
      <Column icon='list-ul' heading={intl.formatMessage(messages.heading)}>
        <ColumnBackButtonSlim />

        <NewGroupForm />

        <ScrollableList
          scrollKey='groups'
          shouldUpdateScroll={shouldUpdateScroll}
          emptyMessage={emptyMessage}
          prepend={<ColumnSubheading text={intl.formatMessage(messages.subheading)} />}
        >
          // {groups.map(group =>
          //   <ColumnLink key={group.get('id')} to={`/timelines/list/${list.get('id')}`} icon='list-ul' text={list.get('title')} />
          // )}
        </ScrollableList>
      </Column>
    );
  }

}
