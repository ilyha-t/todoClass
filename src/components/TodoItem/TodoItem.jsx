import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      updatePeriod: '',
    };
    this.inputRef = React.createRef();
  }

  updateIntervalFunc;

  componentDidMount() {
    this.setState({
      updatePeriod: formatDistanceToNow(this.props.todo.created)
    });
    this.updateIntervalFunc = setInterval(() => {
      this.setState({
        updatePeriod: formatDistanceToNow(this.props.todo.created),
      });
    }, this.props.config.updateIntervalCreated);
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevProps.todo.done && this.props.todo.done) {
      clearInterval(this.props.todo.timer.timerId);
    }
  }

  activateEditMode = () => {
    new Promise((resolve) => {
      if (!this.props.todo.done) {
        this.setState(() => {
          return { edit: !this.state.edit };
        });
      }
      resolve();
    }).then(() => this.inputRef.current.focus());
  };

  cancelEdit = (code) => {
    if (code === 27) {
      this.setState(() => {
        return { edit: false };
      });
    }
  };

  calcTimer = (timer) => {
    const min = Math.floor(timer / 60);
    const sec = timer % 60;
    return `${min <= 9 ? '0': ''}${min}:${sec <= 9 ? '0': ''}${sec}`;
  };

  playTimer = (todo) => {
    if(todo.timer.isPlay) {
      return;
    }
    this.props.changeTimer({...todo, timer: {...todo.timer, isPlay: true}});
  };

  stopTimer = (todo) => {
    if(!todo.timer.isPlay) {
      return;
    }

    clearInterval(todo.timer.timerId);
    this.props.changeTimer({...todo, timer: {...todo.timer, timerId: null, isPlay: false}});
  };

  render() {
    return (
      <li className={(this.props.todo.done ? 'completed' : undefined) || (this.state.edit ? 'editing' : undefined)}>
        <div className="view">
          <form>
            <input
              className="toggle"
              type="checkbox"
              checked={this.props.todo.done}
              onChange={() => this.props.doneTodo(this.props.todo)}
              id={this.props.todo.id}
            />
            <label className="todo-item" htmlFor={this.props.todo.id}>
              <span className="title">{this.props.todo.description}</span>
              <span className="description" onClick={e => e.preventDefault()}>
                  <button className="icon icon-play" onClick={() => this.playTimer(this.props.todo)}></button>
                  <button className="icon icon-pause" onClick={() => this.stopTimer(this.props.todo)}></button>
                {this.calcTimer(this.props.todo.timer.value)}
              </span>
              <span className="created">{this.state.updatePeriod}</span>
            </label>
          </form>
          <button className="icon icon-edit" onClick={this.activateEditMode}></button>
          <button className="icon icon-destroy" onClick={() => {
            clearInterval(this.props.todo.timer.timerId);
            this.props.deleteTodo(this.props.todo.id);
          }}></button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.setState(() => {
              return { edit: !this.state.edit };
            });
          }}
        >
          <input
            className="edit"
            onChange={(e) => {
              this.props.editTodo(this.props.todo, e.target.value);
            }}
            onKeyDown={(e) => this.cancelEdit(e.keyCode)}
            value={this.props.todo.description}
            ref={this.inputRef}
          />
          <button type="submit" style={{ display: 'none' }}></button>
        </form>
      </li>
    );
  }
}
