## Create Database

```bash
CREATE DATABASE meet3;
```

## Create Table

```sql
CREATE TABLE apartments (
    id BIGSERIAL PRIMARY KEY,
    building_name VARCHAR(255) NOT NULL,
    floor_number INT NOT NULL,
    rent_price INT NOT NULL,
    is_available BOOLEAN NOT NULL
);
```
