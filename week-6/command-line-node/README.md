# Command Line Node Part 1

For this exercise, we are going to build a simple Node.js script which allows us to make a request to an API and store the data in a text file!

We will be using the following modules:

- [fs](https://nodejs.org/api/fs.html#fs_file_system) - for reading and writing to a file
- [process.argv](https://nodejs.org/api/process.html#process_process_argv) - for gathering arguments from the command line
- [axios](https://www.npmjs.com/package/axios) - for making API requests (this is an NPM package)

### Requirements

1.  This script should be invokable from the command line using `node ./dadjoke.js 'search term'`.
1.  The script should make an API request (via `axios`) to the [dad joke API](https://icanhazdadjoke.com/api) to search for a joke based on the search term.
1.  If jokes matching the term are found, print a random joke from that list to the terminal and also save the joke to a file called `jokes.txt`.
1.  If no matching jokes were found, print a message to the user that no jokes were found for that search term.

**Example Usage:**

```sh
$ node ./dadjoke.js 'hat'
What did the scarf say to the hat? You go on ahead, I am going to hang around a bit longer.

$ node ./dadjoke.js 'cactus'
Uh oh! No jokes were found.
```

### Bonus

1.  Implement the [prompt](https://github.com/flatiron/prompt) module to ask a user for some input instead of having to pass in an argument from the command line.
2.  Each time you call the script and new jokes are found, instead of overwriting the file `jokes.txt`, add to it.

# Command Line Node Part 2

For this exercise, we are going to pretend to be building a mailing list for a recruiter. This is actually a semi-realistic task that you might get on the job (just ask Michael).

Your job is to read and process `data.json`, which is a giant JSON array with dummy data. Here are the fields in that file:

```
firstName
lastName
email
city (could be null)
state (could be null)
company
```

### Requirements

1.  Your script should format an email like so (interpolate the values):

    ```
    Hello {firstName},

    I saw your experience at {company} and thought you would be a great fit for us here at LinkedList. Let me know if you're interested in getting coffee or whatever recruiters say...

    Best,

    Randy Random
    LinkedList
    ```

1.  Your script should place this email in a file marked with the email address of each person: e.g. `michael@rithmschool.com.txt`.
1.  You should only generate email files to people who live in San Francisco, Seattle, or Portland since that's where our fake offices are located.
1.  Your script should also produce a file called `potentials.txt` which should include a list of names, emails, and companies (one entry per line) if they live in California, Washington, or Oregon but not SF, Seattle, or Portland (or if `city` is null.)

### Bonus

1.  Generate HTML files instead of text files that have nicely-formatted emails.
