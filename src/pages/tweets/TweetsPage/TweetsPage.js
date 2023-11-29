import { getLatestTweets } from '../service';
import { useEffect, useState } from 'react';
import Button from '../../../components/shared/Button';
import Content from '../../../components/layout/Content';
import Tweet from '../components/Tweet';

import './TweetsPage.css';
import { Link } from 'react-router-dom';

const EmptyList = () => (
  <div className="tweetsPage-empty">
    <p>Be the first one!</p>
    <Button $variant="primary">Create tweet</Button>
  </div>
);

function TweetsPage() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    getLatestTweets().then(tweets => setTweets(tweets));
  }, []);

  return (
    <Content title="What's going on...">
      <div className="tweetsPage">
        {tweets.length ? (
          <ul>
            {tweets.map(({ id, ...tweet }) => (
              <li key={id}>
                <Link to={`${id}`}>
                  <Tweet {...tweet} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </Content>
  );
}

export default TweetsPage;
