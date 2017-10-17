import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { fetchAndCacheText } from './utils';
import MDViewer from './MDviewer';

import './style.css';

class Docs extends Component {
  constructor(props) {
    super();

    const initState = { versions: [], docsSections: [] };
    if (props.match && props.match.params.section) {
      initState.currentSection = props.match.params.section;
    }
    this.state = initState;
  }

  getAllDocsSections(version) {
    this.setState({ error: false });
    this.setState({ markup: '', docsSections: [] });

    fetchAndCacheText(
      'https://api.github.com/repos/palindrom/palindrom/contents/docs?ref=' +
        version
    )
      .then(filesAndDirs => {
        filesAndDirs = JSON.parse(filesAndDirs);
        if (Array.isArray(filesAndDirs)) {
          /* sort files by name */
          filesAndDirs = filesAndDirs.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
          this.setState({
            docsSections: filesAndDirs.filter(x => x.type === 'file')
          });
          let MDSetCorrectly = false;
          // if section is chosen load it
          if (this.state.currentSection) {
            const MDFile = filesAndDirs.find(
              x => x.name === this.state.currentSection + '.md'
            );
            if (MDFile) {
              // 404
              MDSetCorrectly = true;
              this.setState({ MDUrl: MDFile.url });
            }
          }
          if (!MDSetCorrectly) {
            //load the first MD file
            this.setState({ MDUrl: filesAndDirs[0].url });
          }
        } else {
          // fail over to README.md
          this.setState({
            MDUrl: `https://api.github.com/repos/palindrom/palindrom/contents/README.md?ref=${version}`
          });
        }
      })
      .catch(error => {
        this.setState({ error: '404: Not found' });
        console.error(error);
      });
  }

  fetchDocs() {
    const cacheTimeInMilliseconds = 7200 * 1000; // two hours
    /* get releases */
    fetchAndCacheText(
      'https://api.github.com/repos/palindrom/palindrom/tags',
      cacheTimeInMilliseconds
    )
      .then(tags => {
        tags = JSON.parse(tags);
        tags = tags.sort((a, b) => {
          a = a.name;
          b = b.name;
          a = a[0] === 'v' ? a.substr(1) : a;
          b = b[0] === 'v' ? b.substr(1) : b;
          return b.localeCompare(a);
        });
        tags.unshift({ name: 'master' });
        this.setState({ versions: tags });
        const latestVersion = tags[1].name;

        if (!this.state.currentVersion) {
          // set current version then fetch its docs
          this.setState({ currentVersion: latestVersion }, () => {
            this.getAllDocsSections(latestVersion);
          });
        } else {
          this.getAllDocsSections(this.state.currentVersion);
        }
      })
      .catch(error => {
        this.setState({ error: '404: Not found' });
      });
  }
  componentDidMount() {
    if (this.props.match) {
      const version = this.props.match.params.version;
      const newState = { currentVersion: version };

      if (this.props.match.params.section)
        newState['currentSection'] = this.props.match.params.section;

      this.setState(newState, () => {
        this.fetchDocs();
      });
    } else this.fetchDocs();
  }
  componentWillReceiveProps(props) {
    if (props.match) {
      const version = props.match.params.version;
      this.getAllDocsSections(version);
      this.setState({ redirect: '' });
      if (props.match.params.section)
        this.setState({ currentSection: props.match.params.section });
    }
  }
  render() {
    return (
      <div className="readme-wrapper">
        {this.state.redirect ? <Redirect to={this.state.redirect} /> : ''}
        <div className="version-select-wrapper">
          <div className="left">
            <h1>Documentation</h1>
          </div>
          <div className="right">
            <label htmlFor="version">Docs for version: </label>
            <select
              value={this.state.currentVersion}
              id="version"
              onChange={ev => {
                this.setState({
                  redirect: '/docs/' + ev.target.value,
                  currentVersion: ev.target.value
                });
              }}
              className="version-select"
            >
              {this.state.versions.map((v, key) => (
                <option key={v.name} value={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
          <div className="clearfix" />
        </div>
        <div className="nav-and-readme-wrapper">
          <aside>
            <nav className='navigation'>
              {this.state.docsSections.length ? (
                <div>
                  <h3>Sections</h3>
                  <ul>
                    {this.state.docsSections.map((section, key) => {
                      return (
                        <li key={key}>
                          <Link
                            to={`/docs/${this.state
                              .currentVersion}/${encodeURIComponent(
                              section.name.replace('.md', '')
                            )}`}
                          >
                            {section.name.replace('.md', '').replace(/_/g, ' ')} 
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                ''
              )}
            </nav>
          </aside>
          <main>
            {this.state.error ? (
              <h1>{this.state.error}</h1>
            ) : (
              <MDViewer url={this.state.MDUrl} />
            )}
          </main>
        </div>
      </div>
    );
  }
}
export default Docs;
