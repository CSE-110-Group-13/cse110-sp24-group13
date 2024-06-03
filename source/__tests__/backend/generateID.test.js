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

  it('', async () => {
    await expect(1).toBe(1);
  });
});