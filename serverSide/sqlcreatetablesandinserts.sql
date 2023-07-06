
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
CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_account_number VARCHAR(20),
  sender_branch VARCHAR(255),
  receiver_account_number VARCHAR(20),
  receiver_branch VARCHAR(255),
  plus_minus ENUM('plus', 'minus') NOT NULL,
  way_of_payment VARCHAR(255) NOT NULL,
  reason VARCHAR(255) NOT NULL,
  FOREIGN KEY (sender_account_number, sender_branch) REFERENCES user_accounts(account_number, branch),
  FOREIGN KEY (receiver_account_number, receiver_branch) REFERENCES user_accounts(account_number, branch)
);
INSERT INTO transactions (sender_account_number, sender_branch, receiver_account_number, receiver_branch, plus_minus, way_of_payment, reason) VALUES
  ('1234567890', 'Branch A', '2345678901', 'Branch B', 'minus', 'Cash', 'Payment for services'),
  ('3456789012', 'Branch A', '4567890123', 'Branch C', 'plus', 'Online Transfer', 'Salary deposit'),
  ('5678901234', 'Branch B', '6789012345', 'Branch C', 'minus', 'Credit Card', 'Purchase of electronics'),
  ('7890123456', 'Branch A', '8901234567', 'Branch B', 'plus', 'Online Transfer', 'Reimbursement'),
  ('9012345678', 'Branch C', '0123456789', 'Branch A', 'minus', 'Cash', 'Rent payment');
  INSERT INTO transactions (sender_account_number, sender_branch, receiver_account_number, receiver_branch, plus_minus, way_of_payment, reason) VALUES
  ('2345678901', 'Branch B', '7890123456', 'Branch A', 'plus', 'Online Transfer', 'Repayment'),
  ('6789012345', 'Branch C', '9012345678', 'Branch C', 'minus', 'Credit Card', 'Shopping expenses'),
  ('0123456789', 'Branch A', '5678901234', 'Branch B', 'plus', 'Bank Transfer', 'Gift received'),
  ('4567890123', 'Branch C', '2345678901', 'Branch B', 'minus', 'Cash', 'Dining out'),
  ('1234567890', 'Branch A', '9012345678', 'Branch C', 'plus', 'Online Transfer', 'Loan repayment');
select * from user_accounts
select * from transactions
drop table transactions





