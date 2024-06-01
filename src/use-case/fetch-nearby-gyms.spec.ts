import { InMemoryGymsRepository } from "@/repositories/in-memory/in-momery-gyms-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { FetchNearbyUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near gym",
      description: null,
      phone: null,
      latitude: -23.5591942,
      longitude: -46.5836981,
    });

    await gymsRepository.create({
      title: "Far gym",
      description: null,
      phone: null,
      latitude: -21.163709,
      longitude: -47.813523,
    });

    const { gyms } = await sut.execute({
      userLatitude: -23.5591942,
      userLongitude: -46.5836981,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near gym" })]);
  });
});
