import { vi } from "vitest";

export const setupAuth0Mocks = () => {
  vi.mock("@auth0/auth0-react", () => ({
    useAuth0: vi.fn().mockReturnValue({
      isAuthenticated: true, // Mock the specific property needed
      getAccessTokenSilently: vi.fn(),
    }),
  }));
};
