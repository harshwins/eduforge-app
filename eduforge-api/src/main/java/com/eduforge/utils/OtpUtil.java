package com.eduforge.utils;

import java.util.Random;

public class OtpUtil {

    public static String generateOtp() {
        Random r = new Random();
        int otp = 100000 + r.nextInt(900000);
        return String.valueOf(otp);
    }
}