import React, { Component } from 'react';
import { fetchAndCacheText } from './utils';

class MDViewer extends Component {
  constructor() {
    super();
    this.state = {};
  }
  createMarkup(__html) {
    return { __html };
  }
  viewMDFile(URL) {
    this.setState({ markup: '' });
    fetchAndCacheText(URL).then(HTML => {
      this.setState(
        { markup: this.createMarkup(HTML) },
        function makeAnchorsClickable() {
          const container = document.getElementById('MD-wrapper');
          if (container) {
            const anchors = container.querySelectorAll('a[href^="#"]');
            for (let i = 0; i < anchors.length; i++) {
              anchors[i].addEventListener('click', function(e) {
                const targetSelector = this.getAttribute('href');
                let targetEl = container.querySelector(targetSelector);

                if (targetEl) {
                  targetEl.scrollIntoView();
                } else {
                  /* Github prepends user-content- to elements IDs */
                  targetEl = container.querySelector(
                    '#user-content-' + targetSelector.substr(1)
                  );
                  if (targetEl) {
                    targetEl.scrollIntoView();
                  }
                }
                e.preventDefault();
              });
            }
          }
        }
      );
    });
  }

  componentWillReceiveProps(props) {
    if (props.url) {
      this.viewMDFile(props.url);
    }
  }
  render() {
    return this.state.markup
      ? <div id="MD-wrapper" dangerouslySetInnerHTML={this.state.markup} />
      : <div className="docs-loading">
          <h3>Loading documentation..</h3>
        </div>;
  }
}
export default MDViewer;
