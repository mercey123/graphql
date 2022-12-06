# graphql

This is a small project to visualize information about students in Johvi campus. You can access this project from [website](https://mercey123-graphql.netlify.app/).

Project created with `React+TypeScript` for more efficiency and interactiveness, `react-select` for fast autocomplete search and `d3` for visually pleasing graphs.<br>
All graphs are interactive, so you can see detailed information.

Here you can check [audit questions](https://beta.01-edu.org/git/root/public/src/branch/master/subjects/graphql/audit) for that project

## Feautures

Profiles have:

-   Useful search-bar with all students from batch1 and batch2
-   Buttons to switch between `Dark` and `Light` theme
-   Sections with text information about student:
    -   Basic user identification
    -   XP amount
    -   User level
    -   Transactions history
-   Static graphs with visual information:
    -   Transaction history over time
    -   Audits history over time
    -   Distribution of students by XP amount (this graph sends many requsts, so it takes 2-3 seconds to load)

## Usage

1. Project tested with node = 16.18.2, so you may need to install it first.
2. After that you should install all dependencies: `npm install` in root directory
3. If all dependencies are installed, next step is to build and run that project:
    1. `npm run build` and then
    2. `serve -s build` to run it
4. After running server you can connect to [localhost:3000](http://localhost:3000)
