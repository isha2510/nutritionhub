import { HttpResponse, http } from "msw";
import data from "../test-utils/mock-test-data.json";

export const handlers = [
  http.get("http://localhost:3001/api/recipe", () => {
    return HttpResponse.json(data);
  }),
];
