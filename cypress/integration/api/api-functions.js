import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import { include, result } from "underscore";

const url = "https://api.binance.com";
const response = "";

When("Client is sends GET API to check test connectibity", () => {
  cy.request("GET", url + "/api/v3/ping").then((result) => {
    //console.log(result);
    response = result;
  });
});

When("Client is sends GET API to check server time", () => {
  cy.request("GET", url + "/api/v3/time").then((result) => {
    //console.log(result);
    response = result;
  });
});

When("Client is sends GET trade API with invalid symbol", () => {
  cy.request({
    url: "https://api.binance.com/api/v3/trades?symbol=aaa",
    failOnStatusCode: false,
  }).then((result) => {
    //console.log(result);
    response = result;
  });
});

When("Client is sends GET trade API with valid symbol", () => {
  cy.request(url + "/api/v3/trades?symbol=BNBUSDT&limit=1").then((result) => {
    //console.log(result);
    response = result;
  });
});

When("Client is sends POST API to create a user", () => {
  cy.request({
    method: "POST",
    url: "https://api.binance.com/api/v3/userDataStream",
    failOnStatusCode: false,
  }).then((result) => {
    //console.log(result);
    response = result;
  });
});

When("Client is sends POST API without authentication", () => {
  cy.request({
    method: "POST",
    url: "https://api.binance.com/sapi/v1/portfolio/repay?recvWindow=5000&timestamp=123&signature=abc",
    failOnStatusCode: false,
  }).then((result) => {
    //console.log(result);
    response = result;
  });
});

When("Client is sends GET API to get asset", () => {
  cy.request({
    method: "GET",
    url: "https://testnode3.wavesnodes.com/assets/details",
    failOnStatusCode: false,
    body: {
      ids: ["DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p"],
    },
  }).then((result) => {
    console.log(result);
    response = result;
  });
});

When("Client is sends POST API with invalid authentication", () => {
  cy.request({
    method: "POST",
    url: "https://testnode3.wavesnodes.com/addresses",
    failOnStatusCode: false,
    headers: {
      "x-api-key": "APIKEY",
    },
  }).then((result) => {
    //console.log(result);
    response = result;
  });
});

When("Client is sends GET API to get wallet address", () => {
  cy.request("https://testnode3.wavesnodes.com/addresses")
    .then((result) => {
      //console.log(result);
      response = result;
    })
});

When('Client is sends POST API to hash', ()=>{
  cy.request({method: 'POST', url: 'https://testnode3.wavesnodes.com/utils/hash/fast', failOnStatusCode: false}, "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p"
).then(result =>{
  //console.log(result);
  response = result;
})
})

When('Client is sends POST API to get wallet balance', ()=>{
  cy.request('POST', 'https://testnode3.wavesnodes.com/assets/balance/3N1RAoDr9SwibDJpK2pn7zGZBLQJouA6Mci',{
    ids: ["DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p"]

  }).then(result=>{
    //console.log(result);
    response = result;
  })

})

Then("API is shows 200 status code", () => {
  expect(response.status).to.eq(200);
  expect(response.statusText).to.eq("OK");
});

Then("API is shows 400 status code", () => {
  expect(response.status).to.eq(400);
  expect(response.isOkStatusCode).to.eq(false);
});

Then("API is shows 401 status code", () => {
  expect(response.status).to.eq(401);
  expect(response.isOkStatusCode).to.eq(false);
});

Then("API is shows 403 status code", () => {
  expect(response.status).to.eq(403);
  expect(response.isOkStatusCode).to.eq(false);
});

Then("API is shows 404 status code", () => {
  expect(response.status).to.eq(403);
  expect(response.isOkStatusCode).to.eq(false);
});

And("API results is shows server time", () => {
  expect(response.body.serverTime).not.be.null;
});

And("API status message is shows Bad Request", () => {
  expect(response.statusText).to.deep.eq("Bad Request");
});

And("Response message is shows invalid symbol", () => {
  expect(response.body.msg).to.deep.eq(
    "Illegal characters found in parameter 'symbol'; legal range is '^[A-Z0-9-_.]{1,20}$'."
  );
});

And("User is created successfully", () => {
  expect(response.body.listenKey).is.string;
  expect(response.body.listenKey).not.be.null;
});

And("API response message is invalid token", () => {
  expect(response.body.msg).to.deep.eq("API-key format invalid.");
});

And("Response message is show provided API key is not correct", () => {
  expect(response.body.message).to.deep.eq("Provided API key is not correct");
});

And("Wallet address is shows correctly", () => {
  expect(response.body[0]).to.deep.eq("3N1RAoDr9SwibDJpK2pn7zGZBLQJouA6Mci");
});

And("API message is show asset not found", () => {
  expect(response.body.message).to.deep.eq(
    "Asset does not exist: DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p"
  );
});

And('Wallet balance is showing correctly', ()=>{
  expect(response.body.address).to.deep.eq('3N1RAoDr9SwibDJpK2pn7zGZBLQJouA6Mci')
  expect(response.body.balances[0].assetId).to.deep.eq('DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p')
  expect(response.body.balances[0].balance).to.deep.eq(0)
})