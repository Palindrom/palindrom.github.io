import React, { Component } from 'react';

import './style.css';

class Docs extends Component {
  createMarkup(__html) {
    return { __html };
  }
  constructor() {
    super();
    this.state = { versions: [] };
  }
  getVersionedDocs(version) {
    this.setState({ markup : ''});
    const headers = new Headers({
      Accept: 'application/vnd.github.VERSION.html'
    });
    fetch(
      'https://api.github.com/repos/palindrom/palindrom/contents/README.md?ref=' +
        version,
      { headers, mode: 'cors', redirect: 'follow' }
    )
      .then(res => res.text())
      .then(HTML => {
        this.setState({ markup: this.createMarkup(HTML) });
      });
  }
  componentDidMount() {
    /* get latest release README */
    fetch('https://api.github.com/repos/palindrom/palindrom/tags', {
      mode: 'cors'
    })
      .then(res => res.json())
      .then(tags => {
        tags = tags.sort((a,b) => {
            a = a.name;
            b = b.name;
            a = a[0] === 'v' ? a.substr(1) : a;
            b = b[0] === 'v' ? b.substr(1) : b;
            return b.localeCompare(a);
        })
        this.setState({ versions: tags });
        const latestVersion = tags[0].name;
        this.getVersionedDocs(latestVersion);
      });
  }
  render() {
    return (
      <div className="readme-wrapper container">
        <div className="version-select-wrapper">
          <label htmlFor="version">Docs for version: </label>
          <select id='version'
            onChange={ev => this.getVersionedDocs(ev.target.value)}
            className="version-select"
          >
            {this.state.versions.map(v => {
              return <option key={v.name} value={v.name}>{v.name}</option>;
            })}
          </select>
        </div>
        <div className="dynamic-docs-wrapper">
          {this.state.markup
            ? <div dangerouslySetInnerHTML={this.state.markup} />
            : <div className="docs-loading">
                <h3>Loading documentation..</h3>
              </div>}
        </div>
      </div>
    );
  }
}
export default Docs;
