import React from "react";
import { render } from "@testing-library/react";
import LineChart from "./LineChart";

describe("LineChart Component", () => {
  it("renders without crashing", () => {
    const testData = [
      {
        id: "typescript",
        experience: {
          allYears: [
            { buckets: [{ percentage: 33.7, id: "not_interested" }, /* ... */] },
            { buckets: [{ percentage: 33.6, id: "would_use" }, /* ... */] },
            /* More years... */
          ],
          year: {
            total: 20124,
            buckets: [
              { id: "interested", count: 4478, percentage: 22.3 },
              /* ... */
            ],
          },
        },
      },
      /* More data objects... */
    ];

    const { container } = render(
      <LineChart data={testData} width={800} height={400} category="interested" />
    );

    expect(container).toBeInTheDocument();
  });
});
