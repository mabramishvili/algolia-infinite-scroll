import React, { Component } from 'react';
import { connectInfiniteHits, Highlight } from 'react-instantsearch-dom';

function Hit(props) {
  console.log(props);
  return (
    <article>
      <h1>
        <Highlight attribute="name" hit={props.hit} />
      </h1>
    </article>
  );
}

class InfiniteHits extends Component {
  //sentinel = null;

  onSentinelIntersection = entries => {
    const { hasMore, refineNext } = this.props;

    entries.forEach(entry => {
      if (entry.isIntersecting && hasMore) {
        refineNext();
      }
    });
  };

  componentDidMount() {
    this.observer = new IntersectionObserver(this.onSentinelIntersection);

    this.observer.observe(this.sentinel);
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  render() {
    const { hits } = this.props;

    return (
      <div className="ais-InfiniteHits">
        <ul className="ais-InfiniteHits-list" style={{height: '200px', overflow: 'auto'}}>
          {hits.map(hit => (
            <li key={hit.objectID} className="ais-InfiniteHits-item">
              <Hit hit={hit} />
            </li>
          ))}
          <li
            className="ais-InfiniteHits-sentinel"
            ref={c => (this.sentinel = c)}
          />
        </ul>
      </div>
    );
  }
}

export default connectInfiniteHits(InfiniteHits);
