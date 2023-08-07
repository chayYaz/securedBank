
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




CREATE TABLE branches (
  branch_name VARCHAR(255) primary key,
  location VARCHAR(200) NOT NULL
);
INSERT INTO branches (branch_name, location) VALUES
('Branch A', 'Location A'),
('Branch B', 'Location B'),
('Branch C', 'Location C');


CREATE TABLE branch_administrators (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  password VARCHAR(100) NOT NULL, -- Adding the password field
  branch VARCHAR(255) NOT NULL unique,
  FOREIGN KEY (branch) REFERENCES branches(branch_name)
);
-- Inserting data for branch administrator 1



#name is unique
ALTER TABLE user_accounts ADD FOREIGN KEY (branch) REFERENCES branches(branch_name);

select * from branch_administrators;



INSERT INTO branch_administrators (name, email, phone, branch,password) VALUES
('Admin A', 'admin_a@example.com', '+123456789', 'Branch A','1234'), -- Assigning Admin A to Branch A
('Admin B', 'admin_b@example.com', '+987654321', 'Branch B','2468'), -- Assigning Admin B to Branch B
('Admin C', 'admin_c@example.com', '+555555555','Branch C','1020'); -- Assigning Admin C to Branch C

select * from branch_administrators where password=1234 and branch='Branch A' and id=1;
SELECT * FROM user_accounts INNER join branch_administrators ON branch_administrators.branch =  user_accounts.branch where branch_administrators.id=1
SELECT  user_accounts.name,user_accounts.money,user_accounts.account_number FROM user_accounts INNER JOIN branch_administrators ON branch_administrators.branch = user_accounts.branch WHERE branch_administrators.id = 1;
select * from user_accounts;
select * from branch_administrators
select * from operations where (sender_account_number=  1234567890 or receiver_account_number= 1234567890 ) and way_of_payment='Credit Card'
select * from recurring_Transfers where sender_account_number= 1234567890