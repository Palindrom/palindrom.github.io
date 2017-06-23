import React, { Component } from 'react';
import logo from '../../assets/logo.png';
import HighlightJS from 'highlight.js';
import classNames from 'classnames';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/theme/github';
import 'brace/mode/json';
import './style.css';

class Snippet extends Component {
  jSCodeTag;
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
    setTimeout(() => {
      let index = 0;
      let interval = setInterval(() => {
        this.setState({
          currentCodeSnippet:
            this.state.currentCodeSnippet + this.state.fullSnippet[index++]
        });
        HighlightJS.highlightBlock(this.jSCodeTag);
        if (index == this.state.fullSnippet.length) {
          this.setState({ codeDemoDone: true });
          clearInterval(interval);
        }
      }, 30);
    }, 1000);
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
        <div className="highlight">
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
              <AceEditor
                mode="json"
                theme="github"
                width="100%"
                height="70px"
                showGutter={false}
                value={this.state.json1}
                onChange={this.onJSONOneChange.bind(this)}
                fontSize="1em"
                name="json1"
                editorProps={{ $blockScrolling: true }}
              />
              <span>{'}'}</span>
            </div>
          </div>
          <div className="json two">
            <h4>Server-side</h4>
            <div className="editorWrapper">
              <span>{'{'}</span>
              <AceEditor
                mode="json"
                theme="github"
                width="100%"
                height="70px"
                showGutter={false}
                value={this.state.json2}
                onChange={this.onJSONTwoChange.bind(this)}
                fontSize="1em"
                name="json2"
                editorProps={{ $blockScrolling: true }}
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
