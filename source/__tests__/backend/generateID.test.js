import { generateID, getIDContainerFromStorage, saveIDContainerToStorage } from "../../backend/generateID.js";

import { mockObjects, initializeLocalStorage } from "../__mocks__/index.js";

/**
 * Tests for ID generation methods
 */
describe('Tests for backend: ID', () => {
  beforeAll(async () => {
    // Mock window and localStorage object, as well as the alert function
    mockObjects();

    // Clear the local storage
    window.localStorage.clear();

    // Initialize the local storage with the tables and ID container
    initializeLocalStorage();
  });

  afterAll(async () => {
    window.localStorage.clear();
  });

  it('Test generate some IDs', () => {
    // Generate some IDs
    for (let i = 0; i < 1000; i++) {
      generateID();
    }

    // Check if the IDs are unique
    const idContainer = getIDContainerFromStorage();
    expect(Object.keys(idContainer).length).toBe(1000);
  });    

  it ('Test save the ID container to storage', () => {
    // Save the ID container to storage
    saveIDContainerToStorage({});

    // Fetch the ID container and check
    const newIDContainer = getIDContainerFromStorage();
    expect(Object.keys(newIDContainer).length).toBe(0);
  });
});