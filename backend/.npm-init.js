module.exports = prompt("what's your favorite flavor of ice cream, buddy?", "I LIKE THEM ALL");
module.exports = {
    customField: 'Example custom field',
    otherCustomField: 'This example field is really cool'
  }
  > npm init --yes
Wrote to /home/monatheoctocat/my_package/package.json:

{
  "name": "my_package",
  "description": "make your package easier to find on the npm website",
  "version": "1.0.0",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/monatheoctocat/my_package.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/monatheoctocat/my_package/issues"
  },
  "homepage": "https://github.com/monatheoctocat/my_package"
}
> npm set init-author-email "example-user@example.com"
> npm set init-author-name "example_user"
> npm set init-license "MIT"