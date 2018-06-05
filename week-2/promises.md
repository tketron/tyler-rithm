1. Make a request to https://swapi.co/api/ and then log the response to the console. This tells you what kinds of data are stored in the API.

```javascript
$.getJSON('https://swapi.co/api/')
.then(data => console.log(data))
.catch(err => console.log(err));
```

2. Make a request to the /films/ endpoint, and log out the names of all of the names and directors of the Star Wars films (it's okay if you log the same name more than once.) They should be in the format FILM_NAME - FILM_DIRECTOR.

```javascript
$.getJSON('https://swapi.co/api/films/')
.then(data => 
data.results.forEach(film => console.log(`${film.title} - ${film.director}`)))
.catch(err => console.log(err));
```

3. Make a request to the first planet. Once you get the response, make a request to get information on each of that planet's residents. Once you get THAT information back, log out the name of every resident for that first planet.

```javascript
$.getJSON('https://swapi.co/api/planets/1')
.then(data => {
  let residentsPromises = [];
  data.residents.forEach(resident => {
    residentsPromises.push($.getJSON(resident));
  })
  return Promise.all(residentsPromises)
})
.then(data => data.forEach(resident => console.log(resident.name)))
.catch(err => console.log(err));
```

4. It's a fight for the galaxy! Race two requests: one to the 1st person, and one to the 4th person (based on their ids). If the request to the 1st person is processed first, log a message stating that the 1st person has saved the galaxy. Otherwise, log a message that the galaxy has fallen to the 4th person.

```javascript
var peoplePromises = [];
peoplePromises.push($.getJSON('https://swapi.co/api/people/1'));
peoplePromises.push($.getJSON('https://swapi.co/api/people/4'));
Promise.race(peoplePromises)
.then(person => {
  if (person.name === 'Luke Skywalker') {
    console.log(`${person.name} has saved the galaxy!`);
  } else { 
    console.log(`The galaxy has fallen to ${person.name}`);
  }
})
.catch(err => console.log(err));
```