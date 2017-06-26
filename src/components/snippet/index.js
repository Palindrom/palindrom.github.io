import React, { Component } from 'react';
import HighlightJS from 'highlight.js';
import classNames from 'classnames';
import './style.css';

class Snippet extends Component {
  jSCodeTag;
  codeDemoInterval;
  codeDemoTimeout;
  isMount;
  constructor() {
    super();
    const json = `"name": "John Doe",
"location": "North Pole"`;
    this.state = {
      json1: json,
      json2: json,
      currentCodeSnippet: '',
      fullSnippet: `// connect 
const palindrom = new Palindrom(
  { remoteUrl: 'https://your.palindrom.url' }
);

// use palindrom.obj
palindrom.obj.name = 'John Doe';
palindrom.obj.location = 'North Pole';`
    };
  }
  componentDidMount() {
    this.isMount = true;
    this.codeDemoTimeout = setTimeout(() => {
      if (!this.isMount) return;
      let index = 0;
      this.codeInterval = setInterval(() => {
        if (!this.isMount) return;
        this.setState({
          currentCodeSnippet:
            this.state.currentCodeSnippet + this.state.fullSnippet[index++]
        });
        HighlightJS.highlightBlock(this.jSCodeTag);
        if (index === this.state.fullSnippet.length) {
          this.setState({ codeDemoDone: true });
          clearInterval(this.codeInterval);
        }
      }, 30);
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.codeDemoInterval);
    clearTimeout(this.codeDemoTimeout);
    this.isMount = false;
  }
  onJSONOneChange(value) {
    this.setState({
      everEdited: true,
      json1: value
    });
    const jsonValue = '{' + value + '}';
    try {
      JSON.parse(jsonValue);
      // is valid JS?
      this.setState({
        json2: value
      });
    } catch (e) {}
  }
  onJSONTwoChange(value) {
    this.setState({
      everEdited: true,
      json2: value
    });
    const jsonValue = '{' + value + '}';
    try {
      JSON.parse(jsonValue);
      // is valid JS?
      this.setState({
        json1: value
      });
    } catch (e) {}
  }
  render() {
    return (
      <div>
        <div className="demo-highlight">
          <pre>
            <code
              ref={tag => {
                this.jSCodeTag = tag;
              }}
              className="javascript"
            >
              {this.state.currentCodeSnippet}
            </code>
          </pre>
        </div>

        <div
          className={classNames(
            'jsons-holder',
            this.state.codeDemoDone ? '' : 'hidden-jsons'
          )}
        >
          <div className="json one">
            <h4>Client-side</h4>
            <div className="editorWrapper">
              <span>{'{'}</span>
              <textarea
                value={this.state.json1}
                onChange={ev => this.onJSONOneChange(ev.target.value)}
              />
              <span>{'}'}</span>
            </div>
          </div>
          <div className="json two">
            <h4>Server-side</h4>
            <div className="editorWrapper">
              <span>{'{'}</span>
              <textarea
                value={this.state.json2}
                onChange={ev => this.onJSONTwoChange(ev.target.value)}
              />
              <span>{'}'}</span>
            </div>
          </div>
          <div
            className={classNames(
              'editMe',
              this.state.everEdited ? '' : 'editMe-animation'
            )}
          >
            <span>Edit me!</span>
          </div>

        </div>
      </div>
    );
  }
}
export default Snippet;
