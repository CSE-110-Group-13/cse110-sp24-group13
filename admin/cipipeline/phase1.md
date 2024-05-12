# Pipeline Timeline

## Currently in Place:
---
### Code Style
1. Avoid too much nesting when possible
    - e.g. Avoid highly nested if statements
2. Use logical and descriptive variables names
    - Long names are okay
    - e.g. Don't use x, y (single letter variables) - Use buttonText, formEntry, dateTag...
    - Follow the same for HTML attributes, id, and class names
3. Use logical and descriptive function names
4. useCamelCase
5. Use a spacing of 4
6. Avoid super-long lines, break into multiple lines if necessary
    - Max line length = Col 80 on VSCode
![image](https://github.com/CSE-110-Group-13/cse110-sp24-group13/assets/110417388/594e2494-ceb1-4990-9a12-43e5a04ecf5e)
7. Avoid being super-abstract and try not to do too much in one function
    - The more complicated the function, the more it can be broken down
8. Try to create functions that can be used in multiple occasions
9. Don't hardcode repeated values, use variables
10. Follow the general HTML schematics
    - Don't use `<div>` for everything, `<div>` is for containers
    - Use common HTML tags like `<nav>`, `<h1>`, `<h2>` for their correct purposes

### Code Reviews for Pull Requests
1. Every week, the 4 teams will be broken up into two pairs
2. Each pair will code review each other's pull requests
3. The pairs change weekly

## By Week 7:

### Implement Code Climate:
1. Initial Review: Code Climate is a productivity tool to maintain code quality
2. Static Analysis Tool: Analyzes code to see duplications, rates, maintainability, etc.
3. Simple to implement: Just have to signup, can do some yml configuration if we want. Seems to be free, some extra features require subscription

### JSDoc Generator
1. Everyone gets the VSCode extension JSDoc Generator
    - Run “Generate JSDoc for the current file” for all changed files before PR
    - Check the generated comments and add your own if necessary

### Once initial structure complete:

1. Unit testing via Jest
    - For every basic JS function, write unit tests while developing the functions to make sure that the functions work
    - Update tests if true changes are made to the function
2. E2E Testing via puppeteer
    - Once we have a basic skeleton, we add E2E based on what features are added
    - Then E2E runs automatically for each PR
    - It will have to be updated as the actual site changes, so the tests are current

### Diagram:
![phase1Diagram](https://github.com/CSE-110-Group-13/cse110-sp24-group13/blob/main/admin/cipipeline/phase1.drawio.png)
