SELECT c.id, c.first_name, c.last_name, COUNT(r.id) reservation_count
FROM customers c 
JOIN reservations r 
ON c.id = r.customer_id
GROUP BY (c.id, c.first_name, c.last_name)
ORDER BY reservation_count DESC
LIMIT 10;