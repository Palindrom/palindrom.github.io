const fetchMock = require('fetch-mock');

const obj = {
    user: {
      fullName: "",
      firstName$: "",
      lastName$: "",
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
        let incomingPatch = req.body ? JSON.parse(req.body) : [];
        if (incomingPatch.length && incomingPatch[0].op === 'replace') {
            if (incomingPatch[0].path === '/user/firstName$') {
                obj.user.firstName$ = incomingPatch[0].value;
                obj.user.fullName = `${obj.user.firstName$} ${obj.user.lastName$}`;
                patch = [
                    {"op": "replace", "path": "/user/fullName", "value": obj.user.fullName}
                ];
            }
            else if (incomingPatch[0].path === '/user/lastName$') {
                obj.user.lastName$ = incomingPatch[0].value;
                obj.user.fullName = `${obj.user.firstName$} ${obj.user.lastName$}`;
                patch = [
                    {"op": "replace", "path": "/user/fullName", "value": obj.user.fullName}
                ];
            }
            else if (incomingPatch[0].path === '/user/resetNameClicked$' && (incomingPatch[0].value === "true" || incomingPatch[0].value === true)) {
                // Polymer sends string "true", because the value is bound to a HTML attribute
                // React sends boolean true
                obj.user.firstName$ = "Isaac";
                obj.user.lastName$ = "Newton";
                obj.user.fullName = `${obj.user.firstName$} ${obj.user.lastName$}`;
                patch = [
                    {"op": "replace", "path": "/user/resetNameClicked$", "value": "false"},
                    {"op": "replace", "path": "/user/fullName", "value": obj.user.fullName},
                    {"op": "replace", "path": "/user/firstName$", "value": obj.user.firstName$},
                    {"op": "replace", "path": "/user/lastName$", "value": obj.user.lastName$}
                ];
            }
            else {
                console.log("Unrecognized patch", incomingPatch);
                throw new Error("Unrecognized patch");
            }
        }
        else if (url.endsWith('/subpage.html')) {
            obj.user.firstName$ = "Nikola";
            obj.user.lastName$ = "Tesla";
            obj.user.fullName = `${obj.user.firstName$} ${obj.user.lastName$}`;
            patch = [
                {"op": "replace", "path": "/user/fullName", "value": obj.user.fullName},
                {"op": "replace", "path": "/user/firstName$", "value": obj.user.firstName$},
                {"op": "replace", "path": "/user/lastName$", "value": obj.user.lastName$}
            ];
        }
        else {
            obj.user.firstName$ = "Albert";
            obj.user.lastName$ = "Einstein";
            obj.user.fullName = `${obj.user.firstName$} ${obj.user.lastName$}`;
            patch = [
                {"op": "replace", "path": "/user/fullName", "value": obj.user.fullName},
                {"op": "replace", "path": "/user/firstName$", "value": obj.user.firstName$},
                {"op": "replace", "path": "/user/lastName$", "value": obj.user.lastName$}
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