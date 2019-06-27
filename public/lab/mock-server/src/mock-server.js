const fetchMock = require('fetch-mock');

const obj = {
    user: {
      fullName: "",
      firstName$: "",
      lastName$: "",
      resetNameClicked$: false
    }
};

function generateReplaceOperation(obj, ...paths) {
    return paths.map(path => {
        const prop = path.substring(path.lastIndexOf('/') + 1);
        return {op: "replace", path: path, value: obj[prop]}
    });
}

function setPerson(firstName, lastName) {
    if(firstName !== null) {
        obj.user.firstName$ = firstName;
    }
    if(lastName !== null) {
        obj.user.lastName$ = lastName;
    }
    obj.user.fullName = `${obj.user.firstName$} ${obj.user.lastName$}`;
}

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
                setPerson(incomingPatch[0].value, null);
                patch = generateReplaceOperation(obj.user, '/user/fullName');
            }
            else if (incomingPatch[0].path === '/user/lastName$') {
                setPerson(null, incomingPatch[0].value);
                patch = generateReplaceOperation(obj.user, '/user/fullName');
            }
            else if (incomingPatch[0].path === '/user/resetNameClicked$' && (incomingPatch[0].value === "true" || incomingPatch[0].value === true)) {
                // Polymer sends string "true", because the value is bound to a HTML attribute
                // React sends boolean true
                setPerson("Isaac", "Newton");
                patch = generateReplaceOperation(obj.user, '/user/resetNameClicked$', '/user/firstName$', '/user/lastName$', '/user/fullName');
            }
            else {
                console.log("Unrecognized patch", incomingPatch);
                throw new Error("Unrecognized patch");
            }
        }
        else if (url.endsWith('/subpage.html')) {
            setPerson("Nikola", "Tesla");
            patch = generateReplaceOperation(obj.user, '/user/firstName$', '/user/lastName$', '/user/fullName');

        }
        else {
            setPerson("Albert", "Einstein");
            patch = generateReplaceOperation(obj.user, '/user/firstName$', '/user/lastName$', '/user/fullName');
        }
        return {
            status: 200,
            headers: { contentType: 'application/json-patch+json' },
            body: JSON.stringify(patch)
        };
    }

    if (url.endsWith('/subpage.html')) {
        setPerson("Nikola", "Tesla");
    }
    else {
        setPerson("Albert", "Einstein");
    }

    return {
        status: 200,
        headers: { contentType: 'application/json' },
        body: JSON.stringify(obj)
    };
});