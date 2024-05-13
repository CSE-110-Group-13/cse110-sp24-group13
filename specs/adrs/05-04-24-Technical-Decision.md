# Preliminary Technical Decisions
## Status
Accepted
## Context
Attempting to set a path forward before we actually begin implementing.
## Decisions
- This will be a "Multi Page web application" where each component uses multiple html files to render.
- Entries and their related details will be saved in JSON files. This lets us store locally on the browser with browserLocal storage and facilitates features like "x most recent entries."
We expect we can store everything we need to in JSON format.
- We'll be focusing on local first until we get farther in, assuming we get that far.
- We'll try to use a library for markdown editing. Otherwise we'll make our own markdown parser to power the markdown editor.
## Consequences
We're clear on some implementation details and know how to proceed.
