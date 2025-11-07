package com.ecoeclesia.inventory;

public enum ItemType {
    CONSUMABLE("consumables"),
    DURABLE("durables");

    private final String pathSegment;

    ItemType(String pathSegment) {
        this.pathSegment = pathSegment;
    }

    public String getPathSegment() {
        return pathSegment;
    }

    public static ItemType fromPathSegment(String segment) {
        for (ItemType type : values()) {
            if (type.pathSegment.equalsIgnoreCase(segment)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Tipo de item desconhecido: " + segment);
    }
}
