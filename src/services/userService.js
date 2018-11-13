

export const userService = {
    login,
    logout
};

function login(username, password) {
    return fetch('http://ec2-13-233-180-15.ap-south-1.compute.amazonaws.com/app/postAuthorizeUser?', {
        method: 'POST',
        body: JSON.stringify({ "userName": username, "password": password })
    }).then(function (handleResponse) {
        return handleResponse.json()
    }).then(function (user) {
        console.log("user",user);
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            else {
                if (user.status == "Inactive") {
                    alert("User is inactive");
                }
                else {
                    alert("Invalid Username or Password");
                }
            }
            console.log(user);
            return user;
        });
}


function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}