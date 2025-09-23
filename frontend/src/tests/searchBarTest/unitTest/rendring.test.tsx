// src/tests/searchBarTest/unitTest/rendring.test.tsx
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import SearchBar from "../../../components/SearchBar";
import { GET_CITIES } from "../../../graphql/queries";

const mocks = [
  {
    request: { query: GET_CITIES, variables: { city: "Pa" } },
    result: {
      data: {
        getCities: [
          { id: "1", name: "Paris" },
          { id: "3", name: "Marseille" },
        ],
      },
    },
  },
  {
    request: { query: GET_CITIES, variables: { city: "Ly" } },
    result: {
      data: {
        getCities: [{ id: "2", name: "Lyon" }],
      },
    },
  },
];

describe("SearchBar - rendering with MockedProvider", () => {
  it("remplit les datalists après saisie", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchBar
          departure=""
          arrival=""
          date={new Date()}
          departureTime={new Date()}
          passengers={1}
          onDepartureChange={() => {}}
          onArrivalChange={() => {}}
          onDateChange={() => {}}
          onTimeChange={() => {}}
          onPassengersChange={() => {}}
        />
      </MockedProvider>
    );

    // déclenche les lazy queries
    fireEvent.change(screen.getByLabelText("Ville de départ"), {
      target: { value: "Pa" },
    });
    fireEvent.change(screen.getByLabelText("Ville d'arrivée"), {
      target: { value: "Ly" },
    });

    // attends que les <option> soient bien insérées
    await waitFor(() => {
      const depDatalist = document.getElementById("departure-cities")!;
      const arrDatalist = document.getElementById("arrival-cities")!;
      expect(depDatalist.querySelectorAll("option").length).toBeGreaterThan(0);
      expect(arrDatalist.querySelectorAll("option").length).toBeGreaterThan(0);
    });

    const depValues = Array.from(
      document.querySelectorAll("#departure-cities > option")
    ).map((o) => o.getAttribute("value"));

    const arrValues = Array.from(
      document.querySelectorAll("#arrival-cities > option")
    ).map((o) => o.getAttribute("value"));

    expect(depValues).toEqual(expect.arrayContaining(["Paris", "Marseille"]));
    expect(arrValues).toEqual(expect.arrayContaining(["Lyon"]));
  });
});
