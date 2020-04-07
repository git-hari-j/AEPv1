function createUserPw() {
    $.ajax({
    url: "https://parseapi.back4app.com/users",
    dataType: "json",
    type: "post",
    headers: {
        "X-Parse-Application-Id":"VCAo1ZNe84TnwroddK5Jj4JpL4kTm5diW7RGldQU",
        "X-Parse-REST-API-Key":"9ngYGxCLQNkANAycRAk8HoE1RRxrcX18fgc8V80C",
        "X-Parse-Revocable-Session":"1"
    },
    data: {
        "password": localStorage.getItem('password'),
        "username": localStorage.getItem('email'),
        "email": localStorage.getItem('email')
        }
    })
};