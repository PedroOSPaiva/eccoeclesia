package com.ecoeclesia.user;

public record UpdateUserProfileRequest(String email, String fullName, String birthDate, String address, String photoUrl) {
}
