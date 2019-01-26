# persisted-data-table

## Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn start
```

### Compiles and minifies for production
```
yarn build
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Run your unit tests
```
yarn test:unit
```



- How long did you spend on the test? Would you do anything differently if you had more time?
  - I spent a few days cobbling this together in the evenings. I would write custom styles for the table instead of using Bootstrap if I wanted to spend more time on this.
- In what ways would you adapt your component so that it could be used in many different scenarios where a data table is required?
  - I'd create some conditional slots into the rows to be able to pass more dynamic actions to the table
- What is your favorite CSS property? Why?
  - transition. you can do 90% of a web site/app's animations with transition + transofrm + opacity if you know how to wield them correctly
- What is your favorite modern Javascript feature? Why?
  - template literals! they just really simplify things when you are getting data ready for rendering
- What is your favorite third-party Vue.js library? Why?
  - Vuetify. It's just incredible. The docs could be a bit more straightfoward, but once you work with it for a while you start to see just how good a lot of the baked in components are (their data-tables for example are amazing once you grok them)
