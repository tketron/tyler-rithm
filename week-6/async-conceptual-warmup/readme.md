# Async Conceptual Warmup


## Questions

1.  What does asynchronous mean?

  Asynchonous means pieces of code will pause while a processing or network operation is taking place, then resume running at a later time.

2.  What is a callback function?

A function that is run from inside another function (or in an async context, a function that is run when the asynchronous operation is completed).

3.  What is a promise?

An ES6 global object which can be used as a placeholder for a value that will either resolve (complete successfully) or reject (throw an error) when the asynchronous operation is finished.

4.  Rewrite this "callback-style" AJAX call to use the Promises API

    ```js
    function popUpFact() {
      $.getJSON('http://numbersapi.com/42?json', function(fact) {
        alert(fact.text);
      });
    }
    ```

    ```js
    function popUpFact() {
      $.getJSON('http://numbersapi.com/42?json').then(fact => {
        alert(fact.text);
      }).catch(err => console.log(err))
    }
    ```

5.  Change your solution so that it gets facts for two different numbers,
    requesting both at once, but only popping up the alert once the
    server has responded to both.

    ```js
    function popUpFact() {
      $.getJSON('http://numbersapi.com/42?json').then(fact42 => {
      $.getJSON('http://numbersapi.com/21?json').then(fact21 => {
        alert(fact42.text, fact21.text);
      })}).catch(err => console.log(err))
    }
    ```

6.  What does "resolve" mean?

Resolve is the callback that is fired when a Promise operation finishes successfully.

7.  What does "reject" mean?

Reject is the callback that is fired when a Promise operation does not successfully complete (i.e. an error is thrown).

8.  What is the difference between an `async` function and a regular function?

Async functions return a Promise, but they do so implicitly using the function's return statement.  Async functions can also use the `await` keyword.

9.  Rewrite the above popUpFact function to use `async` / `await`

    ```js
    async function popUpFact() {
      try {
        const fact = await $.getJSON('http://numbersapi.com/42?json');
        alert(fact.text);
      } catch (e) {
        console.log(e);
    }
    ```

10. What does `Promise.all` do?

Collects an array of promises and either resolves when they all resolve, or rejects if any of the promises reject.

11. What does the following function do?

```js
// you can assume that jQuery has been loaded
function getUserData(username) {
  return $.getJSON(`https://api.github.com/users/${username}`);
}
```

This function returns the Promise created by $.getJSON().

