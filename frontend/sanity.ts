import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "zsa2c7wy", // PAALALA: I-paste mo dito yung kinopy mo kanina!
  dataset: "production",
  apiVersion: "2024-03-11", // Laging current date kapag nag-setup
  useCdn: false,
});