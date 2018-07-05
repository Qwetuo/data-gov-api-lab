const request = require("supertest");
const app = require("./app");

test("GET / should return text: Welcome to Data.gov.sg Dataset Listing", async () => {
  const response = await request(app).get("/");
  expect(response.status).toEqual(200);
  expect(response.body).toEqual("Welcome to Data.gov.sg Dataset Listing");
});

test("GET /format/:format should return datasets with the stated format", async () => {
  // available: api, csv, kml, pdf, shp
  const format = "api";
  const response = await request(app).get(`/format/${format}`);
  expect(response.status).toEqual(200);
  expect(response.body[0]).toHaveProperty(
    "resource_format",
    `${format.toUpperCase()}`
  );
});

test("GET /freq/:freq should return datasets with the stated freq", async () => {
  // freq available: Adhoc, Annual, Daily, Half Year, Monthly, Other, Quarterly, Realtime, Weekly
  const freq = "Realtime";
  const response = await request(app).get(`/freq/${freq}`);
  expect(response.status).toEqual(200);
  expect(response.body[0]).toHaveProperty("frequency", `${freq}`);
});

test("GET /all should return all datasets", async () => {
  const response = await request(app).get("/all");
  expect(response.status).toEqual(200);
});

test("GET /all/search?format=xxx should return datasets with xxx format", async () => {
  // available: api, csv, kml, pdf, shp
  const format = "api";
  const response = await request(app).get(`/all/search?format=${format}`);
  expect(response.status).toEqual(200);
  expect(response.body[0]).toHaveProperty(
    "resource_format",
    `${format.toUpperCase()}`
  );
});

test("GET /all/search?format=xxx&freq=yyy should return datasets with xxx format & yyy freq", async () => {
  // format available: api, csv, kml, pdf, shp
  const format = "csv";
  // freq available: Adhoc, Annual, Daily, Half Year, Monthly, Other, Quarterly, Realtime, Weekly
  const freq = "Annual";
  const response = await request(app).get(
    `/all/search?format=${format}&freq=${freq}`
  );
  expect(response.status).toEqual(200);
  expect(response.body[0]).toHaveProperty(
    "resource_format",
    `${format.toUpperCase()}`
  );
  expect(response.body[0]).toHaveProperty("frequency", `${freq}`);
});

test("GET /all/search?name=zzz&org=aaa should return datasets which comes from aaa and includes dataset_name zzz", async () => {
  const org = "Health Promotion Board"
  const name = "Age";
  const response = await request(app).get(`/all/search?name=${name}&org=${org}`);
  expect(response.status).toEqual(200);
  expect(response.body[0].dataset_name).toEqual(
    expect.stringContaining(`${name}`)
  );
  expect(response.body[0].organisation).toEqual(
    expect.stringContaining(`${org}`)
  );
});
