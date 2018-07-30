import uuid from 'uuid/v4';

const INITIAL_STATE = {
  posts: []
};

function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_POST': {
      state = {
        posts: [...state.posts, action.post]
      };
      return state;
      break;
    }
    case 'DELETE_POST': {
      state = {
        posts: action.posts
      };
      return state;
      break;
    }

    case 'EDIT_POST': {
      const posts = state.posts.map(p => {
        if (p.id === action.post.id) {
          return { comments: p.comments, ...action.post };
        } else {
          return p;
        }
      });
      state = {
        posts: posts
      };
      return state;
      break;
    }

    case 'FETCH_POSTS': {
      state = {
        posts: action.posts
      };
      return state;
      break;
    }

    case 'ADD_COMMENT': {
      const editedPosts = state.posts.map(p => {
        if (p.id === action.post_id) {
          return { ...p, comments: action.comments };
        } else {
          return p;
        }
      });
      state = {
        posts: editedPosts
      };
      return state;
      break;
    }
  }
  return state;
}

export default rootReducer;
