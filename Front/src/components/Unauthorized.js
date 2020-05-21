import React from 'react';

class Unauthorized extends React.Component {
  render() {
    return (
      <div className="row p-3 w-100">
        <div className="alert alert-warning" role="alert">
          Unauthorized. Please login.
        </div>
      </div>
    );
  }
}

export default Unauthorized;
