const { OAuth2Client } = require('google-auth-library')

const client_id="157550748003-v67aafm4k0c63pl76q6a1fh9kaaf9vle.apps.googleusercontent.com"

const token="eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0.zsiLAsVh4yJi80jg.QXRSYZ-Ayo5AcG1qzntNipaJAhid8-bO_rQj7JqK2823Yzm9Dt2AFxN9liRCCrkkW-gQ0T-dYko-JYaaClLKrrcUoFIQ_hWUh7GwG0RJRA0xpEy_QB7B-BRIH54ZlkgyVT3EydzRfqOIZUMGhnr-zBDtGdT1BqVO7YPhou77uuyTQ3JuilWepZeQgDfsz-PVsp5dzDgEwRsQ1paH7WIbvsQopTbPP01XuguHsSPKUFawuQHsgi9zGm-RXhuzVlyEdFHhpa5F61Bu0WTZ4peweqgLh93SSQqk7Dmx5CmreNjqKTa344QsnQBQYckv_kNW7d7CjP2f-rAXNsEk5Lfpr1whHlOfbDV42JBdxdLwtA.E5PW-dhMzvI5aK72sysBvA"

const client = new OAuth2Client(client_id);

async function check(){
  try{
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: client_id,
    });
    const val = ticket.getPayload()

    console.log(val)
  } catch (err) {
    console.log(err)
  }
}

// check()

function parseCookies (request) {
    const list = {};
    const cookieHeader = request.headers?.cookie;
    if (!cookieHeader) return list;

    cookieHeader.split(`;`).forEach(function(cookie) {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });

    return list;
}


var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World!');
  res.end();
  const cookies = parseCookies(req);
  console.log(cookies)
  console.log(req.rawHeaders);
}).listen(8080);