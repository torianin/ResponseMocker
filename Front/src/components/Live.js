import React from 'react';
require('../services/ably');
var pako = require('pako');
var sizeof = require('object-sizeof')

class Live extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      size: 0,
      shouldCompress: true,
      error: "",
      name: "",
      messages: [],
    }
    this.input = React.createRef();
    this.textarea = React.createRef();
  }

  componentDidMount() {
    const channel = Ably.channels.get('mocker');
    channel.attach();
    channel.once('attached', () => {
      channel.subscribe((msg) => {
        var message;
        if (this.state.shouldCompress) {
          message = pako.inflateRaw(msg.data, { to: 'string' });
        } else {
          message = msg.data
        }
        this.setState({ 
            size: sizeof(msg.data),
            name: msg.name,
            messages: [message]
        });
      })
    });
  }

  handleSubmit = async () => {
    event.preventDefault();
    const channel = Ably.channels.get('mocker');
    var message;
    if (this.state.shouldCompress) {
      message = pako.deflateRaw(this.textarea.current.value);
    } else {
      message = this.textarea.current.value
    }
    channel.publish(this.input.current.value, message, err => {
      if (err) {
        const error = 'Unable to publish message; err = ' + err.message
        this.setState({ error: error });
        console.log(error);
      }
    });
  };

  handleCheckboxChange = async () => {
    this.setState({
      shouldCompress: event.target.checked,
    });
  };

  render() {
    var error;
    if (this.state.error) {
      error = <div className="alert alert-danger" role="alert">{this.state.error}</div>
    } else {
      error = null
    }
    return (
      <div className="row p-3 w-100 mb-5">
        <form className="w-100" onSubmit={this.handleSubmit}>
          <div class="form-group">
            <input className="form-control" name="name" placeholder="Name" ref={this.input}></input>
          </div>
          <div class="form-group">
            <textarea className="form-control" name="data" placeholder="Data" rows="4" ref={this.textarea}></textarea>
          </div>
          <div class="row d-flex flex-row-reverse w-100">
          <button type="submit" className="btn btn-primary float-right">
            Submit
          </button>
          <div className="form-check form-check-inline">
            <input type="checkbox" className="form-check-input" checked={this.state.shouldCompress} onChange={this.handleCheckboxChange}/>
            <label className="form-check-label">Compress</label>
          </div>
          <div className="form-check form-check-inline">
            <input type="checkbox" className="form-check-input" checked={false} disabled/>
            <label className="form-check-label">Replace dates</label>
          </div>
          </div>

        </form>
        {
          this.state.messages.map((message, index) =>
            <div key={index} className="p-3 mt-3 mb-3 card w-100">
              <div className="card-body">
                <h5 className="card-title">Name: {this.state.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Uncompressed size: {sizeof(message)}B / {sizeof(message)/1000}KB => Compressed size: {this.state.size}B / {this.state.size/1000}KB</h6>
                <p class="card-text">Data: { message }</p>
              </div>
            </div>
          )
        }
        {error}
      </div>
    );
  }
}

export default Live;
