const fetchMock = require('fetch-mock');

const obj = {
    user: {
      fullName: "Albert Einstein",
      firstName$: "Albert",
      lastName$: "Einstein",
      resetNameClicked$: false
    }
};

fetchMock.mock('*', (url, req) => {
    /*
    This mock server deliberately uses hand-written patch operations to show the expected patches coming into and out from the server.
    Normally, you would use a library like JSON-Patch to consume the incoming patches and generate the outgoing patches on the server. 
    Palindrom library has an option to run as a server in NodeJS, providing you with such functionality. However, it is not presented in this demo.
    */
    if (req.headers.Accept === 'application/json-patch+json') {
        let patch;
        if (req.body === '[{"op":"replace","path":"/user/resetNameClicked$","value":"true"}]') {
            patch = [
                {"op": "replace", "path": "/user/resetNameClicked$", "value": "false"},
                {"op": "replace", "path": "/user/fullName", "value": "Isaac Newton"},
                {"op": "replace", "path": "/user/firstName$", "value": "Isaac"},
                {"op": "replace", "path": "/user/lastName$", "value": "Newton"}
            ];
        }
        else if (url.endsWith('/lab/polymer/subpage.html')) {
            patch = [
                {"op": "replace", "path": "/user/fullName", "value": "Nikola Tesla"},
                {"op": "replace", "path": "/user/firstName$", "value": "Nikola"},
                {"op": "replace", "path": "/user/lastName$", "value": "Tesla"}
            ];
        }
        else {
            patch = [
                {"op": "replace", "path": "/user/fullName", "value": "Albert Einstein"},
                {"op": "replace", "path": "/user/firstName$", "value": "Albert"},
                {"op": "replace", "path": "/user/lastName$", "value": "Einstein"}
            ];
        }
        return {
            status: 200,
            headers: { contentType: 'application/json-patch+json' },
            body: JSON.stringify(patch)
        };
    }

    if (url.endsWith('/lab/polymer/subpage.html')) {
        obj.user.fullName = "Nikola Tesla";
        obj.user.firstName$ = "Nikola";
        obj.user.lastName$ = "Tesla";
    }
    else {
        obj.user.fullName = "Albert Einstein";
        obj.user.firstName$ = "Albert";
        obj.user.lastName$ = "Einstein";
    }

    return {
        status: 200,
        headers: { contentType: 'application/json' },
        body: JSON.stringify(obj)
    };
});