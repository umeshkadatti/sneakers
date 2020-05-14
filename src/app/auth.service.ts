export class AuthService {
	isLogIn = true;

	isAuthenticated(){
		const promise = new Promise((resolve, request)=>{
			setTimeout(()=>{
				resolve(this.isLogIn);
			}, 800);
		});
		return promise;
	}

	logIn(){
		this.isLogIn = true;
	}

	logOut(){
		this.isLogIn = false;
	}
}