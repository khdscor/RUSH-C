import React, {useEffect, useState} from 'react';
import {Motion, spring} from "react-motion";
import ArticleContent from "./ArticleContent";

const ArticlesList = (props) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(props.isOpened ? (50 * props.myArticles.length) : 0);
  }, [props]);

  const articlePresent = props.myArticles ? props.myArticles.map((article) =>
      <ArticleContent
          article={article}
          hitsory={props.history}
      />
  ) : "";

  const styles = {
    menu: {
      overflow: 'hidden',
    }
  };

  return (
      <div className="App">
        <Motion style={{height: spring(height)}}>
          {
            ({height}) => <div style={Object.assign({}, styles.menu, {height})}>
              {articlePresent}
            </div>
          }
        </Motion>
      </div>
  );
};

export default ArticlesList;