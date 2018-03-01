import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Link from './Link';

class LinkList extends Component {
  render() {
    if (this.props.feedQuery && this.props.feedQuery.loading) {
      return <div>Loading</div>;
    }

    if (this.props.feedQuery && this.props.feedQuery.error) {
      return <div>Error</div>;
    }

    const linksToRender = this.props.feedQuery.feed.links;

    return <div>{linksToRender.map(link => <Link key={link.id} link={link} />)}</div>;
  }
}

const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

export default graphql(FEED_QUERY, { name: 'feedQuery' })(LinkList);
