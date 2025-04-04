import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import SearchBar from "../../../components/SearchBar";
import "@testing-library/jest-dom";

const mockSearch = vi.fn();

vi.mock("../../../generated/graphql-types", () => ({
  useGetCitiesQuery: () => ({
    data: { getCities: [] },
    loading: false,
    error: undefined,
  }),
  useSearchCarpoolsLazyQuery: () => [mockSearch, {}],
}));

describe("SearchBar - interaction", () => {
  it("déclenche la recherche en cliquant sur le bouton", () => {
    const { getByRole } = render(
      <SearchBar
        departure="Paris"
        arrival="Lyon"
        date={new Date("2025-04-05")}
        departureTime={new Date("2025-04-05T12:00:00")}
        passengers={1}
        onDepartureChange={() => {}}
        onArrivalChange={() => {}}
        onDateChange={() => {}}
        onTimeChange={() => {}}
        onPassengersChange={() => {}}
      />
    );

    const searchButton = getByRole("button", { name: /rechercher/i });
    fireEvent.click(searchButton);

    expect(mockSearch).toHaveBeenCalledOnce();
  });
});
