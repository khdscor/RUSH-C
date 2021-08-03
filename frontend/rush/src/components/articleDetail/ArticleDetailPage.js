import React, {useEffect, useState} from 'react';
import WindowSize from "../WindowSize";
import {CommentsBox, DisplayBox, Outside, PostBox} from '../common/Box';
import ArticleMeta from "./ArticleMeta";
import findWritingApi from "../../api/FindWritingApi";
import ArticleBody from "./ArticleBody";
import Comment from "./Comment";
import CommentWriting from "./CommentWriting";
import findCommentsApi from "../../api/FindCommentsApi";
import {ACCESS_TOKEN} from "../../constants/SessionStorage";
import {withRouter} from "react-router-dom";
import {GROUPED, PRIVATE, PUBLIC} from "../../constants/MapType";
import checkHasILikedApi from "../../api/CheckHasILikedApi";

const ArticleDetailPage = (props) => {
  const accessToken = sessionStorage.getItem(ACCESS_TOKEN);
  const articleId = props.match.params.articleId;
  const mapType = props.match.params.mapType;
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [hasILiked,setHasILiked] = useState(false);
  const [articleTotalLikes, setArticleTotalLikes] = useState(0);
  
  useEffect(() => {
    if (mapType === GROUPED || mapType === PUBLIC || mapType === PRIVATE) {
      findWritingApi(articleId, mapType, props.history).then(articlePromise => {
        setArticle(articlePromise);
        setArticleTotalLikes(articlePromise.totalLikes);
      })
    }
    else {
      alert("주소가 올바르지 않습니다.");
      props.history.push("/");
    }
  }, [articleId, mapType]);

  useEffect(()=>{
    if(accessToken)
    checkHasILikedApi(accessToken, articleId, mapType).then(hasILiked =>{
      setHasILiked(hasILiked);
    })
  },[articleId]);

  useEffect(() => {
    findCommentsApi({
      articleId: articleId,
      mapType: mapType,
      history: props.history}
    ).then(commentPromise => {
      setComments(commentPromise)
    });
  }, [articleId]);

  return (
    <Outside>
      <DisplayBox style={{height: WindowSize().height - 50, marginTop: 15}}>
        <PostBox>
          <ArticleMeta
            author={article ? {
              nickName: article.author ? article.author.nickName : "",
              imageUrl: article.author ? article.author.imageUrl : ""
            } : {
              nickName: "",
              imageUrl: ""
            }}
            createDate={article ? article.createDate : ""}
            markerLat={article ? article.latitude : ""}
            markerLng={article ? article.longitude : ""}
          />
          <ArticleBody
            accessToken={accessToken}
            articleId={articleId}
            mapType={mapType}
            article={article}
            articleTotalLikes={articleTotalLikes}
            setArticleTotalLikes={setArticleTotalLikes}
            hasILiked={hasILiked}
            setHasILiked={setHasILiked}
            history={props.history}
          />
        </PostBox>
        <CommentsBox>
          <CommentWriting
            mapType={mapType}
            articleId={articleId}
            comments={comments}
            setComments={setComments}
            accessToken={accessToken}
            history={props.history}
          />
          {
            comments ? comments.map((comment, idx) =>
              <Comment
                key={idx}
                content={comment.content}
                author={comment.author}
              />
            ) : "아직 댓글이 없습니다 :)"
          }
        </CommentsBox>
      </DisplayBox>
    </Outside>
  );
};

export default withRouter(ArticleDetailPage);
