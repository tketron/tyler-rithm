function rootReducer(state = '(￣ー￣)', action) {
  switch (action.type) {
    case 'HAPPY':
      state = '⊂◉‿◉つ'; // happy emoji
      break;
    case 'SAD':
      state = '(ಥ﹏ಥ)';
      break;
    case 'ANGRY':
      state = 'ლಠ益ಠ)ლ';
      break;
    case 'CONFUSED':
      state = '(⊙_☉)';
      break;
  }
  return state;
}

const store = Redux.createStore(rootReducer);

$(function() {
  updateEmoji();

  $('button').click(function(e) {
    store.dispatch({ type: e.target.id.toUpperCase() });
    updateEmoji();
  });

  function updateEmoji() {
    $('#emoji').text(store.getState());
  }
});
