package com.example.demo.configs;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EnvConfig {
    static {
        Dotenv.configure().ignoreIfMissing().load();
    }
}