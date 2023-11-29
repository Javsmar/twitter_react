import { useState } from "react";
import Content from "../../../components/layout/Content";
import Button from "../../../components/shared/Button";
import Photo from "../../../components/shared/Photo";
import Textarea from "../../../components/shared/Textarea";

import "./NewTweetPage.css";
import { createTweet } from "../service";
import { useNavigate } from "react-router-dom";

const MIN_CHARACTERS = 5;
const MAX_CHARACTERS = 150;

function NewTweetPage() {
  const [content, setContent] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

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

  return (
    <Content title="What are you thinking?">
      <div className="newTweetPage">
        <div className="left">
          <Photo />
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
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
    </Content>
  );
}

export default NewTweetPage;
