import { useNavigate, useParams } from 'react-router-dom';
import Content from '../../../components/layout/Content';
import { useEffect, useState } from 'react';
import { getTweet } from '../service';

function TweetPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [tweet, setTweet] = useState(null);

  useEffect(() => {
    getTweet(params.tweetId).then(tweet => setTweet(tweet))
    .catch(error => {
      if(error.status === 404){
        navigate('/404');
      }
    });
  }, [navigate, params.tweetId]);

  return (
    <Content title="Tweet detail">
      <div>
        Tweet detail {params.tweetId} goes here...
        {tweet && (
          <div>
            <code>{JSON.stringify(tweet)}</code>
          </div>
        )}
      </div>
    </Content>
  ); 
}

export default TweetPage;
