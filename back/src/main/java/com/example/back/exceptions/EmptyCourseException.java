package com.example.back.exceptions;

public class EmptyCourseException extends RuntimeException {
    public EmptyCourseException(String message) {
        super(message);
    }
}
