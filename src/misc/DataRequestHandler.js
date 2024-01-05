export function pageErrorHandler(err) {
    try {
        if(err.response.status === 400) {
            window.location.href = "/400";
        }
        else if(err.response.status === 401) {
            window.location.href = "/login";
        }
        else if(err.response.status === 403) {
            window.location.href = "/403";
        }
        else if(err.response.status === 404) {
            window.location.href = "/404";
        }
        else {
            window.location.href = "/500";
        }
    }
    catch {
        alert("Something went wrong, contact the developer for more info.");
    }
}

export function dataRequestErrorHandler(err) {
    try{
        if(err.response.status === 400) {
            alert("Bad request");
        }
        else if(err.response.status === 401) {
            window.location.href = "/login";
        }
        else if(err.response.status === 403) {
            alert("You don't have permission to perform this action");
        }
        else if(err.response.status === 404) {
            alert("Data you're looking for doesn't exist");
        }
        else {
            alert("Something went wrong, contact the developer for more info.");
        }
    }
    catch {
        alert("Something went wrong, contact the developer for more info.");
    }
}