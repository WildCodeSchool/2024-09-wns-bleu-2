import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "../../../components/SearchBar";

const mockOnSearch = vi.fn();

vi.mock("../../../generated/graphql-types", async (importOriginal) => {
  const actual = await importOriginal<
    typeof import("../../../generated/graphql-types")
  >();
  return {
    ...actual,

    useGetCitiesLazyQuery: () => {
      const trigger = vi.fn();
      return [
        trigger,
        {
          data: {
            getCities: [
              { id: "1", name: "Paris" },
              { id: "2", name: "Lyon" },
            ],
          },
        },
      ] as const;
    },
  };
});

describe("SearchBar - interaction", () => {
  it("déclenche la recherche en cliquant sur le bouton", () => {
    render(
      <SearchBar
        departure="Paris"
        arrival="Lyon"
        date={new Date("2025-04-05")}
        departureTime={new Date("2025-04-05T12:00:00")}
        passengers={1}
        showButton={true}
        showTime={false}
        showKm={false}
        onDepartureChange={() => {}}
        onArrivalChange={() => {}}
        onDateChange={() => {}}
        onTimeChange={() => {}}
        onPassengersChange={() => {}}
        onSearch={mockOnSearch}
        hasResults={false}
        setOpenFilters={() => {}}
      />
    );

    const btn = screen.getByRole("button", { name: /rechercher/i });
    fireEvent.click(btn);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
