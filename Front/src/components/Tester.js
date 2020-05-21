import React from 'react';
import { axiosInstance } from '../actions/networking';

class Tester extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '',
      response: null,
    };
  }

  handleChange = (event) => {
    this.setState({ path: event.target.value });
  };

  handleSubmit = async () => {
    event.preventDefault();
    const response = await axiosInstance.get(this.state.path);
    this.setState({ response: response });
  };

  renderResponse = () => {
    if (!this.state.response) {
      return;
    }
    return (
      <div className="card w-100">
        <div class="card-header">Status code: {this.state.response.status}</div>
        <div className="card-body">{this.state.response.data}</div>
      </div>
    );
  };

  render() {
    return (
      <div className="row p-3 w-100">
        <form className="w-100" onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <div className="col-sm-1">
              <label htmlFor="content">
                <h4>Tester</h4>
              </label>
            </div>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Test
            </button>
          </div>
        </form>
        {this.renderResponse()}
      </div>
    );
  }
}

export default Tester;
