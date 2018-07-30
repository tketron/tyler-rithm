import axios from 'axios';

export function fetchPosts() {
  return async function(dispatch) {
    const response = await axios.get('http://localhost:3000/api/posts');
    return dispatch({
      type: 'FETCH_POSTS',
      posts: response.data
    });
  };
}

export function deletePost(id) {
  return async function(dispatch) {
    const response = await axios.delete(
      `http://localhost:3000/api/posts/${id}`
    );
    const response2 = await axios.get('http://localhost:3000/api/posts');
    return dispatch({
      posts: response2.data,
      type: 'DELETE_POST',
      message: response.data.message
    });
  };
}

export function addPost(post) {
  return async function(dispatch) {
    const response = await axios.post('http://localhost:3000/api/posts', post);
    return dispatch({
      type: 'ADD_POST',
      post: response.data
    });
  };
}

export function editPost(post) {
  return async function(dispatch) {
    const response = await axios.patch(
      `http://localhost:3000/api/posts/${post.id}`,
      post
    );
    return dispatch({
      type: 'EDIT_POST',
      post: response.data
    });
  };
}

// export function getComment(id) {
//   return async function(dispatch) {
//     const response = await axios.get('http:localhost:3000/');
//   };
// }

export function addComment(comment) {
  return async function(dispatch) {
    const response = await axios.post(
      `http://localhost:3000/api/posts/${comment.post_id}/comments`,
      comment
    );
    const commentResponse = await axios.get(
      `http://localhost:3000/api/posts/${comment.post_id}/comments`
    );
    return dispatch({
      type: 'ADD_COMMENT',
      post_id: comment.post_id,
      comments: commentResponse.data
    });
  };
}
