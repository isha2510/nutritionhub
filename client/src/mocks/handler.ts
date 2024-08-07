import { HttpResponse, http } from "msw";
import data from "../test-utils/mock-test-data.json";

export const handlers = [
  http.get("http://localhost:3001/api/recipe", () => {
    return HttpResponse.json(data);
  }),
  http.get(`http://localhost:3001/api/recipe/:id`, () => {
    return HttpResponse.json(data[0]);
  }),
  http.post("http://localhost:3001/api/recipe", () => {
    return HttpResponse.json({ status: 201 });
  }),
];
