import React from 'react';
import ImmutablePureComponent from 'react-immutable-pure-component';
import StatusContainer from './status_container';
import { makeGetStatus } from '../selectors';
import { connect } from 'react-redux';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';

const makeMapStateToProps = () => {
  const getStatus = makeGetStatus();

  const mapStateToProps = (state, props) => ({
    status: getStatus(state, props),
  });

  return mapStateToProps;
};


class StatusRepliesContainer extends ImmutablePureComponent {

  static propTypes = {
  };

  static defaultProps = {
  };

  state={
    isExpanded: false,
    descendants: null,
  }

  handleExpand = () => {
    this.setState({ isExpanded: true });
  }

  renderReplies = (replies) => {
    return replies && replies.map((reply)=>{
      return (<StatusContainer
        key={reply.get('id')}
        {...this.props}
        id={reply.get('id')}
      />);
    });
  }
  render () {
    let { status } = this.props;
    let { isExpanded } = this.state;
    let descendants = status.get('descendants');
    return (
      <div className='status__all__wrapper'>
        <StatusContainer
          {...this.props}
          onExpand={this.handleExpand}
          isOrigin
          isExpandable={descendants && descendants.count() > 2 && !isExpanded}
        />
        <div className='status__replies__wrapper'>
          {
            isExpanded ? this.renderReplies(descendants) : descendants && this.renderReplies(descendants.slice(0, 2))
          }
        </div>
      </div>
    );
  }

}
export default injectIntl(connect(makeMapStateToProps, null)(StatusRepliesContainer));
