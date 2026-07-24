import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HomePage } from "@/components/home-page";

vi.mock("@/components/signal-field", () => ({
  SignalField: () => <div data-testid="signal-field" />,
}));

describe("HomePage", () => {
  it("renders the primary personal site sections", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: "David Duong" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See selected work" })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("heading", { name: "Systems with a pulse" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Notes and signals" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "github.com/davidduonggg" })).toHaveAttribute(
      "href",
      "https://github.com/davidduonggg",
    );
  });

  it("shows the initial project categories", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: "Interface Systems" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Applied AI" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Web Craft" })).toBeInTheDocument();
  });
});
