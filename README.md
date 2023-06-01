# Posts and Comments

## Overview

This project allows users to view and interact with a list posts. Users can browse through the posts and view their associated comments. Additionally, the UI provides actions for replying to comments and adding tags to them. It also includes filters for searching posts based on username, user ID, or text body.

## Features

### 1. Post List

The left view displays a list of post cards. Each post card contains the following information:

- Title: The title of the post.
- Body: The main content of the post.
- Username: The name of the user of the post author.

### 2. Comments List

The right view displays a list of comments associated with a specific post. When a post is selected from the post list view, the comment list view updates to display the comments related to that post.

### 3. Actions

The UI provides two actions for interacting with comments.

a. Comment Reply: Users can add replies to comments. When a user presses 'Reply' button, a reply input appears, allowing them to type their reply and submit on pressing 'Enter' or unfocus.

b. Comment Tags: Users can add one or more tags to the comments. As the user presses 'New Tag' button, a tag input appears, allowing to type the reply and submit on unfocus. UI suggests relevant tags based on previous entries. The user can select a suggested tag or enter a custom tag if there is no suggestion available.

### 4. Filters

The UI includes filters that enable users to search for specific posts based on username, userId, or post body.

## Development Timeline

1. **3h**: Project setup and environment configuration. Set up linter, project structure, dependencies and Redux store.
2. **1h** (PostList): Implement the post list view. Design and develop the UI components for displaying the post cards. Fetching posts from DB. Implement the functionality to allow users to search among posts.
3. **2h**: Create the comments list view. Design and implement the UI components for displaying the `comments` associated with a selected post. Implement the functionality to allow users to reply to comments (as `replies` were not stored in DB, they were added to the `comment` local state as additional field).
4. **1h**: Add action for adding comment tag. Implement the functionality to allow users to add tags to the comment (not reply). As the existing DB did not include a `tags` feature, I made the decision to store the `tags` locally within the application.
5. **2h**: Test coverage, styling and bug fixes.
6. **1h**: Documentation and finalization. Prepare the project documentation, including the README file, and finalize the project.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
