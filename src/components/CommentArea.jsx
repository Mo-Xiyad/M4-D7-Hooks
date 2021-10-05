import { useState, useEffect, useCallback } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = (props) => {
  const [comments, seComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
const fetchBooks = useCallback(async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRiMjFlNjRiYjUzZDAwMTViMTllZDYiLCJpYXQiOjE2MzIzMTM4MzAsImV4cCI6MTYzMzUyMzQzMH0.TlCoWBwSkaUXG_HyFMfAQnvBaxp9w-P3yR9s7r6R1yE"
      );
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          props.asin,
        {
          headers: myHeaders,
        }
      );
      console.log(response);
      if (response.ok) {
        let comments = await response.json();

        seComments(comments);
        setIsLoading(false);
        setIsError(false);
      } else {
        console.log("error");

        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
        console.log(error);
        
      setIsLoading(false);
      setIsError(true);
    }
}, [seComments, setIsLoading, setIsError, props.asin])
 


 useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

 

  return (
    <div>
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
