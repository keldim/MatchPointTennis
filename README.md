# Match Point Tennis

This is the source code for Match Point Tennis in Chris Yoo's portfolio.

# Purpose

This is a personal project for Chris Yoo. It is an ecommerce website for tennis equipment.

# Major Functions

Make an order, order confirmation email, see past orders if you have an account, create account, login / logout

# Dependencies

Frontend (Angular 7) => client/package.json

Backend (Spring Boot 2) => server/pom.xml

# Build / Deploy Instructions

Frontend (Angular 7)\
=> 'ng build' in 'client' folder, deploy the created files in 'client/dist/client' folder to AWS S3

Backend (Spring Boot 2)\
=> 'mvn package' in 'server' folder, deploy the created jar file in the 'server/target' folder to AWS EC2\
=> use 'Amazon Linux AMI' in EC2, not the 'Amazon Linux 2 AMI'\
=> install java 1.8 in EC2

Database (MySQL)\
=> use AWS RDS\
=> use the sql script file in 'server/src/main/resources'

OAuth2 server for login / logout (open source, MITREid Connect, https://github.com/mitreid-connect/OpenID-Connect-Java-Spring-Server) \
=> build instruction is here https://github.com/mitreid-connect/OpenID-Connect-Java-Spring-Server/wiki/Build-instructions \
=> deploy the created war file to AWS Elastic Beanstalk
