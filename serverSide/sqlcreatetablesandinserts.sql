
CREATE DATABASE `fullstack7`; 
USE `fullstack7`;
SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;

SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;
CREATE TABLE user_accounts (
  id INT,
  password VARCHAR(255) NOT NULL,
  money DECIMAL(10, 2) DEFAULT 0,
  name VARCHAR(255) NOT NULL,
  account_number VARCHAR(20),
  branch VARCHAR(255) NOT NULL,
  PRIMARY KEY (account_number, branch)
);
INSERT INTO user_accounts (id, password, money, name, account_number, branch) VALUES
  (1, 'pass1', 1000.00, 'John Doe', '1234567890', 'Branch A'),
  (2, 'pass2', 2500.00, 'Jane Smith', '2345678901', 'Branch B'),
  (3, 'pass3', 500.00, 'Mike Johnson', '3456789012', 'Branch A'),
  (4, 'pass4', 7500.00, 'Sarah Thompson', '4567890123', 'Branch C'),
  (5, 'pass5', 200.00, 'David Wilson', '5678901234', 'Branch B'),
  (6, 'pass6', 1500.00, 'Emily Davis', '6789012345', 'Branch C'),
  (7, 'pass7', 3000.00, 'Chris Anderson', '7890123456', 'Branch A'),
  (8, 'pass8', 4000.00, 'Lisa Brown', '8901234567', 'Branch B'),
  (9, 'pass9', 800.00, 'Alex Turner', '9012345678', 'Branch C'),
  (10, 'pass10', 6000.00, 'Megan Taylor', '0123456789', 'Branch A');
  #drop table user_accounts 
CREATE TABLE operations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_account_number VARCHAR(20),
  sender_branch VARCHAR(255),
  receiver_account_number VARCHAR(20),
  receiver_branch VARCHAR(255),
  plus_minus ENUM('plus', 'minus') NOT NULL,
  way_of_payment VARCHAR(255) NOT NULL,
  reason VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL, -- New column to store the amount
  FOREIGN KEY (sender_account_number, sender_branch) REFERENCES user_accounts(account_number, branch),
  FOREIGN KEY (receiver_account_number, receiver_branch) REFERENCES user_accounts(account_number, branch)
);

#these did not affect the money in the bank the money there is after these moves
INSERT INTO operations (sender_account_number, sender_branch, receiver_account_number, receiver_branch, plus_minus, way_of_payment, reason, date, amount) VALUES
  ('1234567890', 'Branch A', '2345678901', 'Branch B', 'minus', 'Cash', 'Payment for services', '2023-07-05', 50.00),
  ('3456789012', 'Branch A', '4567890123', 'Branch C', 'plus', 'Online Transfer', 'Salary deposit', '2023-07-05', 2000.00),
  ('5678901234', 'Branch B', '6789012345', 'Branch C', 'minus', 'Credit Card', 'Purchase of electronics', '2023-07-05', 500.00),
  ('7890123456', 'Branch A', '8901234567', 'Branch B', 'plus', 'Online Transfer', 'Reimbursement', '2023-07-05', 150.00),
  ('9012345678', 'Branch C', '0123456789', 'Branch A', 'minus', 'Cash', 'Rent payment', '2023-07-05', 800.00);

INSERT INTO operations (sender_account_number, sender_branch, receiver_account_number, receiver_branch, plus_minus, way_of_payment, reason, date, amount) VALUES
  ('2345678901', 'Branch B', '7890123456', 'Branch A', 'plus', 'Online Transfer', 'Repayment', '2023-07-06', 100.00),
  ('6789012345', 'Branch C', '9012345678', 'Branch C', 'minus', 'Credit Card', 'Shopping expenses', '2023-07-06', 250.00),
  ('0123456789', 'Branch A', '5678901234', 'Branch B', 'plus', 'Bank Transfer', 'Gift received', '2023-07-06', 300.00),
  ('4567890123', 'Branch C', '2345678901', 'Branch B', 'minus', 'Cash', 'Dining out', '2023-07-06', 50.00),
  ('1234567890', 'Branch A', '9012345678', 'Branch C', 'plus', 'Online Transfer', 'Loan repayment', '2023-07-06', 600.00);

INSERT INTO operations (sender_account_number, sender_branch, receiver_account_number, receiver_branch, plus_minus, way_of_payment, reason, date, amount) VALUES
  ('1234567890', 'Branch A', '2345678901', 'Branch B', 'minus', 'Cash', 'Payment for services', '2023-07-08', 80.00),
  ('1234567890', 'Branch A', '2345678901', 'Branch B', 'minus', 'Cash', 'Payment for services', '2023-07-09', 70.00),
  ('1234567890', 'Branch A', '2345678901', 'Branch B', 'minus', 'Cash', 'Payment for services', '2023-07-10', 90.00),
  ('1234567890', 'Branch A', '2345678901', 'Branch B', 'minus', 'Cash', 'Payment for services', '2023-07-11', 100.00),
  ('1234567890', 'Branch A', '2345678901', 'Branch B', 'minus', 'Cash', 'Payment for services', '2023-07-12', 120.00),
  ('1234567890', 'Branch A', '2345678901', 'Branch B', 'minus', 'Cash', 'Payment for services', '2023-07-13', 85.00);

GRANT SELECT, INSERT, DELETE, UPDATE ON operations TO 'root'@'localhost';
GRANT SELECT, INSERT, DELETE, UPDATE ON user_accounts TO 'root'@'localhost';

select * from user_accounts
select * from operations where (sender_account_number=1234567890 and sender_branch='Branch A') or 
(receiver_account_number=1234567890 and receiver_branch='Branch A')
#drop table operations
SELECT DATABASE();




