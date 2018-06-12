export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async (dispatch, getState, api) => {
  const state = getState();
  if (state.users.length === 0) {
    const res = await api.get('/users');

    dispatch({
      type: FETCH_USERS,
      payload: res
    });
  } else {
    console.log('state.users已经获取过');
  }
};

export const FETCH_CURRENT_USER = 'fetch_current_user';
export const fetchCurrentUser = id => async (dispatch, getState, api) => {
  try {
    const res = await api.get(`/users/${id}`);

    dispatch({
      type: FETCH_CURRENT_USER,
      payload: res
    });
  } catch (e) {
    console.error(`获取数据 /current_user 出错\n${e}`);
  }
};


export const FETCH_POSTS = 'fetch_posts';
export const fetchPosts = () => async (dispatch, getState, api) => {
  const state = getState();
  if (state.posts.length === 0) {
    try {
      const res = await api.get('/posts');
      dispatch({
        type: FETCH_POSTS,
        payload: res
      });
    } catch (e) {
      console.error(`获取数据 /posts 出错\n${e}`);
    }
  } else {
    console.log('state.posts已经获取过');
  }
};
