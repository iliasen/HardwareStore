package com.iliasen.server.utils;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;

public class SecretKeyProvider {
    private static final String SECRET_KEY_FILE = "src/main/resources/key.txt";

    public static SecretKey getSecretKey() {
        String secretKey = readSecretKeyFromFile(SECRET_KEY_FILE);
        byte[] secretBytes = Base64.getDecoder().decode(secretKey);
        return new SecretKeySpec(secretBytes, "HmacSHA256");
    }

    private static String readSecretKeyFromFile(String filePath) {
        try {
            byte[] encodedKey = Files.readAllBytes(Paths.get(filePath));
            return new String(encodedKey, StandardCharsets.UTF_8).trim();
        } catch (IOException e) {
            throw new RuntimeException("Ошибка при чтении секретного ключа из файла", e);
        }
    }
}