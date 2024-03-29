import { fireEvent, render, screen } from "@testing-library/react";
import { ContextsProvider } from "../contexts/Contexts";
import "@testing-library/jest-dom";
import { RouterProvider } from "react-router-dom";
import { router } from "../routes/router";
import { getOnlyNumbersFromString } from "../functions/getOnlyNumbersFromString";

describe("Should sort job offers by selected option", () => {
  test("should sort job offers by latest", async () => {
    render(
      <ContextsProvider>
        <RouterProvider router={router} />
      </ContextsProvider>
    );

    const jobBarContainer = screen.getByTitle("jobBarContainer");
    expect(jobBarContainer).toBeInTheDocument();

    const sortingSelect = screen.getByTitle("sortingSelect");
    let options: HTMLOptionElement[] = screen.getAllByTitle(
      "sortingSelect-option"
    );

    const days_ago: Number[] = [];
    const days_agoElements = await screen.findAllByTitle("days_ago");

    fireEvent.change(sortingSelect, { target: { value: "latest" } });
    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeFalsy();
    expect(options[3].selected).toBeFalsy();

    days_agoElements.forEach((time) => {
      days_ago.push(Number(getOnlyNumbersFromString(time.innerHTML)));
    });

    const isSorted = (days_ago: Number[]) =>
      days_ago.every((v, i, a) => !i || a[i - 1] >= v);

    expect(isSorted(days_ago)).toBeTruthy();
  });

  test("should sort job offers by oldest", async () => {
    render(
      <ContextsProvider>
        <RouterProvider router={router} />
      </ContextsProvider>
    );

    const jobBarContainer = screen.getByTitle("jobBarContainer");
    expect(jobBarContainer).toBeInTheDocument();

    const sortingSelect = screen.getByTitle("sortingSelect");
    let options: HTMLOptionElement[] = screen.getAllByTitle(
      "sortingSelect-option"
    );

    const days_ago: Number[] = [];
    const days_agoElements = await screen.findAllByTitle("days_ago");

    fireEvent.change(sortingSelect, { target: { value: "oldest" } });
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(options[2].selected).toBeFalsy();
    expect(options[3].selected).toBeFalsy();

    days_agoElements.forEach((time) => {
      days_ago.push(Number(getOnlyNumbersFromString(time.innerHTML)));
    });

    const isSorted = (days_ago: Number[]) =>
      days_ago.every((v, i, a) => !i || a[i - 1] <= v);

    expect(isSorted(days_ago)).toBeTruthy();
  });

  test("should sort job offers by highest salary", async () => {
    render(
      <ContextsProvider>
        <RouterProvider router={router} />
      </ContextsProvider>
    );

    const jobBarContainer = screen.getByTitle("jobBarContainer");
    expect(jobBarContainer).toBeInTheDocument();

    const sortingSelect = screen.getByTitle("sortingSelect");
    let options: HTMLOptionElement[] = screen.getAllByTitle(
      "sortingSelect-option"
    );

    const salaries: Number[] = [];
    const salaryElements = await screen.findAllByTitle("salary");

    fireEvent.change(sortingSelect, { target: { value: "highest salary" } });
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeTruthy();
    expect(options[3].selected).toBeFalsy();

    salaryElements.forEach((salary) => {
      salaries.push(Number(getOnlyNumbersFromString(salary.innerHTML)));
    });

    const isSorted = (salaries: Number[]) =>
      salaries.every((v, i, a) => !i || a[i - 1] >= v);

    expect(isSorted(salaries)).toBeTruthy();
  });

  test("should sort job offers by lowest salary", async () => {
    render(
      <ContextsProvider>
        <RouterProvider router={router} />
      </ContextsProvider>
    );

    const jobBarContainer = screen.getByTitle("jobBarContainer");
    expect(jobBarContainer).toBeInTheDocument();

    const sortingSelect = screen.getByTitle("sortingSelect");
    let options: HTMLOptionElement[] = screen.getAllByTitle(
      "sortingSelect-option"
    );

    const salaries: Number[] = [];
    const salaryElements = await screen.findAllByTitle("salary");

    fireEvent.change(sortingSelect, { target: { value: "lowest salary" } });
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeFalsy();
    expect(options[3].selected).toBeTruthy();

    salaryElements.forEach((salary) => {
      salaries.push(Number(getOnlyNumbersFromString(salary.innerHTML)));
    });

    const isSorted = (salaries: Number[]) =>
      salaries.every((v, i, a) => !i || a[i - 1] <= v);

    expect(isSorted(salaries)).toBeTruthy();
  });
});
