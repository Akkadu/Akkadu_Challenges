# user-profile

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



Users profile project structure and implementation factors:-

Assets: 
Contains directories for icons and styles. Styles that are common across Vue components are distributed across different files under partials directory. Classes which aren’t used in multiple components are written in .vue files as this helps in debugging later also keeps the styles directory structure simple here. Standard 7-1 sass structure is avoided considering the simplicity of the project.

Components: Parts of code that can be abstracted away with their functionality(JS) and/or styles(SCSS) written in different files here. 
No-user.vue to show a button to request users when user list is empty.
User-card.vue represents each card in user list along with delete functionality.
User-info.vue is implemented as each information under user list and user details has similar structure.

Router: Only 1 index.js file for the 2 routes of this project. If the scope of the project was larger, multiple files with their would have been exported from this file.

Services:
Again, considering the project scope, a single index file is present here for the 1 service to request users. More functions can be added to Service class, if needed, using the same makeRequest method to construct the axios call. 

The service instance is saved in Vue prototype as $service to be used in components.
Also saved under Vue.service to be used in store.

Store:
Just a single file here houses state, mutations, actions and getters. Other approaches could be to: Separate the state, mutations, actions and getters into different files for a medium sized project.
For a large project, store can be broken into multiple files for a particular part of the project, like a file for users (state, actions, mutations and getters) and other for teams, etc.

LoadUsers method here invokes the getUsers method in services. As it’s a single request, Promises.all is not needed here. Also, errors are catched both in service and here. Another approach can be to keep the errors in the event chain and catch them within vue file where the action is invoked, for instance in App.vue for this project.

Views: The 2 routes for User list and User profile has separate files here. User-details.vue invokes deleteUser action in store, and gets single user details from a store getter. User-list.vue fetches users from store state using mapState.

App.vue:
Invokes loadUsers action using $store.dispatch, mapAction could have been used here but avaoided as it’s just syntactic sugar and would add a few more lines to code.
Main.scss is imported in styles. Fonts are set here as the entire project uses a single font style. Media queries for font sizes for different screen width are also mentioned here.


