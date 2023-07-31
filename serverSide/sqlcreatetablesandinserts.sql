
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

INSERT INTO operations (sender_account_number, sender_branch, receiver_account_number, receiver_branch, plus_minus, way_of_payment, reason, date, amount) VALUES
  ('2345678901', 'Branch B','1234567890', 'Branch A',  'minus', 'Cash', 'Payment for services', '2023-07-08', 10.00),
  ( '2345678901', 'Branch B','1234567890', 'Branch A', 'minus', 'Cash', 'Payment for services', '2023-07-09', 20.00),
  ( '2345678901', 'Branch B', '1234567890', 'Branch A','minus', 'Cash', 'Payment for services', '2023-07-10', 30.00),
  ('2345678901', 'Branch B', '1234567890', 'Branch A', 'minus', 'Cash', 'Payment for services', '2023-07-11', 40.00),
  ('2345678901', 'Branch B', '1234567890', 'Branch A', 'minus', 'Cash', 'Payment for services', '2023-07-12', 50.00),
  ('2345678901', 'Branch B','1234567890', 'Branch A',  'minus', 'Cash', 'Payment for services', '2023-07-13', 60.00);
GRANT SELECT, INSERT, DELETE, UPDATE ON operations TO 'root'@'localhost';
GRANT SELECT, INSERT, DELETE, UPDATE ON user_accounts TO 'root'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY 'password';
select * from user_accounts
select * from operations where (sender_account_number=1234567890 and sender_branch='Branch A') or 
(receiver_account_number=1234567890 and receiver_branch='Branch A');
select * from operations where (sender_account_number=1234567890 and sender_branch='Branch A');
#drop table operations

-- CREATE TABLE atms (
--   atm_id INT AUTO_INCREMENT PRIMARY KEY,
--   atm_name VARCHAR(255) NOT NULL,
--   location VARCHAR(255) NOT NULL,
-- );
-- INSERT INTO atms (atm_name, location) VALUES
--   ('ATM-001', 'Main Street, City A'),
--   ('ATM-002', 'Central Square, City B', true, true, true),
--   ('ATM-003', 'Shopping Mall, City C', false, true, true),
--   ('ATM-004', 'Park Avenue, City D', true, false, true),
--   ('ATM-005', 'Business District, City E', true, true, true);
--   
--   
-- CREATE TABLE credit_cards (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   user_account_id varchar(20) NOT NULL,
--   card_number VARCHAR(16) NOT NULL,
--   expiration_date DATE NOT NULL,
--   cvv VARCHAR(3) NOT NULL,
--   branch VARCHAR(255) NOT NULL,
--   pin VARCHAR(4) NOT NULL,
--   FOREIGN KEY (user_account_id, branch) REFERENCES user_accounts(account_number, branch)
-- );
-- INSERT INTO credit_cards (user_account_id, card_number, expiration_date, cvv, branch, pin) VALUES
--   (1, '1234567812345678', '2025-12-31', '123', 'Branch A', '5678'),
--   (3, '8765432187654321', '2024-11-30', '456', 'Branch A', '4321'),
--   (5, '5678567856785678', '2023-09-30', '789', 'Branch B', '1234'),
--   (7, '4321432143214321', '2026-06-30', '234', 'Branch A', '8765'),
--   (9, '9876987698769876', '2024-08-31', '567', 'Branch C', '2345');
  
  select * from user_accounts where account_number=1234567890;
  
select * from user_accounts where account_number=2345678901;
CREATE TABLE recurring_transfers(
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_account_number VARCHAR(255) NOT NULL,
  sender_branch VARCHAR(255) NOT NULL,
  receiver_account_number VARCHAR(255) NOT NULL,
  receiver_branch VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  reason TEXT NOT NULL,
  way_of_payment VARCHAR(255) NOT NULL,
  FOREIGN KEY (sender_account_number, sender_branch) REFERENCES user_accounts(account_number, branch),
FOREIGN KEY ( receiver_account_number, receiver_branch) REFERENCES user_accounts(account_number, branch)
);
INSERT INTO recurring_transfers (
  sender_account_number,
  sender_branch,
  receiver_account_number,
  receiver_branch,
  amount,
  reason,
  way_of_payment
) VALUES 
  ('1234567890', 'Branch A', '2345678901', 'Branch B', 200, 'Reason 1', 'Online Transfer'),
  ('9012345678', 'Branch C', '8901234567', 'Branch B', 300, 'Reason 2', 'Online Transfer');
  
INSERT INTO recurring_transfers 
  (sender_account_number, sender_branch, receiver_account_number, receiver_branch, amount, reason, way_of_payment)
VALUES
  ('1234567890', 'Branch A', '2345678901', 'Branch B', 11, 'Reason 1', 'Online Transfer'),
  ('1234567890', 'Branch A', '2345678901', 'Branch B', 22, 'Reason 1', 'Online Transfer'),
  ('1234567890', 'Branch A', '2345678901', 'Branch B', 33, 'Reason 1', 'Online Transfer'),
  ('9012345678', 'Branch C', '8901234567', 'Branch B', 34, 'Reason 2', 'Online Transfer');

select * from recurring_transfers where  sender_account_number='1234567890';
select * from operations;
select * from user_accounts where account_number='1234567890';
select * from user_accounts where account_number='2345678901';
#ALTER TABLE user_accounts MODIFY COLUMN id INT AUTO_INCREMENT;
#ALTER TABLE user_accounts AUTO_INCREMENT=1010;
#INSERT INTO user_accounts (password, money, name, account_number, branch) VALUES ('pass11', 1000.00, 'ezra yakin', '111111111', 'Branch A');
#delete from user_accounts where account_number='111111111';