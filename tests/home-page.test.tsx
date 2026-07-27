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
    expect(screen.getByRole("link", { name: "See experience" })).toHaveAttribute("href", "#experience");
    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute("href", "/David_Duong_Resume.pdf");
    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("heading", { name: "Experience" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tools I build with" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Notes and signals" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/davidduonggg",
    );
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:davidduonggg@gmail.com",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/dduong7/",
    );
  });

  it("shows the internship experience", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: "First American" })).toBeInTheDocument();
    expect(screen.getByText("Data Engineer Intern")).toBeInTheDocument();
    expect(screen.getByText("June 2026 - Present")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Temco Logistics" })).toBeInTheDocument();
    expect(screen.getByText("Data Engineer (BI) Intern")).toBeInTheDocument();
    expect(screen.getByText("March 2026 - June 2026")).toBeInTheDocument();
    expect(screen.queryByText("24M+ row comparisons")).not.toBeInTheDocument();
  });

  it("shows technical skills", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: "Languages" })).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("Apache Spark")).toBeInTheDocument();
    expect(screen.getByText("BigQuery")).toBeInTheDocument();
    expect(screen.getByText("Docker")).toBeInTheDocument();
  });
});
