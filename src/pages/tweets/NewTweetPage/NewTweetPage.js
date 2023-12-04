import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Content from "../../../components/layout/Content";
import Button from "../../../components/shared/Button";
import Photo from "../../../components/shared/Photo";
import Textarea from "../../../components/shared/Textarea";

import "./NewTweetPage.css";
import { createTweet } from "../service";
import { useNavigate } from "react-router-dom";


const MIN_CHARACTERS = 5;
const MAX_CHARACTERS = 150;

const fibonacci = (n) => {
  if(n <= 1 ) return n;
  return fibonacci(n - 1 ) + fibonacci( n - 2 );
};

const HeavyComponent = ({ value }) => {
  const result = useMemo(() => fibonacci(value), [value])
  return <div>
      <code>
        Fibonacci({value}) = {result}
      </code>
    </div>
};

const MemoHeavyComponent = HeavyComponent;

function NewTweetPage() {
  const [content, setContent] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const counterRef = useRef(0);
  const formRef = useRef(null);

  useEffect(() => {
    counterRef.current++;
    console.log(counterRef.current)
  });

  useEffect(() => {
    console.log(formRef);
  }, []);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsFetching(true);
      const tweet = await createTweet({ content });
      navigate(`../${tweet.id}`, { relative: "path" });
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  const characters = `${content.length} / ${MAX_CHARACTERS}`;
  const buttonDisable = content.length <= MIN_CHARACTERS || isFetching;

  const callback = useCallback(() => {}, []);
  const object = useMemo(() => ({}), []);

  return (
    <Content title="What are you thinking?">
      <div className="newTweetPage">
        <div className="left">
          <Photo />
        </div>
        <div className="right">
          <form onSubmit={handleSubmit} ref={formRef}>
            <Textarea
              className="newTweetPage-textarea"
              placeholder="Hey! What's up!"
              value={content}
              onChange={handleChange}
              maxLength={MAX_CHARACTERS}
            />
            <div className="newTweetPage-footer">
              <span className="newTweetPage-characters">{characters}</span>
              <Button
                type="submit"
                className="newTweetPage-submit"
                $variant="primary"
                disabled={buttonDisable}
              >
                Let's go!
              </Button>
            </div>
          </form>
        </div>
      </div>
      <MemoHeavyComponent
        value={37} 
        callback={callback}
        object={object}
        array = {[]}
        />
        
    </Content>
  );
}

export default NewTweetPage;
