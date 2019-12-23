const signUpForm = document.signUpForm
document.addEventListener('click', async e => {
    if (e.target.type === 'submit') {
        e.preventDefault();
        console.log('henlo')
        const response = await fetch('/user', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: signUpForm.username.value,
                email: signUpForm.email.value,
                password: signUpForm.password.value
            })
        })
        const responseJSON = await response.json();
        console.log(responseJSON);
        if (responseJSON.validationError) {
            alert(responseJSON.validationError);
        } else if (responseJSON.redirectTo) {
            window.location.replace('http://127.0.0.1:3000' + responseJSON.redirectTo);
        }
    }
})