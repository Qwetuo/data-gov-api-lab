const request = require("supertest");
const app = require("./app");

test("GET / should return text: Welcome to Data.gov.sg Dataset Listing", async () => {
  const response = await request(app).get("/");
  expect(response.status).toEqual(200);
  expect(response.body).toEqual("Welcome to Data.gov.sg Dataset Listing");
});

test("GET /:format should return datasets with the stated format", async () => {
   // available: api, csv, kml, pdf, shp
    const format = "api"
    const response = await request(app).get(`/${format}`);
    expect(response.status).toEqual(200);
    for (var i = 0; i < response.body.length; i++){
        expect(response.body[i]).toHaveProperty("resource_format", `${format.toUpperCase()}`);
    }
  });

  test("GET /all/search?format=xxx should return datasets with xxx format", async () => {
    // available: api, csv, kml, pdf, shp
     const format = "api"
     const response = await request(app).get(`/all/search?format=${format}`);
    expect(response.status).toEqual(200);
    for (var i = 0; i < response.body.length; i++){
        expect(response.body[i]).toHaveProperty("resource_format", `${format.toUpperCase()}`);
    }
   });

   test("GET /all/search?format=xxx&freq=yyy should return datasets with xxx format & yyy freq", async () => {
    // format available: api, csv, kml, pdf, shp
     const format = "csv"
     // freq available: Adhoc, Annual, Daily, Half Year, Monthly, Other, Quarterly, Realtime, Weekly
     const freq = "Annual"
     const response = await request(app).get(`/all/search?format=${format}&freq=${freq}`);
    expect(response.status).toEqual(200);
    for (var i = 0; i < response.body.length; i++){
        expect(response.body[i]).toHaveProperty("resource_format", `${format.toUpperCase()}`);
    }
    for (var i = 0; i < response.body.length; i++){
        expect(response.body[i]).toHaveProperty("frequency", `${freq}`);
    }
   });