import { schema } from "normalizr";

export const user = new schema.Entity("users");

export const contest = new schema.Entity("contests");

export const briefcase = new schema.Entity("briefcases");

export const stock = new schema.Entity("stocks");

export const contestApplication = new schema.Entity("contestApplications");

export const contestApplicationStocks = new schema.Entity(
  "contestApplicationsStocks",
  {
    stock,
  }
);
