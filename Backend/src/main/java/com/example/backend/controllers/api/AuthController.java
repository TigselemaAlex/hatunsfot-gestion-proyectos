package com.example.backend.controllers.api;

import com.example.backend.controllers.requests.LoginRequest;
import com.example.backend.controllers.requests.RegisterRequest;
import com.example.backend.controllers.responses.JWTResponse;
import com.example.backend.controllers.responses.MessageResponse;
import com.example.backend.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(value = "/logup")
    private ResponseEntity<MessageResponse> logUp(@RequestBody final RegisterRequest request){
        return ResponseEntity.ok(authService.logup(request));
    }
    @PostMapping(value = "/login")
    public ResponseEntity <JWTResponse> login(@RequestBody final LoginRequest request){
        return ResponseEntity.ok(authService.login(request));
    }
}
