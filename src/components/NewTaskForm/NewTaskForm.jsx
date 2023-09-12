import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      label: '',
      minutes: 0,
      seconds: 0,
    };
  }

  static defaultProps = {
    config: {
      appName: 'Todo or not Todo?',
    },
  };

  static propTypes = {
    config: PropTypes.object,
  };

  onChangeTimerSec = (seconds) => {
    if (isNaN(Number(seconds))) {
      return;
    }

    if (seconds >= 60) {
      const totalMin = Math.floor(seconds / 60);
      const totalSec = seconds % 60;
      this.setState({ minutes: this.state.minutes + totalMin, seconds: totalSec });
    } else if (seconds === '') {
        this.setState({ label: { ...this.state.label, seconds: 0 } });
    } else {
        this.setState({ seconds });
    }
  };

  onChangeTimerMin = (minutes) => {
    this.setState( {minutes: minutes});
  };

  onSubmitForm = (e) => {
    if (this.state.label.trim().length > 0) {
      this.props.addTodo({...this.state, timer: { value: this.state.minutes * 60 + this.state.seconds, timerId: null, isPlay: true }});
      this.setState({ label:'', minutes: 0, seconds: 0 });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>{this.props.config.appName}</h1>
        <form className="new-todo-form" onKeyDown={e => e.keyCode === 13 && this.onSubmitForm()}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={(e) => this.setState({ label: e.target.value })}
            value={this.state.label}
          />
          <input
            type="number"
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={(e) => this.onChangeTimerMin(Number(e.target.value))}
            onKeyPress={(e) => {
              if (isNaN(Number(e.key))) {
                e.preventDefault();
              }
            }}
            value={this.state.minutes > 0 ? this.state.minutes : ''}
          />
          <input
            type="number"
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={(e) => this.onChangeTimerSec(Number(e.target.value))}
            onKeyPress={(e) => {
              if (isNaN(Number(e.key))) {
                e.preventDefault();
              }
            }}
            value={this.state.seconds > 0 ? this.state.seconds : ''}
          />
        </form>
      </header>
    );
  }
}
