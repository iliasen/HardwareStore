package com.iliasen.server.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class SecretKeyReader {
    private static final String FILE_PATH = "src/main/resources/key.txt";

    public static String getSecretKey() {
        try {
            Path path = Paths.get(FILE_PATH);
            byte[] bytes = Files.readAllBytes(path);
            return new String(bytes).trim();
        } catch (IOException e) {

            e.printStackTrace();
            return null;
        }
    }
}