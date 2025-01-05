---
title: "TEST"
date: 2023-01-23
---

<!DOCTYPE HTML>
<html>
	<body>
	<h1>Welcome</h1>
	<p>test html content</p>
    <h1 class="block-header alt">
              <span>Form 1</span>
    </h1>
    <form>
              <div class="form-group">
                <label class="sr-only">Full name</label>
                <input type="text" class="form-control input-lg" placeholder="Full name">
              </div>
              <div class="form-group">
                <label class="sr-only">Username</label>
                <input type="text" class="form-control input-lg" placeholder="Username">
              </div>
              <div class="form-group">
                <label class="sr-only">E-mail</label>
                <input type="email" class="form-control input-lg" placeholder="E-mail">
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label class="sr-only">Password</label>
                    <input type="password" id = "password" class="form-control input-lg" placeholder="Password" >
                  </div>
                </div>
                <!-- <div class="col-sm-6">
                  <div class="form-group">
                    <label class="sr-only">Repeat password</label>
                    <input type="password" id = "password1" class="form-control input-lg" placeholder="Repeat password">
                  </div> 
                </div> -->
              </div>
              <div class="checkbox">
                <input type="checkbox" class = "toggle" id="singlePassword" value="" data-pw-toggle = "#password">
                <label for="singlePassword">
                  Show Password
                </label>
              </div><br />
              <button type="submit" class="btn btn-lg btn-primary">
                Sign Up
              </button>
            </form>
	</body>
</html>


