package com.ecoeclesia.testing;

public final class Assertions {

    private Assertions() {
    }

    public static void assertEquals(Object expected, Object actual) {
        if (expected == null ? actual != null : !expected.equals(actual)) {
            fail("Expected %s but was %s".formatted(expected, actual));
        }
    }

    public static void assertTrue(boolean condition, String message) {
        if (!condition) {
            fail(message);
        }
    }

    public static void assertTrue(boolean condition) {
        assertTrue(condition, "Condition expected to be true");
    }

    public static void assertFalse(boolean condition, String message) {
        if (condition) {
            fail(message);
        }
    }

    public static void assertNotNull(Object value) {
        if (value == null) {
            fail("Value must not be null");
        }
    }

    public static <T extends Throwable> T assertThrows(Class<T> type, Executable executable) {
        try {
            executable.execute();
        } catch (Throwable throwable) {
            if (type.isInstance(throwable)) {
                return type.cast(throwable);
            }
            fail("Expected %s but caught %s".formatted(type.getSimpleName(), throwable.getClass().getSimpleName()));
        }
        fail("Expected %s to be thrown".formatted(type.getSimpleName()));
        return null;
    }

    public static void fail(String message) {
        throw new AssertionError(message);
    }
}
