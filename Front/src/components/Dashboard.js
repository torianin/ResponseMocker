import React from 'react';
import { connect } from 'react-redux';
import ResponsesList from './ResponsesList';
import ResponseCreate from './ResponseCreate';
import { fetchResponses } from '../actions';

class Dashboard extends React.Component {
  render() {
    return (
      <div className = "mb-5">
        <ResponseCreate />
        <ResponsesList />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { responses: state.responses };
};

export default connect(mapStateToProps, { fetchResponses })(Dashboard);
