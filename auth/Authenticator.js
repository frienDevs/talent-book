var firebaseAuth = require('./FirebaseAuth');

function isAuthenticated(req, res, next) {
    console.log("checking for auth");
    //var token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJlMzlkODkyYzk1MGRlMTdjZWFkNzdjMmE4MTNhYWViMjI1ODgwNTMifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmlyc3QtZmlyZWJhc2UtZjAxY2YiLCJuYW1lIjoiU29vcmEgU293bXlhIiwicGljdHVyZSI6Imh0dHBzOi8vc2NvbnRlbnQueHguZmJjZG4ubmV0L3YvdDEuMC0xL3MxMDB4MTAwLzI2Nzg1MV8xMDA5MzA2NDAwMDI3NTdfNDQ3MDU0OF9uLmpwZz9vaD1iMjlhNTQwNDViMjEyZDZjZmM2ODdmYjlmN2EwZTExMCZvZT01OTNGRTAwQSIsImF1ZCI6ImZpcnN0LWZpcmViYXNlLWYwMWNmIiwiYXV0aF90aW1lIjoxNDg2ODA4ODE4LCJ1c2VyX2lkIjoibFpIU1M4aGlTc2R2a29UZ1B4dXU3RGRESnhaMiIsInN1YiI6ImxaSFNTOGhpU3NkdmtvVGdQeHV1N0RkREp4WjIiLCJpYXQiOjE0ODY4MDg4MTgsImV4cCI6MTQ4NjgxMjQxOCwiZW1haWwiOiJ5YXNoYXNyaS4xOTkxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJmYWNlYm9vay5jb20iOlsiMTIwMTg5MTM0MzI0MDAwOSJdLCJlbWFpbCI6WyJ5YXNoYXNyaS4xOTkxQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6ImZhY2Vib29rLmNvbSJ9fQ.BSUAyvpl9LSyH3N336l-wXaxzJic3DdcZ6MTR_kV9ABsJvRZxdvn1FISeYbTVsBn7YNi6r1_BqKEOo8av_oru0A8B7tqvNVJrkgAYUQ2mBIcuiVI37ur6Wp3cASA_8CPzlsaO3rkzSmNF16g6ez6j-Zt9wsR_S5JlLHTFGhIuphKPcnrEwTvTtz31IjPRUIU059AQi8Z9If2cFHQS0JK1e-wQo216JywaT3lSMCh1WlR7pQgb5Dhcur_lNwOZcMODXyu1p14ohV485X9LXH-WCJmPe0jVINYMCjBk3i1srltvLed2mH_i_xC0_HVIlmecXTAyCpO4gtyp3fBOGASfQ';
    var token = ""; // TODO : get token here
    firebaseAuth.authenticate(token, function(uid) {
        console.log("authenticated");
        next();
    }, function(error) {
        console.log("401");
        res.status(401).send();
    });
}

module.exports = isAuthenticated;
