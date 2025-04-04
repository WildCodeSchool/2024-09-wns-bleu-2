import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import SearchBar from "../../../components/SearchBar";
import { MockedProvider } from "@apollo/client/testing";
import { GET_CITIES } from "../../../graphql/queries";

const mocks = [
  {
    request: {
      query: GET_CITIES,
    },
    result: {
      data: {
        getCities: [
          { id: "1", name: "Paris" },
          { id: "2", name: "Lyon" },
          { id: "3", name: "Marseille" },
        ],
      },
    },
  },
];

describe("SearchBar - rendering with MockedProvider", () => {
  it("affiche toutes les villes correctement", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchBar
          departure=""
          arrival=""
          date={new Date()}
          passengers={1}
          departureTime={new Date()}
          onDepartureChange={() => {}}
          onArrivalChange={() => {}}
          onDateChange={() => {}}
          onTimeChange={() => {}}
          onPassengersChange={() => {}}
        />
      </MockedProvider>
    );

    await waitFor(() => {
      const parisOptions = screen.getAllByText("Paris");
      const lyonOptions = screen.getAllByText("Lyon");
      const marseilleOptions = screen.getAllByText("Marseille");

      expect(parisOptions).toHaveLength(2);
      expect(lyonOptions).toHaveLength(2);
      expect(marseilleOptions).toHaveLength(2);
    });
  });
});
